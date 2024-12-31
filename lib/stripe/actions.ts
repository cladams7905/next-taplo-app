"use server";

import { toDateTime } from "@/lib/actions";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Database, Tables, TablesInsert } from "./types";
import { stripe } from "./server";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    db: { schema: "stripe" },
  }
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Tables<"products"> = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error } = await supabaseAdmin.from("products").upsert([productData]);
  if (error) throw new Error(error.message);
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Tables<"prices"> = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata,
  };

  const { error } = await supabaseAdmin.from("prices").upsert([priceData]);
  if (error) throw new Error(error.message);
  console.log(`Price inserted/updated: ${price.id}`);
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string | undefined;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid,
        },
      };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdmin
      .from("customers")
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);
    if (supabaseError) throw new Error(supabaseError.message);
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  return data.stripe_customer_id;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
    })
    .eq("id", uuid);
  if (error) throw new Error(error.message);
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  if (noCustomerError) {
    throw noCustomerError;
  }

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method", "items"],
  });

  // Upsert the latest status of the subscription object.
  const subscriptionData: Tables<"subscriptions"> = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    product_id: (subscription.items.data[0].price.product as string) || null,
    //TODO check quantity on subscription
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? toDateTime(subscription.cancel_at).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? toDateTime(subscription.canceled_at).toISOString()
      : null,
    current_period_start: toDateTime(
      subscription.current_period_start
    ).toISOString(),
    current_period_end: toDateTime(
      subscription.current_period_end
    ).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at
      ? toDateTime(subscription.ended_at).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? toDateTime(subscription.trial_start).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? toDateTime(subscription.trial_end).toISOString()
      : null,
  };

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert([subscriptionData]);
  if (error) throw new Error(error.message);
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

const getTotalStripeUsers = async () => {
  const result = await supabaseAdmin.from("users").select("*");
  return result;
};

const getStripeUser = async (userId: string) => {
  const result = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();
  return result;
};

const getStripeCustomer = async (userId: string) => {
  const result = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("id", userId)
    .single();
  return result;
};

const updateStripeUser = async (user: TablesInsert<"users">) => {
  const result = await supabaseAdmin
    .from("users")
    .update(user)
    .eq("user_id", user.user_id)
    .single();
  return result;
};

const getSubscription = async (userId: string) => {
  const result = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId);

  if (result?.data && result.data.length > 1) {
    result.data = result.data.filter(
      (subscription: Tables<"subscriptions">) =>
        subscription.status === "active" || subscription.status === "trialing"
    );
  }
  return { ...result, data: result.data?.[0] };
};

const getProduct = async (productId: string) => {
  const result = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();
  return result;
};

const getPrice = async (productId: string) => {
  const result = await supabaseAdmin
    .from("prices")
    .select("*")
    .eq("product_id", productId)
    .eq("active", true)
    .single();
  return result;
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  getStripeUser,
  getTotalStripeUsers,
  getStripeCustomer,
  updateStripeUser,
  getSubscription,
  getProduct,
  getPrice,
};

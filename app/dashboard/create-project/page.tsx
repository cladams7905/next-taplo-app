import { getStripeUser } from "@/stripe/actions";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { stripe } from "@/stripe/server";
import Stripe from "stripe";
import { PaymentPlans } from "@/lib/enums";
import NewProjectPage from "./_components/NewProjectPage";

export default async function CreateProject() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const stripeUser = (await getStripeUser(data.user.id))?.data;

  /**
   * Gets a list of all stripe products along with their associated default_price objects.
   */
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  /**
   * A simplified stripe product that aggregates necessary fields
   */
  const productsWithPrice = products.data.map((product) => {
    return {
      id: product.id,
      payment_plan: product.metadata?.payment_plan as PaymentPlans,
      name: product.name,
      price: product.default_price as Stripe.Price,
    };
  });

  return (
    <NewProjectPage
      stripeUser={stripeUser}
      user={data.user}
      products={productsWithPrice}
    />
  );
}

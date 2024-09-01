import CheckoutSession from "./_components/CheckoutSession";
import { stripe } from "@/stripe/server";
import Stripe from "stripe";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const paymentPlan = searchParams?.plan;

  /**
   * Gets a list of all products along with their associated default_price objects.
   */
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  /**
   * Gets the price id from the default_price object associated with the product object
   * (IMPORTANT: do not change the payment_plan in the metadata of each Stripe product, as
   * that corresponds to the paymentPlan enum values).
   */
  const priceId = (
    products.data.find(
      (product) => product.metadata?.payment_plan === paymentPlan
    )?.default_price as Stripe.Price
  )?.id;

  if (!priceId) {
    throw new Error("No price_id found.");
  }

  return (
    <main>
      <CheckoutSession priceId={priceId} />
    </main>
  );
}

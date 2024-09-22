import { getProduct, getStripeUser, getSubscription } from "@/stripe/actions";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { stripe } from "@/stripe/server";
import Stripe from "stripe";
import { PaymentPlans } from "@/lib/enums";
import NewProjectPage from "./_components/NewProjectPage";
import { getProjects } from "@/lib/actions/projects";

export default async function CreateProject() {
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    redirect("/");
  }
  const { data: stripeUser } = await getStripeUser(userData.user.id);

  const { data: subscriptionData } = await getSubscription(userData.user.id);
  const { data: productData } = await getProduct(
    subscriptionData?.product_id || "prod_QlHJRIrcgEUmT1" // default to starter yearly if no subscription created
  );
  const { data: projectData } = await getProjects(userData.user.id);

  /**
   * Gets a list of all stripe products along with their associated default_price objects.
   */
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  /**
   * A simplified stripe product that aggregates necessary fields, including price
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
      user={userData.user}
      products={productsWithPrice}
      paymentPlan={productData?.name}
      numProjects={projectData?.length}
    />
  );
}

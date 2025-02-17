import { getActiveProject, getProjects } from "@/lib/actions/projects";
import ProjectBoard from "./_components/ProjectBoard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { getEvents } from "@/lib/actions/events";
import { getProducts } from "@/lib/actions/products";
import {
  getProduct,
  getStripeUser,
  getSubscription,
} from "@/lib/stripe/actions";
import { stripe } from "@/lib/stripe/server";
import { PaymentPlans } from "@/lib/enums";
import Stripe from "stripe";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    redirect("/");
  }
  const { data: activeProject } = await getActiveProject(userData.user.id);
  if (!activeProject) {
    redirect("/dashboard/create-project");
  }

  /* Fetch Stripe data */
  const { data: stripeUser } = await getStripeUser(userData.user.id);

  const { data: subscriptionData } = await getSubscription(userData.user.id);
  const { data: productData } = await getProduct(
    subscriptionData?.product_id || "prod_QlHJRIrcgEUmT1" // default to starter yearly if no subscription created
  );

  /* Fetch project data */
  const { data: projectData } = await getProjects(userData.user.id);
  const { data: integrations } = await getIntegrations(activeProject.id);
  const { data: events } = await getEvents(activeProject.id);
  const { data: products } = await getProducts(activeProject.id);

  /**
   * Gets a list of all stripe products along with their associated default_price objects.
   */
  const stripeProducts = await stripe.products.list({
    expand: ["data.default_price"],
    active: true,
  });

  /**
   * A simplified stripe product that aggregates necessary fields, including price
   */
  const stripeProductsWithPrice = stripeProducts.data.map((product) => {
    return {
      id: product.id,
      payment_plan: product.metadata?.payment_plan as PaymentPlans,
      name: product.name,
      price: product.default_price as Stripe.Price,
    };
  });

  return (
    <ProjectBoard
      user={userData.user}
      stripeUser={stripeUser}
      fetchedActiveProject={activeProject}
      fetchedIntegrations={integrations}
      stripeProducts={stripeProductsWithPrice}
      fetchedEvents={events}
      fetchedProducts={products}
    />
  );
}

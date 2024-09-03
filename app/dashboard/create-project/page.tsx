"use server";

import { getStripeUser } from "@/stripe/actions";
import PaymentModal from "../_components/PaymentModal";
import NewProjectForm from "./_components/NewProjectForm";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { stripe } from "@/stripe/server";
import Stripe from "stripe";
import { PaymentPlans } from "@/lib/enums";

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
   * A simplified object that only contains necessary fields
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
    <>
      <PaymentModal
        stripeUser={stripeUser}
        products={productsWithPrice}
        user={data.user}
      />
      <div className="flex items-start justify-center w-full h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 font-sans">
        <div className="border mt-36 border-gray-300 z-[1] p-2 shadow-lg bg-base-100 rounded-md w-full max-w-lg">
          <div className="flex flex-col items-center justify-center w-full pt-6">
            <p className="font-logo text-2xl mb-4">Create New Project</p>
            <NewProjectForm stripeUser={stripeUser} />
          </div>
        </div>
      </div>
    </>
  );
}

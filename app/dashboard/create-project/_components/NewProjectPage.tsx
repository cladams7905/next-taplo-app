"use client";

import { useState } from "react";
import PaymentModal from "../../_components/PaymentModal";
import { PaymentPlans } from "@/lib/enums";
import Stripe from "stripe";
import { Tables } from "@/stripe/types";
import { User } from "@supabase/supabase-js";
import NewProjectForm from "./NewProjectForm";

export default function NewProjectPage({
  stripeUser,
  user,
  products,
}: {
  stripeUser: Tables<"users">;
  user: User;
  products: {
    id: string;
    payment_plan: PaymentPlans;
    name: string;
    price: Stripe.Price;
  }[];
}) {
  /**
   * The date when billing should begin.
   * If null, then payment modal opens and create project button is disabled.
   */
  const [renewalDate, setRenewalDate] = useState<string | null>(
    stripeUser?.renewal_date
  );
  return (
    <>
      <PaymentModal
        stripeUser={stripeUser}
        products={products}
        user={user}
        renewalDate={renewalDate}
        setRenewalDate={setRenewalDate}
      />
      <div className="flex items-start justify-center w-full h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 font-sans">
        <div className="border mt-36 border-gray-300 z-[1] p-2 shadow-lg bg-base-100 rounded-md w-full max-w-lg">
          <div className="flex flex-col items-center justify-center w-full pt-6">
            <p className="font-logo text-2xl mb-4">Create New Project</p>
            <NewProjectForm stripeUser={stripeUser} renewalDate={renewalDate} />
          </div>
        </div>
      </div>
    </>
  );
}

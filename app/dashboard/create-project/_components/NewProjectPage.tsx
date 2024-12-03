"use client";

import React, { useState } from "react";
import PaymentModal from "../../_components/PaymentModal";
import { PaymentPlans } from "@/lib/enums";
import Stripe from "stripe";
import { Tables } from "@/lib/stripe/types";
import { User } from "@supabase/supabase-js";
import NewProjectForm from "./NewProjectForm";
import { ExternalLink, CircleAlert } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage({
  stripeUser,
  user,
  products,
  numProjects,
  paymentPlan,
}: {
  stripeUser: Tables<"users"> | null;
  user: User;
  products: {
    id: string;
    payment_plan: PaymentPlans;
    name: string;
    price: Stripe.Price;
  }[];
  numProjects: number | null | undefined;
  paymentPlan: string | null | undefined;
}) {
  /**
   * The date when the free trial should begin
   * If null, then payment modal opens and create project button is disabled.
   */
  const [freeTrialDate, setFreeTrialDate] = useState<string | null>(
    stripeUser?.free_trial_start_date ?? null
  );
  return (
    <>
      {!freeTrialDate && (
        <PaymentModal
          stripeUser={stripeUser}
          products={products}
          user={user}
          freeTrialDate={freeTrialDate}
          setFreeTrialDate={setFreeTrialDate}
        />
      )}
      <div className="flex flex-col items-center justify-center w-full h-screen-minus-navbar bg-gray-50 font-sans md:px-24 sm:px-10 px-6">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="border border-gray-300 z-[1] p-2 shadow-sm bg-base-100 rounded-md w-full max-w-lg">
          <div className="flex flex-col items-center justify-center w-full pt-6 px-6">
            <p className="md:text-2xl font-bold text-xl mb-4">
              Create New Project
            </p>
            {numProjects &&
            paymentPlan?.includes("Starter") &&
            numProjects >= 1 ? (
              <div className="text-error bg-error/10 p-2 mt-2 rounded-lg sm:text-sm text-xs flex items-center gap-2">
                <CircleAlert width={18} height={18} />
                <p>You are only allowed one project on the Starter plan.</p>
              </div>
            ) : (
              ""
            )}
            <NewProjectForm
              stripeUser={stripeUser}
              freeTrialDate={freeTrialDate}
              paymentPlan={paymentPlan}
              numProjects={numProjects}
            />
          </div>
          <div className="inline-block w-full items-center justify-center mb-3 gap-1 md:text-sm text-xs text-center">
            Need help getting started? Check out{" "}
            <Link
              href={"/docs/getting-started"}
              target="_blank"
              className="link inline-flex items-center gap-1 link-primary"
            >
              this guide
              <ExternalLink width={16} height={16} />
            </Link>{" "}
            for helpful tips!
          </div>
        </div>
      </div>
    </>
  );
}

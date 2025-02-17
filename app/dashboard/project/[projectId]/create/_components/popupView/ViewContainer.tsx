"use client";

import { Tables } from "@/lib/stripe/types";
import PopupViewer from "./PopupViewer";
import ViewContainerHeader from "./ViewContainerHeader";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";
import { PaymentPlans } from "@/lib/enums";
import Stripe from "stripe";

export default function ViewContainer({
  stripeUser,
  user,
  products,
  isPreviewMode,
  setPreviewMode,
}: {
  stripeUser: Tables<"users"> | null;
  user: User;
  products: {
    id: string;
    payment_plan: PaymentPlans;
    name: string;
    price: Stripe.Price;
  }[];
  isPreviewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { events } = useProjectContext();
  return (
    <div className="relative flex flex-col !rounded-none h-full z-[1]">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex flex-col h-full">
        <ViewContainerHeader
          stripeUser={stripeUser}
          products={products}
          user={user}
          isPreviewMode={isPreviewMode}
          setPreviewMode={setPreviewMode}
        />
        {events.length > 0 && <PopupViewer />}
      </div>
    </div>
  );
}

"use client";

import LoadingDots from "@/app/_components/shared/loadingdots";
import {
  capitalizeFirstLetter,
  formatCentsToDollars,
  getURL,
} from "@/lib/actions";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import Stripe from "stripe";
import { addMonths } from "date-fns";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { updateStripeUser } from "@/stripe/actions";
import { Tables } from "@/stripe/types";
import { useRouter } from "next/navigation";

export default function RenewSubscriptionModal({
  customer,
  subscription,
  product,
  price,
  billingDate,
}: {
  customer: Tables<"customers">;
  subscription: Stripe.Subscription;
  product: Stripe.Product;
  price: Stripe.Price;
  billingDate: string;
}) {
  const renewSubscriptionRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [estimatedBillingDate, setEstimatedBillingDate] = useState<
    string | null
  >();
  const router = useRouter();

  useEffect(() => {
    if (product.name.includes("Monthly")) {
      const nextBillingDate = addMonths(new Date(), 1);
      setEstimatedBillingDate(nextBillingDate.toLocaleDateString());
    } else if (product.name.includes("Yearly")) {
      const nextBillingDate = addMonths(new Date(), 12);
      setEstimatedBillingDate(nextBillingDate.toLocaleDateString());
    }
  }, [subscription]);

  const handleReactivateSubscription = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/v1/stripe/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customer.stripe_customer_id,
            subscriptionId: subscription.id,
            priceId: price.id,
            cancelAtPeriodEnd: false,
            comment: null,
            feedback: null,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
        renewSubscriptionRef.current?.close();
        showToast(
          `Your subscription has been reactivated! Please click \"Manage subscription\" to view your invoice. If you would like to change your subscription, you may do so at any time from your account page.`
        );
        handleUpdateUserAfterReactivation();
        router.refresh();
      } catch (error: any) {
        console.error(error);
        showToastError(error.message);
      }
    });
  };

  const handleUpdateUserAfterReactivation = async () => {
    const { error } = await updateStripeUser({
      user_id: customer.id,
      reason_for_leaving: null,
      cancel_comment: null,
    });
    if (error) {
      console.log(error);
      showToastError(error);
    }
  };

  return (
    <>
      <div
        className="btn bg-primary/20 text-primary btn-sm w-full hover:bg-primary/40"
        onClick={() => {
          renewSubscriptionRef.current?.classList.remove("hidden");
          renewSubscriptionRef.current?.showModal();
        }}
      >
        Renew Subscription
      </div>
      <dialog className="modal" ref={renewSubscriptionRef}>
        <div className="flex flex-col modal-box dark:border dark:border-gray-600">
          <form method="dialog" className="modal-backdrop">
            <button
              className="btn btn-sm btn-circle btn-ghost !outline-none absolute right-2 top-2 text-base-content"
              onClick={() => {
                renewSubscriptionRef.current?.classList.add("hidden");
                renewSubscriptionRef.current?.close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-lg mb-8">
            Renew your subscription
          </h3>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-sm w-full max-w-md">
              <p>
                We&apos;re glad you want to renew your Taplo subscription! To do
                so, click the "reactivate" button below.
              </p>
              <div>
                To manage your payment plan and billing info,{" "}
                <Link
                  href={
                    getURL().includes("taplo")
                      ? "https://billing.stripe.com/p/login/fZeeVR24I5pC1UY288"
                      : "https://billing.stripe.com/p/login/test_14kdUs06T5fha9q000"
                  }
                  target="_blank"
                  className="link"
                >
                  click here.
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-full border border-200 rounded-lg p-4">
              <p className="text-sm">
                Plan: {capitalizeFirstLetter(product?.name)}
              </p>
              <p className="text-sm">
                Estimated billing date:{" "}
                {subscription?.status === "canceled"
                  ? estimatedBillingDate
                  : billingDate}
              </p>
              <p className="text-sm">
                Billing amount: {formatCentsToDollars(price.unit_amount)}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="btn btn-primary w-full text-white"
                onClick={() => {
                  handleReactivateSubscription();
                }}
              >
                {isPending ? (
                  <LoadingDots color="#FFFFFF" />
                ) : (
                  "Reactivate my subscription!"
                )}
              </div>
              <div
                className="btn btn-ghost btn-outline w-full border border-gray-200 hover:border-gray-200 hover:text-primary"
                onClick={() => {
                  renewSubscriptionRef.current?.close();
                }}
              >
                Nevermind, I don't want to renew
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
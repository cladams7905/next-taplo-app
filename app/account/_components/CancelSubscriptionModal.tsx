"use client";

import LoadingDots from "@/app/_components/shared/loadingdots";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { updateStripeUser } from "@/stripe/actions";
import { Tables } from "@/stripe/types";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Stripe from "stripe";

export default function CancelSubscriptionModal({
  user,
  subscription,
  billingDate,
}: {
  user: User;
  subscription: Tables<"subscriptions"> | undefined;
  billingDate: string;
}) {
  const cancelSubscriptionRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);
  const cancelCommentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Handle changes in cancel feedback section
  const handleSelectcancelFeedback = () => {
    startTransition(async () => {
      const { error } = await updateStripeUser({
        user_id: user.id,
        reason_for_leaving: cancelFeedback,
        cancel_comment: cancelCommentRef.current?.value,
      });
      if (error) {
        console.log(error);
        showToastError(error);
      }
    });
  };

  const handleCancelSubscription = () => {
    startTransition(async () => {
      try {
        if (!subscription) return;
        const response = await fetch("/api/v1/stripe/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriptionId: subscription.id,
            cancelAtPeriodEnd: true,
            comment: cancelCommentRef.current?.value,
            feedback: cancelFeedback,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        handleSelectcancelFeedback();
        cancelSubscriptionRef.current?.close();
        router.refresh();
        showToast(
          `Your subscription has been canceled. You may continue to use Taplo until ${billingDate}. If you would like to renew your subscription, you may do so at any time from your account page.`
        );
      } catch (error: any) {
        console.error(error);
        showToastError(error.message);
      }
    });
  };

  return (
    <>
      <div
        className="btn btn-ghost btn-outline btn-sm w-full border border-gray-200 hover:border-gray-200 hover:text-primary"
        onClick={() => {
          cancelSubscriptionRef.current?.classList.remove("hidden");
          cancelSubscriptionRef.current?.showModal();
        }}
      >
        Cancel Subscription
      </div>
      <dialog className="modal" ref={cancelSubscriptionRef}>
        <div className="flex flex-col modal-box dark:border dark:border-gray-600">
          <form method="dialog" className="modal-backdrop">
            <button
              className="btn btn-sm btn-circle btn-ghost !outline-none absolute right-2 top-2 text-base-content"
              onClick={() => {
                cancelSubscriptionRef.current?.classList.add("hidden");
                cancelSubscriptionRef.current?.close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-lg mb-8">
            Are you sure you want to cancel?
          </h3>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 text-sm w-full max-w-md">
              <p>
                We&apos;ll be sad to see you go! If you decide you want to renew
                your subcription, you may do so at any time from your account
                page.
              </p>
              <p>
                After canceling, your access to Taplo will be revoked on{" "}
                <span className="font-bold">{billingDate}</span>.
              </p>
            </div>
            <label className="form-control w-full">
              <div className="flex items-center gap-3">
                <div className="label">
                  <span className="label-text">Why are you canceling?</span>
                </div>
              </div>
              <select
                className="select select-bordered select-primary"
                value={cancelFeedback || "default"}
                onChange={(e) => setCancelFeedback(e.target.value)}
              >
                <option disabled value="default">
                  Select an option
                </option>
                <option value="low_quality">
                  Quality was less than expected
                </option>
                <option value="missing_features">
                  Some features are missing
                </option>
                <option value="switched_service">
                  I&apos;m switching to a different service
                </option>
                <option value="too_complex">Too difficult to use</option>
                <option value="customer_service">Poor customer service</option>
                <option value="too_expensive">It&apos;s too expensive</option>
                <option value="unused">
                  I don&apos;t use the service enough
                </option>
                <option value="other">Other reason</option>
              </select>
            </label>
            <label className="form-control w-full">
              <div className="flex items-center gap-3">
                <div className="label">
                  <span className="label-text">Any additional feedback?</span>
                </div>
              </div>
              <textarea
                className="textarea focus:!outline-primary"
                ref={cancelCommentRef}
              />
            </label>
            <div className="flex flex-col gap-3">
              <div
                className="btn btn-primary w-full text-white"
                onClick={() => {
                  cancelSubscriptionRef.current?.close();
                }}
              >
                Nevermind, I don&apos;t want to cancel!
              </div>
              <div
                className="btn btn-ghost btn-outline w-full border border-gray-200 hover:border-gray-200 hover:text-primary"
                onClick={() => {
                  handleCancelSubscription();
                }}
              >
                {isPending ? (
                  <LoadingDots color="#7A81EB" />
                ) : (
                  "Yes, please cancel my subscription."
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

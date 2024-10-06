import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Check } from "lucide-react";
import {
  getPrice,
  getProduct,
  getStripeCustomer,
  getStripeUser,
  getSubscription,
} from "@/lib/stripe/actions";
import {
  capitalizeFirstLetter,
  convertDateTime,
  formatCentsToDollars,
  getURL,
} from "@/lib/actions";
import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import PromotionalEmailsCheckbox from "./_components/PromotionalEmailsCheckbox";
import CancelSubscriptionModal from "./_components/CancelSubscriptionModal";
import RenewSubscriptionModal from "./_components/RenewSubscriptionModal";
import React from "react";

export default async function AccountPage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: stripeUserData } = await getStripeUser(userData.user.id);

  const { data: stripeCustomerData } = await getStripeCustomer(
    userData.user.id
  );

  const { data: projectData } = await getProjects(userData.user.id);

  const { data: subscriptionData } = await getSubscription(userData.user.id);

  const { data: priceData } = subscriptionData?.product_id
    ? await getPrice(subscriptionData.product_id)
    : { data: null };

  const { data: productData } = subscriptionData?.product_id
    ? await getProduct(subscriptionData.product_id)
    : { data: null };

  const cancelDate = subscriptionData?.cancel_at;

  const billingDate = convertDateTime(
    subscriptionData?.current_period_end || "",
    true
  );

  return (
    <div className="flex items-center justify-center w-full h-full md:px-24 sm:px-10">
      <div className="w-full h-full flex flex-col gap-6 px-8 md:pt-12 pt-6 overflow-y-scroll bg-white border-x border-b border-gray-300">
        <div className="flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 text-sm shadow-sm">
          <p className="text-lg font-bold mb-4">Account Details</p>
          <p>Email address: {userData.user.email}</p>
          <p>
            Sign-In Provider:{" "}
            {capitalizeFirstLetter(userData.user.app_metadata.provider || "")}
          </p>
          <PromotionalEmailsCheckbox stripeUserData={stripeUserData} />
        </div>
        <div className="join md:join-horizontal join-vertical mb-6 shadow-sm">
          <div className="join-item flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 md:w-2/3">
            <p className="text-lg font-bold mb-3">Subscription Details</p>
            <p className="font-bold text-sm">My plan: {productData?.name}</p>
            <div className="columns-2">
              {productData?.name && productData.name.includes("Starter") ? (
                <>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <div className="flex items-center gap-2">
                        {projectData?.length ?? 0}/1 project
                        <div
                          className="tooltip tooltip-info"
                          data-tip="You are only allowed one project on the Starter plan. To get unlimited projects, upgrade to Pro."
                        >
                          <QuestionMarkCircledIcon width={16} height={16} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Unlimited integrations</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Customizable popups</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Simple analytics</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    {" "}
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Unlimited projects</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Unlimited integrations</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Customizable popups</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    {" "}
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>In-depth analytics</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>API access</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={20}
                        height={20}
                        strokeWidth={4}
                      />
                      <p>Inline style</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="join-item flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 md:w-1/3 text-sm">
            <p>
              Plan Status:{" "}
              {subscriptionData?.status === "canceled" ? (
                <span className="text-error">Canceled</span>
              ) : (
                capitalizeFirstLetter(subscriptionData?.status || "")
              )}
              {cancelDate &&
                (subscriptionData?.status === "active" ||
                  subscriptionData?.status === "trialing") && (
                  <>
                    <br />
                    <span className="text-error">
                      Cancels on next billing date
                    </span>
                  </>
                )}
            </p>
            <p>
              Next billing date:{" "}
              {subscriptionData?.status === "active" ||
              subscriptionData?.status === "trialing"
                ? billingDate
                : "N/A"}
            </p>
            <p>
              Billing amount:{" "}
              {(subscriptionData?.status === "active" ||
                subscriptionData?.status === "trialing") &&
              !subscriptionData?.cancel_at &&
              priceData
                ? formatCentsToDollars(priceData.unit_amount)
                : "$0.00"}
            </p>
            <Link
              href={
                getURL().includes("taplo")
                  ? "https://billing.stripe.com/p/login/fZeeVR24I5pC1UY288"
                  : "https://billing.stripe.com/p/login/test_14kdUs06T5fha9q000"
              }
              target="_blank"
            >
              <div className="btn btn-primary btn-sm text-white w-full mt-6">
                Manage Subscription
              </div>
            </Link>
            {subscriptionData?.cancel_at_period_end ||
            subscriptionData?.cancel_at ||
            subscriptionData?.ended_at ? (
              <RenewSubscriptionModal
                customer={stripeCustomerData}
                subscription={subscriptionData}
                product={productData}
                price={priceData}
                billingDate={billingDate}
              />
            ) : (
              <CancelSubscriptionModal
                user={userData?.user}
                subscription={subscriptionData}
                billingDate={billingDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

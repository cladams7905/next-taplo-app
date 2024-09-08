import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { Check } from "lucide-react";
import {
  getPrice,
  getProduct,
  getStripeUser,
  getSubscription,
} from "@/stripe/actions";
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

export default async function AccountPage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: stripeUserData } = await getStripeUser(userData.user.id);

  const { data: projectData } = await getProjects(userData.user.id);

  const { data: subscriptionData } = await getSubscription(userData.user.id);

  const { data: priceData } = await getPrice(subscriptionData.product_id);

  const { data: productData } = await getProduct(subscriptionData.product_id);

  const now = Math.floor(Date.now() / 1000);
  const trialStart = Math.floor(
    new Date(subscriptionData.trial_start).getTime() / 1000
  );
  const trialEnd = Math.floor(
    new Date(subscriptionData.trial_end).getTime() / 1000
  );
  const cancelDate = subscriptionData.cancel_at;

  return (
    <div className="flex items-center justify-center w-full py-6 h-full">
      <div className="lg:max-w-[70vw] w-full h-full flex flex-col gap-6 px-6 pt-6 overflow-y-scroll bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 text-sm">
          <p className="text-lg font-bold">Account Details</p>
          <p>Email address: {userData.user.email}</p>
          <p>
            Sign-In Provider:{" "}
            {capitalizeFirstLetter(userData.user.app_metadata.provider || "")}
          </p>
          <PromotionalEmailsCheckbox stripeUserData={stripeUserData} />
        </div>
        <div className="join md:join-horizontal join-vertical">
          <div className="join-item flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 md:w-2/3">
            <p className="text-lg font-bold">Subscription Details </p>
            <p className="font-bold text-sm">
              My plan: {productData.name}{" "}
              {trialStart < now && now < trialEnd ? (
                <span className="badge bg-primary/15 font-bold text-primary ml-2">
                  Free Trial
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="columns-2">
              {productData.name.includes("Starter") ? (
                <>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <div className="flex items-center gap-2">
                        {projectData.length}/1 project
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
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>Unlimited integrations</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>Customizable popups</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
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
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>Unlimited projects</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>Unlimited integrations</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
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
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>In-depth analytics</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
                        strokeWidth={4}
                      />
                      <p>API access</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check
                        color="#4ade80"
                        width={24}
                        height={24}
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
              {subscriptionData.status === "canceled" ? (
                <span className="text-error">Cancelled</span>
              ) : (
                capitalizeFirstLetter(subscriptionData.status)
              )}{" "}
              {cancelDate ? (
                <>
                  <br />
                  <span className="text-error">
                    Cancels on next billing date
                  </span>
                </>
              ) : (
                ""
              )}
            </p>
            <p>
              Next billing date:{" "}
              {convertDateTime(subscriptionData.current_period_end, true)}
            </p>
            <p>Billing amount: {formatCentsToDollars(priceData.unit_amount)}</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Link
            href={
              getURL().includes("taplo")
                ? "https://billing.stripe.com/p/login/fZeeVR24I5pC1UY288"
                : "https://billing.stripe.com/p/login/test_14kdUs06T5fha9q000"
            }
            target="_blank"
          >
            <div className="btn btn-primary mb-4 text-white w-fit">
              Manage Subscription
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

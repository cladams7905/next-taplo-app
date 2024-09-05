import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { Check } from "lucide-react";
import { getPrice, getProduct, getSubscription } from "@/stripe/actions";
import {
  capitalizeFirstLetter,
  convertDateTime,
  formatCentsToDollars,
} from "@/lib/actions";

export default async function AccountPage() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

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
          <div className="flex items-center gap-2">
            <p>I would like to receive promotional emails from Taplo</p>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
          </div>
        </div>
        <div className="join md:join-horizontal join-vertical">
          <div className="join-item flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 md:w-2/3">
            <p className="text-lg font-bold">Subscription Details </p>
            <p className="font-bold">
              My plan: {productData.name}{" "}
              {trialStart < now && now < trialEnd ? (
                <span className="badge badge-primary badge-md text-white font-normal ml-2">
                  Free Trial
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="columns-2">
              <div className="flex flex-col justify-center gap-3 text-sm">
                {" "}
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Unlimited websites</p>
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
            </div>
          </div>
          <div className="join-item flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 md:w-1/3 text-sm">
            <p>Plan Status: {capitalizeFirstLetter(subscriptionData.status)}</p>
            <p>
              Next billing date:{" "}
              {convertDateTime(subscriptionData.current_period_end, true)}
            </p>
            <p>Billing amount: {formatCentsToDollars(priceData.unit_amount)}</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <div className="btn btn-primary mb-4 text-white w-fit">
            Manage Subscription
          </div>
        </div>
      </div>
    </div>
  );
}

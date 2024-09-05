import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { Check } from "lucide-react";

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center w-full pt-6 md:pb-0 pb-6 h-full">
      <div className="lg:max-w-[70vw] w-full h-full flex flex-col gap-6 px-6 pt-6 overflow-y-scroll bg-white rounded-lg border border-gray-300">
        <div className="flex flex-col border border-gray-200 rounded-lg px-6 py-4 gap-3 text-sm">
          <p className="text-lg font-bold">Account Details</p>
          <p>Email address: </p>
          <p>Sign-In Provider: </p>
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
            <p className="text-lg font-bold">Subscription Details</p>
            <p className="font-bold">My plan: </p>
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
            <p>Plan Status: </p>
            <p>Next billing date: </p>
            <p>Billing amount: </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <div className="btn btn-primary text-white w-fit">
            Manage Subscription
          </div>
        </div>
      </div>
    </div>
  );
}

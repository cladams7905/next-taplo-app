"use client";

import { CircleUserRound, LogOut, Settings } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/(auth)/_actions";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { showToastError } from "@/app/_components/shared/showToast";
import Link from "next/link";
import { getProduct, getSubscription } from "@/stripe/actions";

export default function UserDropdown({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const email = user?.email;
  const username = email?.substring(0, email.indexOf("@"));
  const { avatar_url, name } = user?.user_metadata || {};
  const [accountPlan, setAccountPlan] = useState<
    "Free trial" | "Starter" | "Pro" | null
  >(null);

  if (!email) return null;

  async function handleSignOut() {
    startTransition(async () => {
      const { error } = JSON.parse(await signOut());
      if (error) {
        showToastError(error);
      } else {
        redirect("/");
      }
    });
  }

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // Fetch the subscription data
        const { data: subscriptionData, error: subscriptionError } =
          await getSubscription(user.id);
        if (subscriptionError) {
          showToastError(subscriptionError);
          return;
        }

        // Fetch the product data based on the subscription
        const { data: productData, error: productError } = await getProduct(
          subscriptionData.product_id
        );
        if (productError) {
          showToastError(productError);
          return;
        }

        // Set the account plan based on the product name
        const now = Math.floor(Date.now() / 1000);
        const trialStart = Math.floor(
          new Date(subscriptionData.trial_start).getTime() / 1000
        );
        const trialEnd = Math.floor(
          new Date(subscriptionData.trial_end).getTime() / 1000
        );

        let newAccountPlan: "Free trial" | "Starter" | "Pro" | null;
        if (trialStart < now && now < trialEnd) {
          newAccountPlan = "Free trial";
        } else {
          newAccountPlan = productData.name.includes("Starter")
            ? "Starter"
            : "Pro";
        }
        setAccountPlan(newAccountPlan);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        showToastError(error);
      }
    };
    console.log();

    fetchSubscription();
  }, [user.id]);

  return (
    <div className="dropdown dropdown-end relative inline-block text-left">
      <button className="flex items-center justify-center overflow-hidden rounded-full">
        <div className="transition-all duration-75 active:scale-95">
          {avatar_url ? (
            <div className="border border-gray-300 rounded-full">
              <Image
                src={avatar_url}
                alt="user"
                width="34"
                height="34"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="rounded-full items-center flex">
              <CircleUserRound
                height={26}
                width={26}
                strokeWidth={1.8}
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </button>
      <div className="dropdown-content w-fit min-w-48 z-[3] mt-2 rounded-md bg-white p-2 border shadow-lg border-gray-300">
        <div className="p-2">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-gray-900">
                  {name ? name : username}
                </p>
                <div className="badge badge-primary badge-sm text-white">
                  {accountPlan ?? accountPlan}
                </div>
              </div>
              <p className="truncate text-sm text-gray-400">{email}</p>
            </>
          )}
        </div>
        <Link href={"/account"}>
          <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-link-hover">
            <Settings className="h-auto w-4" />
            <p className="text-sm">Account</p>
          </button>
        </Link>
        <button
          className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-link-hover"
          onClick={() => handleSignOut()}
        >
          <LogOut className="h-auto w-4" />
          <p className="text-sm">
            {isPending ? (
              <LoadingDots color="oklch(var(--pc))" size="sm" />
            ) : (
              "Logout"
            )}
          </p>
        </button>
      </div>
    </div>
  );
}

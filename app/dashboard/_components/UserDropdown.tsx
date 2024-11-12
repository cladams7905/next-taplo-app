"use client";

import { CircleUserRound, LogOut, Settings } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/(auth)/_actions";
import Image from "next/image";
import React, { memo, useTransition } from "react";
import { redirect } from "next/navigation";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { showToastError } from "@/app/_components/shared/showToast";
import Link from "next/link";
import { isFreeTrialPeriod } from "@/lib/actions";
import { Tables } from "@/lib/stripe/types";

function UserDropdown({
  user,
  paymentPlan,
  subscription,
}: {
  user: User;
  paymentPlan: string | null;
  subscription: Tables<"subscriptions"> | undefined;
}) {
  const [isPending, startTransition] = useTransition();

  const email = user?.email;
  const username = email?.substring(0, email.indexOf("@"));
  const { avatar_url, name } = user?.user_metadata || {};

  async function handleSignOut() {
    startTransition(async () => {
      const { error } = JSON.parse(await signOut());
      if (error) {
        console.error(error);
        showToastError(error);
      } else {
        redirect("/");
      }
    });
  }

  return (
    <div className="dropdown dropdown-end relative inline-block text-left">
      <button
        className="flex items-center justify-center overflow-hidden rounded-full"
        tabIndex={0}
      >
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
      <div
        className="dropdown-content w-fit min-w-48 z-50 mt-2 rounded-md bg-white p-2 border shadow-lg border-gray-300"
        tabIndex={0}
      >
        <div className="p-2">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-gray-900">
                  {name ? name : username}
                </p>
                {paymentPlan &&
                  subscription &&
                  subscription.status !== "canceled" && (
                    <div className="badge badge-sm bg-primary/15 font-bold text-primary ">
                      {isFreeTrialPeriod(subscription)
                        ? "Free Trial"
                        : paymentPlan.includes("Starter")
                        ? "Starter"
                        : paymentPlan.includes("Pro")
                        ? "Pro"
                        : ""}
                    </div>
                  )}
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

export default memo(UserDropdown);

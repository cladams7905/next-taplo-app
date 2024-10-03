"use client";

import Link from "next/link";
import React from "react";

export default function RenewSubscriptionBanner() {
  return (
    <>
      <div className="w-full bg-error font-sans text-white text-sm text-center inline-flex items-center px-12 py-2 justify-center">
        Your subscription has expired. Please{" "}
        <Link className="link px-1" href={"/account"}>
          renew your subscription
        </Link>
        to continue using Taplo.
      </div>
    </>
  );
}

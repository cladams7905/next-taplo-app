import Image from "next/image";
import React from "react";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import GoogleAnalyticsLogo from "@/public/images/providers/ga-logo.svg";
import Link from "next/link";

export default function Integrations() {
  return (
    <div className="font-sans md:px-24 flex flex-col gap-6">
      <div className="w-full mb-10 flex flex-col items-center gap-4">
        <p className="text-3xl font-semibold text-center">Add an integration</p>
      </div>
      <div className="flex flex-wrap w-full gap-4">
        <Link
          href="/docs/integrations/stripe"
          className="flex w-full gap-6 border border-gray-200 rounded-lg shadow-md p-4 px-6 lg:w-[48%] hover:bg-gray-50 cursor-pointer"
        >
          <Image
            src={StripeLogo}
            alt="Stripe"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Stripe</p>
            <p className="text-sm text-gray-500 italic">
              Learn how to set up Stripe as an integration in your Taplo
              project.
            </p>
          </div>
        </Link>
        <Link
          href="/docs/integrations/google-analytics"
          className="flex w-full gap-6 border border-gray-200 rounded-lg shadow-md p-4 lg:w-[48%] hover:bg-gray-50 cursor-pointer"
        >
          <Image
            src={GoogleAnalyticsLogo}
            alt="Google Analytics"
            width={48}
            height={48}
            className="aspect-square !rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Google Analytics</p>
            <p className="text-sm text-gray-500 italic">
              Learn how to set up Google Analytics as an integration in your
              Taplo project.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

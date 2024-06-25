"use client";

import { Tables } from "@/supabase/types";
import { CirclePlus, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/stripe-logo.svg";
import { convertDateTime } from "@/lib/actions";

export default function IntegrationsList({
  integrations,
}: {
  integrations: Tables<"Integrations">[];
}) {
  return integrations.length > 0 ? (
    integrations.map((integration, i) => (
      <div
        key={i}
        className="flex max-h-64 border border-neutral shadow-md rounded-lg py-2 pr-2"
      >
        <div className="flex items-center justify-center w-28">
          <div className="aspect-square w-full h-full max-w-[48px] max-h-[48px] bg-link-hover rounded-lg">
            {integration.provider === "Stripe" && (
              <Image
                width={48}
                height={48}
                alt={"Stripe logo"}
                src={StripeLogo}
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col h-full w-full p-2 gap-2">
          <p>{integration.name}</p>
          <div>
            <p className="text-sm text-gray-500">
              Provider: {integration.provider}
            </p>
            <p className="text-sm text-gray-500">
              Created: {convertDateTime(integration.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <EllipsisVertical />
        </div>
      </div>
    ))
  ) : (
    <div className="flex flex-col gap-2 text-gray-500 mt-4 items-center border border-neutral rounded-lg py-12">
      {" "}
      <div className="text-lg">
        You haven&apos;t created any integrations yet.
      </div>
      <div className="flex flex-row items-center gap-2">
        Click{" "}
        <span>
          <CirclePlus height={20} width={20} />
        </span>{" "}
        to create a new one!
      </div>
    </div>
  );
}

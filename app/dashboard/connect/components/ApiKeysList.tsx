"use client";

import { Tables } from "@/app/supabase/types";
import { CirclePlus, EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function ApiKeysList({
  apiKeys,
}: {
  apiKeys: Tables<"ApiKeys">[];
}) {
  const [currentApiKeys, setCurrentApiKeys] =
    useState<Tables<"ApiKeys">[]>(apiKeys);

  return currentApiKeys.length > 0 ? (
    currentApiKeys.map((apiKey, i) => (
      <div
        key={i}
        className="flex max-h-64 border border-neutral shadow-md rounded-lg py-2 pr-2"
      >
        <div className="flex items-center justify-center h-full w-28">
          <div className="aspect-square w-full h-full max-w-[55px] max-h-[55px] bg-link-hover rounded-lg"></div>
        </div>
        <div className="flex flex-col h-full w-full p-2 gap-2">
          <p>My API Key</p>
          <div>
            <p className="text-sm text-gray-500">Secret Key: </p>
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
      <div className="text-lg">You haven&apos;t created any API Keys yet.</div>
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
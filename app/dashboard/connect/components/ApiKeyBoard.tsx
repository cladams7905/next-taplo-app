"use client";

import { Tables } from "@/app/supabase/types";
import { useRef } from "react";
import ApiKeySidebar from "./ApiKeySidebar";
import ApiKeysList from "./ApiKeysList";

export default function ApiKeyBoard({
  apiKeys,
}: {
  apiKeys: Tables<"ApiKeys">[];
}) {
  const keyModalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
      <div className="flex flex-col gap-4 h-full w-1/3 p-4 pr-6 border-r border-neutral">
        <ApiKeySidebar keyModalRef={keyModalRef} />
      </div>
      <div className="flex flex-col gap-4 h-full w-2/3 p-4 pl-6">
        <p className="text-xl">My API Keys</p>
        <ApiKeysList apiKeys={apiKeys} />
      </div>
    </div>
  );
}

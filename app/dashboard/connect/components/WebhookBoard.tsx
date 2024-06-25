"use client";

import { Tables } from "@/lib/supabase/types";
import WebhookSidebar from "./WebhookSidebar";
import WebhooksList from "./WebhooksList";
import { useRef } from "react";

export default function WebhookBoard({
  webhooks,
}: {
  webhooks: Tables<"Webhooks">[];
}) {
  const webhookModalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
      <div className="flex flex-col gap-4 h-full w-1/3 p-4 pr-6 border-r border-neutral">
        <WebhookSidebar webhookModalRef={webhookModalRef} />
      </div>
      <div className="flex flex-col gap-4 h-full w-2/3 p-4 pl-6">
        <p className="text-xl">My Webhooks</p>
        <WebhooksList webhooks={webhooks} />
      </div>
    </div>
  );
}

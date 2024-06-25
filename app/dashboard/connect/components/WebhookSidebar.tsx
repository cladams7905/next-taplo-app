"use client";

import { CirclePlus, ExternalLink } from "lucide-react";
import { RefObject } from "react";
import NewWebhookModal from "./NewWebhookModal";

export default function WebhookSidebar({
  webhookModalRef,
}: {
  webhookModalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <>
      <div
        className="btn btn-primary text-white w-full"
        onClick={() => webhookModalRef.current?.showModal()}
      >
        <CirclePlus height={20} width={20} />
        New Webhook
      </div>
      <NewWebhookModal webhookModalRef={webhookModalRef} />
      <p>What is a webhook?</p>
      <p className="text-sm text-gray-500">
        Webhooks are used to "listen" to different services and notify you when
        an event occurs.
      </p>
      <p className="text-sm text-gray-500">
        Webhooks are how your toasts know when to display! You can learn more
        about them{" "}
        <span>
          <a
            href={"https://zapier.com/blog/what-are-webhooks/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 link"
          >
            {" "}
            here. <ExternalLink height={14} width={14} />
          </a>
        </span>
      </p>
    </>
  );
}

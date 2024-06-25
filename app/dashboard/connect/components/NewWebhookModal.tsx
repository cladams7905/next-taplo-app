"use client";

import { RefObject } from "react";
import NewWebhookForm from "./NewWebhookForm";

export default function NewWebhookModal({
  webhookModalRef,
}: {
  webhookModalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <dialog className="modal" ref={webhookModalRef}>
      <div className="modal-box flex flex-col p-6 pb-2 justify-center !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => webhookModalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold mb-6">Create New Webhook</div>
        <NewWebhookForm />
      </div>
    </dialog>
  );
}

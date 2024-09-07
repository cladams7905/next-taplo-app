"use client";

import { RefObject } from "react";
import NewIntegrationForm from "./NewIntegrationForm";
import { Tables } from "@/supabase/types";

export default function NewIntegrationModal({
  currentEvent,
  newIntegrationModalRef,
  handleUpdateIntegration,
}: {
  currentEvent?: Tables<"Events">;
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  handleUpdateIntegration?: (
    event: Tables<"Events">,
    integrationId: number
  ) => void;
}) {
  return (
    <dialog className="modal" ref={newIntegrationModalRef}>
      <div className="modal-box flex flex-col p-6 pb-2 justify-center !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => newIntegrationModalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold mb-6">New Integration</div>
        <NewIntegrationForm
          currentEvent={currentEvent}
          newIntegrationModalRef={newIntegrationModalRef}
          handleUpdateIntegration={handleUpdateIntegration}
        />
      </div>
    </dialog>
  );
}

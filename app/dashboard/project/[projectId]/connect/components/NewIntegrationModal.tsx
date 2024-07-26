"use client";

import { Dispatch, RefObject, SetStateAction } from "react";
import NewIntegrationForm from "./NewIntegrationForm";
import { Tables } from "@/supabase/types";

export default function NewIntegrationModal({
  newIntegrationModalRef,
  integrations,
  setIntegrations,
  activeProject,
  currentEvent,
  handleUpdateIntegration,
}: {
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  activeProject: Tables<"Projects">;
  currentEvent?: Tables<"Events">;
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
          newIntegrationModalRef={newIntegrationModalRef}
          integrations={integrations}
          setIntegrations={setIntegrations}
          activeProject={activeProject}
          currentEvent={currentEvent}
          handleUpdateIntegration={handleUpdateIntegration}
        />
      </div>
    </dialog>
  );
}

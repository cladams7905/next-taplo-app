"use client";

import { Dispatch, RefObject, SetStateAction } from "react";
import NewIntegrationForm from "./NewIntegrationForm";
import { Tables } from "@/lib/supabase/types";

export default function NewIntegrationModal({
  activeProject,
  integrations,
  setIntegrations,
  newIntegrationModalRef,
  currentEvent,
  handleUpdateEvent,
  integrationToEdit,
  setIntegrationToEdit,
}: {
  activeProject: Tables<"Projects">;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  currentEvent?: Tables<"Events">;
  handleUpdateEvent?: (event: Tables<"Events">, integrationId: number) => void;
  integrationToEdit?: Tables<"Integrations"> | undefined;
  setIntegrationToEdit?: Dispatch<
    SetStateAction<Tables<"Integrations"> | undefined>
  >;
}) {
  return (
    <dialog className="modal" ref={newIntegrationModalRef}>
      <div className="modal-box flex flex-col p-6 pb-2 !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => newIntegrationModalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold mb-6">
          {integrationToEdit ? "Edit Integration" : "New Integration"}
        </div>
        <NewIntegrationForm
          activeProject={activeProject}
          integrations={integrations}
          setIntegrations={setIntegrations}
          currentEvent={currentEvent}
          newIntegrationModalRef={newIntegrationModalRef}
          handleUpdateEvent={handleUpdateEvent}
          integrationToEdit={integrationToEdit}
          setIntegrationToEdit={setIntegrationToEdit}
        />
      </div>
    </dialog>
  );
}

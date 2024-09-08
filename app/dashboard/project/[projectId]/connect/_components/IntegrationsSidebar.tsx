"use client";

import { CirclePlus } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";
import NewIntegrationModal from "./NewIntegrationModal";
import { Tables } from "@/supabase/types";

export default function IntegrationsSidebar({
  activeProject,
  integrations,
  setIntegrations,
  newIntegrationModalRef,
}: {
  activeProject: Tables<"Projects">;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <>
      <div
        className="btn btn-primary text-white w-full"
        onClick={() => newIntegrationModalRef.current?.showModal()}
      >
        <CirclePlus height={20} width={20} />
        New Integration
      </div>
      <NewIntegrationModal
        activeProject={activeProject}
        integrations={integrations}
        setIntegrations={setIntegrations}
        newIntegrationModalRef={newIntegrationModalRef}
      />
    </>
  );
}

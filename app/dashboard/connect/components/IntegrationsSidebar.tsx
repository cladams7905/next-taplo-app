"use client";

import { CirclePlus } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Tables } from "@/supabase/types";
import NewIntegrationModal from "./NewIntegrationModal";

export default function IntegrationsSidebar({
  newIntegrationModalRef,
  integrations,
  setCurrentIntegrations,
}: {
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  integrations: Tables<"Integrations">[];
  setCurrentIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
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
        newIntegrationModalRef={newIntegrationModalRef}
        setIntegrations={setCurrentIntegrations}
      />
    </>
  );
}

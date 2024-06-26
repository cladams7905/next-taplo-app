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
        integrations={integrations}
        setIntegrations={setCurrentIntegrations}
      />
      <p className="text-sm text-gray-500">
        Add integrations for your toast popups to listen to notifications from
        your payment/subscription providers.
      </p>
    </>
  );
}

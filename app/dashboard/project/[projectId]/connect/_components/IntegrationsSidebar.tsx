"use client";

import { CirclePlus } from "lucide-react";
import { RefObject } from "react";
import NewIntegrationModal from "./NewIntegrationModal";

export default function IntegrationsSidebar({
  newIntegrationModalRef,
}: {
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
      <NewIntegrationModal newIntegrationModalRef={newIntegrationModalRef} />
    </>
  );
}

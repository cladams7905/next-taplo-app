"use client";

import { CirclePlus } from "lucide-react";
import { RefObject } from "react";
import NewKeyModal from "./NewKeyModal";

export default function ApiKeySidebar({
  keyModalRef,
}: {
  keyModalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <>
      <div
        className="btn btn-primary text-white w-full"
        onClick={() => keyModalRef.current?.showModal()}
      >
        <CirclePlus height={20} width={20} />
        New API Key
      </div>
      <NewKeyModal keyModalRef={keyModalRef} />
    </>
  );
}

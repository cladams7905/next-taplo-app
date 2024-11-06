import React, { RefObject, useTransition } from "react";
import ContentBodyEditor from "./ContentBodyEditor";
import { Tables } from "@/lib/supabase/types";

export default function EditContentModal({
  modalRef,
  currentEvent,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  currentEvent: Tables<"Events">;
}) {
  const [isLoading, setLoadingTransition] = useTransition();
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box dark:border dark:border-gray-600">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
            onClick={() => {
              modalRef.current?.classList.add("hidden");
              modalRef?.current?.close();
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-lg mb-4">Create Custom Message</h3>
        <div className="flex flex-col w-full gap-6">
          <ContentBodyEditor
            currentEvent={currentEvent}
            startLoadTransition={setLoadingTransition}
          />
        </div>
      </div>
    </dialog>
  );
}

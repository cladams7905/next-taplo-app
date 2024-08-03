"use client";

import { RefObject } from "react";

export default function AddEditContentModal({
  modalRef,
}: {
  modalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box flex flex-col p-6 pb-2 justify-center !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => modalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold mb-6">Add/Edit Content</div>
      </div>
    </dialog>
  );
}

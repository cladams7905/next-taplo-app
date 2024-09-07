"use client";

import { RefObject } from "react";

export default function ContactModal({
  modalRef,
}: {
  modalRef: RefObject<HTMLDialogElement>;
}) {
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box dark:border dark:border-gray-600">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
            onClick={() => {
              modalRef?.current?.classList.add("hidden");
            }}
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}

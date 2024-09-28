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
        <h3 className="font-semibold text-lg">Get in Touch!</h3>
        <p className="py-4">
          If you have any issues, feel free to{" "}
          <a
            className="link"
            href="https://calendly.com/carteradams"
            target="_blank"
          >
            schedule a time to chat with me
          </a>{" "}
          or email me at <span className="font-bold">help@taplo.io</span>. I
          will do my best to get back to you within 24 hours!
        </p>
      </div>
    </dialog>
  );
}

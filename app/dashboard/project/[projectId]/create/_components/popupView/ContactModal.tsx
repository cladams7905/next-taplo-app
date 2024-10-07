"use client";

import Link from "next/link";
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
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
            onClick={() => {
              modalRef?.current?.classList.add("hidden");
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-lg">Get in Touch!</h3>
        <div className="py-4">
          If you have any issues, feel free to{" "}
          <Link
            className="link link-primary"
            href="https://calendly.com/carteradams"
            target="_blank"
          >
            schedule a time to chat with me
          </Link>{" "}
          or email me at{" "}
          <Link
            href={`mailto:help@taplo.io?subject=Business%20inquiry`}
            target="_blank"
            className="link link-primary"
          >
            help@taplo.io
          </Link>
          . I will do my best to get back to you within 24 hours!
        </div>
      </div>
    </dialog>
  );
}

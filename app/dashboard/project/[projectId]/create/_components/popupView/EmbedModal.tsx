"use client";

import { RefObject } from "react";
import CodeCopyBlock from "./CodeCopyBlock";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { getURL } from "@/lib/actions";
import Link from "next/link";

export default function EmbedModal({
  modalRef,
}: {
  modalRef: RefObject<HTMLDialogElement>;
}) {
  const { activeProject } = useProjectContext();
  const codeBlock = `
  <script src="${getURL()}/scripts/main.bundle.js" defer />
  <div id="taplo-widget-container" data-project-id="${
    activeProject.id
  }"></div>`;

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box dark:border dark:border-gray-600">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
            onClick={() => {
              modalRef?.current?.close();
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-lg mb-4">Embed Project</h3>
        <div className="flex flex-col w-full gap-6">
          <p className="text-sm">
            Add these two lines of code within the html of the page you wish to
            display your popup on.
          </p>
          <CodeCopyBlock codeBlock={codeBlock} />
          <div className="text-sm">
            Need help setting up the script? Email me at{" "}
            <Link
              href={`mailto:team@taplo.io?subject=Help%20embedding%20project`}
              target="_blank"
              className="link link-primary"
            >
              team@taplo.io
            </Link>
            .
          </div>
        </div>
      </div>
    </dialog>
  );
}

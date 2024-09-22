"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useRef, memo } from "react";
import ContactModal from "./ContactModal";
import Link from "next/link";
import { Pencil, Settings, Trash2 } from "lucide-react";
import RenameProjectModal from "./RenameProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

function ViewContainerFooter({
  featuresVoteToken,
}: {
  featuresVoteToken: string | undefined;
}) {
  const contactDropdownRef = useRef<HTMLUListElement>(null);
  const contactModalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const renameModalRef = useRef<HTMLDialogElement>(null);
  const settingsDropdownRef = useRef<HTMLUListElement>(null);

  return (
    <div className="flex absolute gap-2 bottom-0 right-0 w-full justify-end items-end px-5">
      <div tabIndex={0} className="dropdown dropdown-end dropdown-top -mr-2">
        <div
          className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Project settings"
          onClick={() =>
            settingsDropdownRef.current?.classList.remove("hidden")
          }
        >
          <Settings width={20} height={20} strokeWidth={1.5} />
        </div>
        <ul
          tabIndex={0}
          ref={settingsDropdownRef}
          className={`menu menu-sm dropdown-content border border-gray-300 z-[10] shadow-md bg-base-100 rounded-md min-w-44 p-2`}
        >
          <li>
            <a
              className="flex flex-col items-start rounded-md"
              onClick={() => {
                renameModalRef.current?.showModal();
              }}
            >
              <div className="flex items-center gap-2 py-1">
                {" "}
                <Pencil width={16} height={16} />
                Rename Project
              </div>
              <RenameProjectModal
                renameModalRef={renameModalRef}
                dropdownRef={settingsDropdownRef}
              />
            </a>
          </li>
          <li>
            <a
              className="flex flex-col items-start rounded-md"
              onClick={() => {
                deleteModalRef.current?.showModal();
              }}
            >
              <div className="flex items-center gap-2 py-1">
                {" "}
                <Trash2 width={16} height={16} />
                Delete Project
              </div>
              <DeleteProjectModal
                deleteModalRef={deleteModalRef}
                dropdownRef={settingsDropdownRef}
              />
            </a>
          </li>
        </ul>
      </div>
      <div tabIndex={0} className="dropdown dropdown-end dropdown-top -mr-2">
        <div
          className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Help"
        >
          <QuestionMarkCircledIcon width={20} height={20} />
        </div>
        <ul
          tabIndex={0}
          ref={contactDropdownRef}
          className={`menu menu-sm dropdown-content border border-gray-300 z-[10] shadow-md bg-base-100 rounded-md min-w-44 p-2`}
        >
          <li>
            <Link
              href={
                featuresVoteToken
                  ? `https://taplo.features.vote/board?token=${featuresVoteToken}`
                  : "#"
              }
              target="_blank"
              className="flex flex-col items-start rounded-md"
            >
              <div className="flex items-center gap-2 py-1">
                Suggest a feature
              </div>
            </Link>
          </li>
          <li>
            <a
              className="flex flex-col items-start rounded-md"
              onClick={() => {
                contactModalRef.current?.classList.remove("hidden");
                contactModalRef.current?.showModal();
              }}
            >
              <div className="flex items-center gap-2 py-1">Contact</div>
            </a>
          </li>
        </ul>
      </div>
      <ContactModal modalRef={contactModalRef} />
    </div>
  );
}

export default memo(ViewContainerFooter);

"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useRef, memo } from "react";
import ContactModal from "./ContactModal";
import Link from "next/link";
import { Settings } from "lucide-react";

function ViewContainerFooter({
  featuresVoteToken,
}: {
  featuresVoteToken: string | undefined;
}) {
  const contactDropdownRef = useRef<HTMLUListElement>(null);
  const contactModalRef = useRef<HTMLDialogElement>(null);
  const settingsDropdownRef = useRef<HTMLUListElement>(null);

  return (
    <div className="flex absolute gap-1 bottom-0 right-0 w-full justify-end items-end px-5">
      <div
        className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20 mb-[6px]"
        data-tip="Project settings"
        onClick={() => settingsDropdownRef.current?.classList.remove("hidden")}
      >
        <Link href={"./settings"}>
          <Settings width={20} height={20} strokeWidth={1.5} />
        </Link>
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

"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

export default function ViewContainerFooter() {
  const dropdownRef = useRef<HTMLUListElement>(null);
  return (
    <div className="flex absolute bottom-0 right-0 w-full justify-end items-end px-5">
      <div tabIndex={0} className="dropdown dropdown-end dropdown-top -mr-2">
        <div
          className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Help"
        >
          <QuestionMarkCircledIcon width={20} height={20} />
        </div>
        <ul
          tabIndex={0}
          ref={dropdownRef}
          className={`menu menu-sm dropdown-content border border-gray-300 z-[10] shadow-md bg-base-100 rounded-md min-w-44 p-2`}
        >
          <li>
            <a className="flex flex-col items-start rounded-md">
              <div className="flex items-center gap-2 py-1">
                Suggest a feature
              </div>
            </a>
          </li>
          <li>
            <a className="flex flex-col items-start rounded-md">
              <div className="flex items-center gap-2 py-1">Contact</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

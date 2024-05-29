"use client";

import { Check, CirclePlus, Search } from "lucide-react";
import { useState } from "react";

export default function ProjectDropdown() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="flex flex-col">
      <label className="input input-sm flex items-center">
        <Search
          strokeWidth={1}
          color="oklch(var(--pc))"
          height={16}
          width={16}
        />
        <input
          type="text"
          className="grow w-5 ml-4"
          placeholder="Search Projects..."
        />
      </label>
      <hr className="text-gray-300"></hr>
      <div className="mt-4">
        <div className="text-xs ml-2 font-semibold text-gray-400">Projects</div>
        <ul className="mt-2 max-h-32 overflow-y-scroll">
          <li
            className={`${
              isActive ? `bg-gray-200` : ``
            } flex flex-row text-sm text-primary-content rounded-md`}
          >
            <a className="w-full flex justify-between">
              {" "}
              Untitled Project
              <Check color="oklch(var(--pc))" height={18} width={18} />
            </a>
          </li>
        </ul>
      </div>
      <hr className="text-gray-300 my-2"></hr>
      <div className="btn btn-secondary btn-sm rounded-md h-auto p-2 mt-2">
        <CirclePlus height={18} width={18} />
        New Project
      </div>
    </div>
  );
}

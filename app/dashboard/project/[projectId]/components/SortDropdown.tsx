"use client";

import { SortType } from "@/lib/enums";
import { ArrowDownAZ, ArrowDownUp, Calendar, Check } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function SortDropdown({
  sortType,
  setSortType,
}: {
  sortType: SortType;
  setSortType: Dispatch<SetStateAction<SortType>>;
}) {
  return (
    <div className="flex flex-wrap items-center">
      <ul className="menu menu-horizontal">
        <div className="dropdown dropdown-end" tabIndex={1}>
          <li className="text-sm text-primary-content font-semibold mr-1">
            <a>
              Sort
              <ArrowDownUp
                height={16}
                width={16}
                strokeWidth={1.5}
                color="oklch(var(--bc))"
              />
            </a>
          </li>
          <div
            className="dropdown-content border mt-1 border-gray-200 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
            tabIndex={1}
          >
            <ul className="flex flex-col transition-all ease-in-out duration-300">
              <li
                className={`flex flex-row text-sm text-primary-content rounded-md ${
                  sortType === SortType.dateSubmitted && `bg-gray-200`
                }`}
                onClick={() => {
                  setSortType(SortType.dateSubmitted);
                }}
              >
                <a className="w-full flex justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Calendar
                      height={16}
                      width={16}
                      strokeWidth={1.5}
                      color="oklch(var(--bc))"
                    />
                    Date Submitted
                  </div>
                  {sortType === SortType.dateSubmitted && (
                    <Check color="oklch(var(--pc))" height={18} width={18} />
                  )}
                </a>
              </li>
              <li
                className={`flex flex-row text-sm text-primary-content rounded-md ${
                  sortType === SortType.alphabetical && `bg-gray-200`
                }`}
                onClick={() => {
                  setSortType(SortType.alphabetical);
                }}
              >
                <a className="w-full flex justify-between">
                  <div className="flex flex-row items-center gap-2">
                    {" "}
                    <ArrowDownAZ
                      height={16}
                      width={16}
                      strokeWidth={1.5}
                      color="oklch(var(--bc))"
                    />
                    Alphabetical
                  </div>
                  {sortType === SortType.alphabetical && (
                    <Check color="oklch(var(--pc))" height={18} width={18} />
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  );
}

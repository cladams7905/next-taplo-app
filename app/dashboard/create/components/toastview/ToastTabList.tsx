"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export default function ToastTabList({
  currentTab,
  setCurrentTab,
}: {
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}) {
  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className="flex flex-row items-end">
      <hr className="w-8 border-t border-neutral" />
      <div role="tablist" className="tabs tabs-lifted w-fit -mt-12 shadow-lg">
        <a></a>
        <a
          role="tab"
          tabIndex={0}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 0 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Content
        </a>
        <a
          role="tab"
          tabIndex={1}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 1 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Style
        </a>
        <a></a>
      </div>
      <hr className="w-full border-t border-neutral" />
    </div>
  );
}

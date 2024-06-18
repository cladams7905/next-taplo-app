"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProjectTabList() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className="flex flex-row items-end">
      <hr className="w-full mb-2 border-t border-neutral" />
      <div role="tablist" className="tabs tabs-lifted w-fit py-2 -mt-12">
        <a></a>
        <Link
          href={"./create"}
          role="tab"
          tabIndex={0}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 0 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Create
        </Link>
        <Link
          href={"./connect"}
          role="tab"
          tabIndex={1}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 1 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Connect
        </Link>
        <Link
          href={"./share"}
          role="tab"
          tabIndex={2}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 2 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Share
        </Link>
        <Link
          href={"./settings"}
          role="tab"
          tabIndex={3}
          className={`tab [--tab-border-color:oklch(var(--n))] w-24 ${
            currentTab === 3 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Settings
        </Link>
        <a></a>
      </div>
      <hr className="w-full mb-2 border-t border-neutral" />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProjectTabList() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className="flex flex-row items-center">
      <div role="tablist" className="menu menu-horizontal tabs w-fit py-2">
        <Link
          href={"./create"}
          role="tab"
          tabIndex={0}
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-primary/50 rounded-lg w-24 ${
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
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-primary/50 rounded-lg w-24 ${
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
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-primary/50 rounded-lg  w-24 ${
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
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-primary/50 rounded-lg w-24 ${
            currentTab === 3 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
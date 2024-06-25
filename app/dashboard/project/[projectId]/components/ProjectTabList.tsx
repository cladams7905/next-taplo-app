"use client";

import { Tables } from "@/lib/supabase/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProjectTabList({
  activeProject,
}: {
  activeProject?: Tables<"Projects">;
}) {
  const pathname = usePathname();
  const setTabFromPathname = () => {
    let tabIndex = 0;
    if (activeProject) {
      switch (pathname) {
        case `/dashboard/project/${activeProject.id}/create`:
          tabIndex = 0;
          break;
        case `/dashboard/project/${activeProject.id}/connect`:
          tabIndex = 1;
          break;
        case `/dashboard/project/${activeProject.id}/settings`:
          tabIndex = 2;
          break;
        default:
          console.log(`unhandled pathname: ${pathname}`);
      }
    }
    return tabIndex;
  };
  const [currentTab, setCurrentTab] = useState(setTabFromPathname());

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className="flex flex-row items-center">
      <div
        role="tablist"
        className="menu menu-horizontal lg:inline-flex grid tabs w-fit py-2 lg:h-auto h-[58px]"
      >
        <Link
          href={"./create"}
          role="tab"
          tabIndex={0}
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-link-hover rounded-lg w-24 ${
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
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-link-hover rounded-lg w-24 ${
            currentTab === 1 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Connect
        </Link>
        <Link
          href={"./settings"}
          role="tab"
          tabIndex={2}
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-link-hover rounded-lg w-24 ${
            currentTab === 2 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

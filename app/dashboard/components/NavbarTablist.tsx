"use client";

import { Tables } from "@/supabase/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarTabList({
  activeProject,
}: {
  activeProject: Tables<"Projects"> | undefined;
}) {
  const pathname = usePathname();
  const setTabFromPathname = () => {
    let tabIndex = 0;
    switch (pathname) {
      case `/dashboard/project/${activeProject?.id}/create`:
        tabIndex = 0;
        break;
      case `/dashboard/project/${activeProject?.id}/insights`:
        tabIndex = 1;
        break;
      default:
        console.log(`unhandled pathname: ${pathname}`);
    }
    return tabIndex;
  };
  const [currentTab, setCurrentTab] = useState(setTabFromPathname());

  const handleTabClick = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <div className="flex flex-row items-center relative">
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
        <div
          role="tab"
          tabIndex={1}
          className={`tab cursor-auto rounded-lg w-24 ${
            currentTab === 1 ? "tab-active font-semibold" : ""
          }`}
        >
          Insights
        </div>
        <div className="absolute -right-[90px] mb-[6px] badge badge-primary bg-primary/20 border-none text-primary">
          Coming soon!
        </div>
      </div>
    </div>
  );
}

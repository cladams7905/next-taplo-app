"use client";

import { Tables } from "@/lib/supabase/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarTabList({
  activeProject,
}: {
  activeProject: Tables<"Projects"> | undefined;
}) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<number | null>(null);

  useEffect(() => {
    const setTabFromPathname = () => {
      let tabIndex = null;
      switch (pathname) {
        case `/dashboard/project/${activeProject?.id}/create`:
          tabIndex = 0;
          break;
        case `/dashboard/project/${activeProject?.id}/connect`:
          tabIndex = 1;
          break;
        case `/dashboard/project/${activeProject?.id}/insights`:
          tabIndex = 2;
          break;
        default:
          console.log(`unhandled pathname: ${pathname}`);
      }
      return tabIndex;
    };
    setCurrentTab(setTabFromPathname());
  }, [pathname, activeProject?.id]);

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
          href={`/dashboard/project/${activeProject?.id}/create`}
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
          href={`/dashboard/project/${activeProject?.id}/connect`}
          role="tab"
          tabIndex={1}
          className={`tab [--tab-border-color:oklch(var(--n))] [&:hover:not(.tab-active)]:bg-link-hover rounded-lg w-24 ${
            currentTab === 1 ? "tab-active font-semibold" : ""
          }`}
          onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
        >
          Connect
        </Link>
        <div
          role="tab"
          tabIndex={2}
          className={`tab cursor-auto rounded-lg w-24 ${
            currentTab === 2 ? "tab-active font-semibold" : ""
          }`}
        >
          Insights
        </div>
        <div className="absolute -right-[75px] mb-[6px] badge badge-primary text-xs bg-primary/20 border-none text-primary">
          Coming soon!
        </div>
      </div>
    </div>
  );
}

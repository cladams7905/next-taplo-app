"use client";

import { useEffect, useState, useRef } from "react";
import UserDropdown from "@/components/layout/Navbar/UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronsUpDown, Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";
import { usePathname } from "next/navigation";
import { Tables } from "@/utils/supabase/types";

export default function DashboardNavbar(props: {
  user: User;
  projects: Tables<"Projects">[];
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);
  const [isCreateProjectPage, setIsCreateProjectPage] = useState(false);

  /* The dropdown trigger ref is used to manually toggle the closing of 
  the project dropdown menu when "Create New Project" is clicked, 
  since DaisyUI doesn't have a built-in option for dropdown toggling. */
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* This check is used for toggling the navbar tablist. 
    On the create project page, the tablist should not show. */
    if (typeof window !== "undefined") {
      setIsCreateProjectPage(pathname === "/dashboard/create-project");
    }
  }, [pathname]);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <main
      className={`fixed flex flex-col items-center w-full font-sans z-30 transition-all${
        !isCreateProjectPage && ` bg-base-100 border-b border-gray-200`
      }`}
    >
      <div className="navbar flex lg:px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu color="#6b7280" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content border border-gray-200 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
            >
              <li>
                <a>Suggest a feature!</a>
              </li>
              <li>
                <a>Help</a>
              </li>
            </ul>
          </div>
          <div className="ml-2">TapInsight.io</div>
          <div className="text-gray-300 text-xl ml-6 font-thin">/</div>
          <div className="flex flex-wrap items-center">
            <ul className="menu menu-horizontal">
              <div className="dropdown">
                <li
                  className="text-sm text-primary-content font-semibold mr-1"
                  tabIndex={1}
                  onClick={() => {
                    dropdownTriggerRef?.current?.classList.remove("hidden");
                  }}
                >
                  <a>
                    {" "}
                    Select Project{" "}
                    <ChevronsUpDown
                      height={16}
                      width={16}
                      strokeWidth={1.5}
                      color="oklch(var(--bc))"
                    />
                  </a>
                </li>
                <div
                  className="dropdown-content border mt-1 border-gray-200 z-[1] p-2 shadow bg-base-100 rounded-md w-52"
                  ref={dropdownTriggerRef}
                  tabIndex={1}
                >
                  <ProjectDropdown
                    triggerElement={dropdownTriggerRef.current}
                    projects={props.projects}
                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <UserDropdown user={props.user} />
        </div>
      </div>
      {!isCreateProjectPage && (
        <div role="tablist" className="tabs tabs-bordered lg:max-w-lg">
          <a
            role="tab"
            tabIndex={0}
            className={`tab ${
              activeTab === 0
                ? "tab-active font-semibold !border-primary"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Analytics
          </a>
          <a
            role="tab"
            tabIndex={1}
            className={`tab ${
              activeTab === 1
                ? "tab-active font-semibold !border-primary"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Widgets
          </a>
          <a
            role="tab"
            tabIndex={2}
            className={`tab ${
              activeTab === 2
                ? "tab-active font-semibold !border-primary mt-0"
                : "!border-none text-gray-500"
            }`}
            onClick={(e) => handleTabClick(e.currentTarget.tabIndex)}
          >
            Settings
          </a>
        </div>
      )}
    </main>
  );
}

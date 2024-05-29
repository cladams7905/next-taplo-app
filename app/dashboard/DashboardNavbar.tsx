"use client";

import React from "react";
import UserDropdown from "@/components/layout/Navbar/UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronsUpDown, Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";

export default function DashboardNavbar(data: { user: User }) {
  return (
    <main className="fixed flex flex-col items-center w-full bg-base-100 border-b border-gray-200 font-sans z-30 transition-all">
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
          {/* <Logo/> */}
          <div className="ml-2">TapInsight.io</div>
          <div className="text-gray-300 text-xl ml-6 font-thin">/</div>
          <div className="flex flex-wrap items-center">
            <ul className="menu menu-horizontal">
              <div className="dropdown">
                <li
                  className="text-sm text-primary-content font-semibold mr-1"
                  tabIndex={1}
                >
                  <a>
                    {" "}
                    Untitled Project{" "}
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
                  tabIndex={1}
                >
                  <ProjectDropdown />
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <UserDropdown user={data.user} />
        </div>
      </div>
      <div role="tablist" className="tabs tabs-bordered lg:max-w-lg">
        <a role="tab" className="tab !border-none text-gray-500">
          Analytics
        </a>
        <a role="tab" className="tab tab-active font-semibold !border-primary ">
          Widgets
        </a>
        <a role="tab" className="tab !border-none text-gray-500">
          Settings
        </a>
      </div>
    </main>
  );
}

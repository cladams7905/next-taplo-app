"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronsUpDown, Menu } from "lucide-react";
import Tablist from "./NavbarTablist";
import ProjectDropdown from "./ProjectDropdown";
import { Tables } from "@/supabase/types";

export default function Navbar({
  user,
  projects,
  activeProject,
}: {
  user: User;
  projects: Tables<"Projects">[];
  activeProject: Tables<"Projects">;
}) {
  return (
    <main className="flex flex-col items-center w-full font-sans z-30 px-3 transition-all border-b border-neutral dark:bg-base-100 shadow-md bg-white">
      <div className="navbar flex">
        <div className="navbar-start">
          <label
            role="button"
            className="flex ml-2 mr-6 lg:hidden drawer-button"
            htmlFor="sidebar-drawer"
          >
            <Menu color="oklch(var(--bc))" />
          </label>
          <div className="font-bold">TapInsight</div>
          <div className="text-gray-300 text-xl ml-6 font-thin">/</div>
          <ul className="menu menu-horizontal">
            <div className="dropdown">
              <li className="text-sm text-primary-content mr-1" tabIndex={1}>
                <a>
                  {activeProject.name ? activeProject.name : "Untitled Project"}
                  <ChevronsUpDown
                    height={16}
                    width={16}
                    strokeWidth={1}
                    color="oklch(var(--pc))"
                  />
                </a>
              </li>
              <div
                className="dropdown-content border mt-1 border-gray-200 z-[10] p-2 shadow bg-base-100 rounded-md w-52"
                tabIndex={1}
              >
                <ProjectDropdown
                  projects={projects}
                  activeProject={activeProject}
                />
              </div>
            </div>
          </ul>
        </div>
        <div className="navbar-center hidden lg:block lg:mt-[2px]">
          <Tablist />
        </div>
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}

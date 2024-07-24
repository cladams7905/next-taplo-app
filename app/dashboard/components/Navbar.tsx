"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Menu } from "lucide-react";
import Tablist from "./NavbarTablist";
import ProjectDropdown from "./ProjectDropdown";
import { Tables } from "@/supabase/types";
import { useEffect, useState } from "react";

export default function Navbar({
  user,
  projects,
  fetchedActiveProject,
}: {
  user: User;
  projects: Tables<"Projects">[];
  fetchedActiveProject: Tables<"Projects">;
}) {
  const [activeProject, setActiveProject] = useState<
    Tables<"Projects"> | undefined
  >(fetchedActiveProject);
  const [reorderedProjects, setReorderedProjects] =
    useState<Tables<"Projects">[]>(projects);

  useEffect(() => {
    /* Reorder projects when active project changes */
    if (activeProject) {
      const updatedProjects = moveToTop(
        projects,
        projects.find((project) => project.id === activeProject.id)
      );
      setReorderedProjects(updatedProjects);
    }
  }, [activeProject, projects]);
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
          <div className="font-bold">ToastJam</div>
          <div className="text-gray-500 text-xl ml-6 font-thin">
            <ChevronRight
              height={16}
              width={16}
              strokeWidth={2}
              color="oklch(var(--bc))"
            />
          </div>
          <ProjectDropdown
            projects={reorderedProjects}
            activeProject={activeProject}
            setActiveProjectRef={setActiveProject}
          />
        </div>
        <div className="navbar-center hidden lg:block lg:mt-[2px]">
          <Tablist activeProject={activeProject} />
        </div>
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}

/**
 * Moves an array value to the top index of an array.
 * @param arr The array
 * @param value the value to move
 * @returns
 */
export function moveToTop(arr: any[], value: any) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
    arr.unshift(value);
  }
  return arr;
}

"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Menu } from "lucide-react";
import Tablist from "./NavbarTablist";
import ProjectDropdown from "./ProjectDropdown";
import { Tables } from "@/supabase/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  user,
  projects,
  fetchedActiveProject,
}: {
  user: User;
  projects: Tables<"Projects">[];
  fetchedActiveProject: Tables<"Projects">;
}) {
  const pathname = usePathname();
  const [activeProject, setActiveProject] = useState<
    Tables<"Projects"> | undefined
  >(fetchedActiveProject);
  const [reorderedProjects, setReorderedProjects] =
    useState<Tables<"Projects">[]>(projects);

  // First useEffect to set the active project
  useEffect(() => {
    setActiveProject(fetchedActiveProject);
  }, [fetchedActiveProject]);

  // Second useEffect to reorder projects when active project changes
  useEffect(() => {
    if (activeProject) {
      const updatedProjects = moveToTop(
        projects,
        projects.find((project) => project.id === activeProject.id)
      );
      setReorderedProjects(updatedProjects);
    }
  }, [activeProject, projects]);

  // Helper function to move active project to the top
  const moveToTop = (
    projects: Tables<"Projects">[],
    activeProject: Tables<"Projects"> | undefined
  ) => {
    if (!activeProject) return projects;
    return [
      activeProject,
      ...projects.filter((project) => project.id !== activeProject.id),
    ];
  };

  return (
    <main className="flex flex-col items-center w-full font-sans z-30 lg:px-3 md:px-3 sm:px-3 px-1 transition-all border-b border-gray-300 dark:bg-base-100 shadow-md bg-white">
      <div className="navbar flex">
        <div className="navbar-start">
          {activeProject && pathname !== "/dashboard/create-project" && (
            <div className="dropdown">
              <label
                role="button"
                className="mr-6 hover:bg-primary/20 active:bg-primary/20 lg:hidden md:hidden block rounded-lg p-2"
                tabIndex={0}
              >
                <Menu color="oklch(var(--bc))" />
              </label>
              <div
                tabIndex={0}
                className="dropdown-content border mt-2 border-gray-300 dark:border-gray-600 z-[10] p-2 shadow-lg bg-base-100 rounded-md w-[180px]"
              >
                <Link href={`/dashboard/project/${activeProject?.id}/create`}>
                  <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-link-hover">
                    <p className="text-sm">Create</p>
                  </button>
                </Link>
                <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-link-hover">
                  <p className="text-sm">Insights</p>
                  <div className="absolute right-0 badge badge-primary bg-primary/20 border-none text-primary text-xs">
                    Coming soon!
                  </div>
                </button>
              </div>
            </div>
          )}
          <div className="font-bold font-logo text-lg lg:text-xl">Taplo</div>
          <div className="text-gray-500 text-xl ml-6 font-thin">
            <ChevronRight
              height={16}
              width={16}
              strokeWidth={2}
              color="#d1d5db"
            />
          </div>
          <ProjectDropdown
            projects={reorderedProjects}
            activeProject={activeProject}
            setActiveProjectRef={setActiveProject}
          />
        </div>
        {activeProject && pathname !== "/dashboard/create-project" && (
          <div className="navbar-center hidden lg:block md:block lg:-mt-0 md:-mt-[10px]">
            <Tablist activeProject={activeProject} />
          </div>
        )}
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}

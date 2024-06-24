"use client";

import { useEffect, useRef, useState } from "react";
import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";
import { usePathname } from "next/navigation";
import { Tables } from "@/lib/supabase/types";
import { moveToTop } from "@/lib/actions";
import ProjectTabList from "../project/[projectId]/components/ProjectTabList";
import { showToastError } from "@/components/shared/showToast";
import { getActiveProject } from "@/lib/actions/sessionData";

export default function Navbar({
  user,
  projects,
  fetchedActiveProject,
}: {
  user: User;
  projects: Tables<"Projects">[];
  fetchedActiveProject?: Tables<"Projects">;
}) {
  const pathname = usePathname();
  const [isHiddenTabList, setIsHiddenTabList] = useState(false);
  const [activeProject, setActiveProject] = useState<
    Tables<"Projects"> | undefined
  >(fetchedActiveProject);
  const [reorderedProjects, setReorderedProjects] =
    useState<Tables<"Projects">[]>(projects);
  const sidebarDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* This check is used for toggling the navbar tablist. 
    On the create project page, the tablist should not show. */
    if (typeof window !== "undefined") {
      setIsHiddenTabList(pathname === "/dashboard/create-project");
    }
  }, [pathname]);

  useEffect(() => {
    /* Fetch and set the active project */
    const updateActiveProject = async () => {
      const { data, error } = await getActiveProject(user.id);
      if (error) {
        showToastError(error);
      } else {
        setActiveProject(data);
      }
    };
    updateActiveProject();
  }, [user.id, fetchedActiveProject]);

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
            tabIndex={0}
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
        {!isHiddenTabList && (
          <div className="navbar-center hidden lg:block">
            <ProjectTabList />
          </div>
        )}
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}

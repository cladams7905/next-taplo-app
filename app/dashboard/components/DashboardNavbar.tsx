"use client";

import { useEffect, useState } from "react";
import UserDropdown from "@/components/layout/Navbar/UserDropdown";
import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";
import { usePathname } from "next/navigation";
import { Tables } from "@/utils/supabase/types";
import { getActiveProject } from "../actions";
import { moveToTop } from "@/utils/actions";
import ProjectTabList from "./ProjectTabList";
import { showToastError } from "@/components/shared/showToast";

export default function DashboardNavbar({
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
      const { data, error } = JSON.parse(await getActiveProject(user.id));
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
    <main className="flex flex-col items-center w-full font-sans z-30 transition-all bg-slate-100">
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
                <a>Tapforms</a>
              </li>
              <li>
                <a>Insights</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          </div>
          <div className="ml-2">TapInsight.io</div>
          <div className="text-gray-300 text-xl ml-6 font-thin">/</div>
          <ProjectDropdown
            projects={reorderedProjects}
            activeProject={activeProject}
            setActiveProjectRef={setActiveProject}
          />
        </div>
        <div className="navbar-center hidden lg:block">
          <ProjectTabList isHidden={isHiddenTabList} />
        </div>
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </main>
  );
}

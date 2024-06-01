"use client";

import { useEffect, useState, useRef } from "react";
import UserDropdown from "@/components/layout/Navbar/UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronsUpDown, Menu } from "lucide-react";
import ProjectDropdown from "./ProjectDropdown";
import { usePathname } from "next/navigation";
import { Tables } from "@/utils/supabase/types";
import { getActiveProject } from "../actions";
import { ActiveProject } from "@/utils/customTypes";
import { moveToTop } from "@/utils/actions";
import ProjectTabList from "./ProjectTabList";
import { showToastError } from "@/components/shared/showToast";

export default function DashboardNavbar({
  user,
  projects,
}: {
  user: User;
  projects: Tables<"Projects">[];
}) {
  const pathname = usePathname();
  const [isHiddenTabList, setIsHiddenTabList] = useState(false);
  const [activeProject, setActiveProject] = useState<ActiveProject>();
  const [reorderedProjects, setReorderedProjects] =
    useState<Tables<"Projects">[]>(projects);

  /* The dropdown trigger ref is used to manually toggle the closing of 
  the project dropdown menu when "Create New Project" is clicked, 
  since DaisyUI doesn't have a built-in option for dropdown toggling. */
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* This check is used for toggling the navbar tablist. 
    On the create project page, the tablist should not show. */
    if (typeof window !== "undefined") {
      setIsHiddenTabList(pathname === "/dashboard/create-project");
    }
  }, [pathname]);

  useEffect(() => {
    /* This useEffect reorders the project list in the project dropdown so 
    that the active project is always at the top of the list. */
    const updateActiveProject = async () => {
      const { data, error } = JSON.parse(await getActiveProject(user.id));
      if (error) {
        showToastError(error);
      } else {
        setActiveProject(data);
        const updatedProjects = moveToTop(
          projects,
          projects.filter((project) => project.id == data.id)[0]
        );
        setReorderedProjects(updatedProjects);
      }
    };
    updateActiveProject();
  }, [user.id, projects]);

  return (
    <main
      className={`fixed flex flex-col items-center w-full font-sans z-30 transition-all${
        !isHiddenTabList && ` bg-base-100 border-b border-gray-200`
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
                    {activeProject
                      ? activeProject.project_name
                      : "Select Project"}{" "}
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
                    projects={reorderedProjects}
                    activeProject={activeProject}
                    setActiveProjectRef={setActiveProject}
                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <UserDropdown user={user} />
        </div>
      </div>
      <ProjectTabList isHidden={isHiddenTabList} />
    </main>
  );
}

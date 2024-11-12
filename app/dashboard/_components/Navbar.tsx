"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Menu } from "lucide-react";
import NavbarTabList from "./NavbarTablist";
import ProjectDropdown from "./ProjectDropdown";
import { Tables as SupabaseTables } from "@/lib/supabase/types";
import { Tables as StripeTables } from "@/lib/stripe/types";
import React, { useEffect, useState } from "react";
import FeedbackBanner from "@/app/_components/shared/FeedbackBanner";

export default function Navbar({
  user,
  projects,
  fetchedActiveProject,
  featuresVoteToken,
  paymentPlan,
  subscription,
}: {
  user: User;
  projects: SupabaseTables<"Projects">[] | null;
  fetchedActiveProject: SupabaseTables<"Projects"> | null;
  featuresVoteToken: string | null;
  paymentPlan: string | null;
  subscription: StripeTables<"subscriptions"> | undefined;
}) {
  const [activeProject, setActiveProject] = useState<
    SupabaseTables<"Projects"> | undefined
  >(fetchedActiveProject || undefined);
  const [reorderedProjects, setReorderedProjects] = useState<
    SupabaseTables<"Projects">[]
  >(projects || []);

  // First useEffect to set the active project
  useEffect(() => {
    setActiveProject(fetchedActiveProject || undefined);
  }, [fetchedActiveProject]);

  // Second useEffect to reorder projects when active project changes
  useEffect(() => {
    if (activeProject && projects) {
      const updatedProjects = moveToTop(
        projects,
        projects.find((project) => project.id === activeProject.id)
      );
      setReorderedProjects(updatedProjects);
    }
  }, [activeProject, projects]);

  // Helper function to move active project to the top
  const moveToTop = (
    projects: SupabaseTables<"Projects">[],
    activeProject: SupabaseTables<"Projects"> | undefined
  ) => {
    if (!activeProject) return projects;
    return [
      activeProject,
      ...projects.filter((project) => project.id !== activeProject.id),
    ];
  };

  return (
    <>
      {/* <FeedbackBanner featuresVoteToken={featuresVoteToken} /> */}
      <main className="flex flex-col items-center w-full font-sans z-30 lg:px-3 md:px-3 sm:px-3 px-1 transition-all border-b border-gray-300 dark:bg-base-100 shadow-md bg-white">
        <div className="navbar flex">
          <div className="navbar-start md:w-1/2 w-full">
            {activeProject && (
              <label
                htmlFor="drawer-menu"
                aria-label="open sidebar"
                role="button"
                className="mr-6 hover:bg-primary/20 active:bg-primary/20 lg:hidden md:hidden block rounded-lg p-2"
              >
                <Menu color="oklch(var(--bc))" />
              </label>
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
              paymentPlan={paymentPlan}
            />
          </div>
          {activeProject && (
            <div className="navbar-center hidden lg:block md:block lg:-mt-0 md:-mt-[10px]">
              <NavbarTabList activeProject={activeProject} />
            </div>
          )}
          <div className="navbar-end md:w-1/2 w-fit">
            <UserDropdown
              user={user}
              paymentPlan={paymentPlan}
              subscription={subscription}
            />
          </div>
        </div>
      </main>
    </>
  );
}

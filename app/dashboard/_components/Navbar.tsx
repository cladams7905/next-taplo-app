"use client";

import UserDropdown from "./UserDropdown";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Menu, MessageCircleHeart } from "lucide-react";
import NavbarTabList from "./NavbarTablist";
import ProjectDropdown from "./ProjectDropdown";
import { Tables as SupabaseTables } from "@/lib/supabase/types";
import { Tables as StripeTables } from "@/lib/stripe/types";
import React, { useEffect, useRef, useState } from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ContactModal from "./ContactModal";
import NewUserModal from "../project/[projectId]/create/_components/NewUserModal";
import Image from "next/image";
import Logo from "@/public/images/TaploLogo.svg";

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

  const contactDropdownRef = useRef<HTMLUListElement>(null);
  const contactModalRef = useRef<HTMLDialogElement>(null);
  const newUserGuideRef = useRef<HTMLDialogElement>(null);

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
      <main className="flex flex-col items-center w-full font-sans z-40 lg:px-3 md:px-3 sm:px-3 px-1 transition-all border-b border-gray-300 dark:bg-base-100 bg-white">
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
            <Image width={34} height={34} alt="logo" src={Logo} />
            {/* <div className="font-bold font-logo text-lg lg:text-xl">Taplo</div> */}
            <div className="text-gray-500 text-xl ml-6 font-thin">
              <ChevronRight
                height={16}
                width={16}
                strokeWidth={2}
                color="#d1d5db"
              />
            </div>
            <ProjectDropdown
              user={user}
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
          <div className="navbar-end md:w-1/2 w-fit gap-2">
            <div
              className="tooltip tooltip-bottom tooltip-info p-2 -mr-3 z-40 rounded-lg cursor-pointer hover:bg-primary/20"
              data-tip="Submit Feedback"
            >
              <a
                href={
                  featuresVoteToken
                    ? `https://taplo.features.vote/board?token=${featuresVoteToken}`
                    : "#"
                }
                target="_blank"
                className="flex flex-col items-start rounded-md"
              >
                <MessageCircleHeart width={20} height={20} strokeWidth={1.5} />
              </a>
            </div>
            <div tabIndex={0} className="dropdown dropdown-end max-h-9 z-40">
              <div
                className="tooltip tooltip-bottom tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
                data-tip="Help"
              >
                <QuestionMarkCircledIcon width={20} height={20} />
              </div>
              <ul
                tabIndex={0}
                ref={contactDropdownRef}
                className={`menu menu-sm dropdown-content border border-gray-300 z-40 shadow-md bg-base-100 rounded-md min-w-48 p-2`}
              >
                <li>
                  <Link
                    href={"/docs"}
                    target="_blank"
                    className="flex flex-col items-start rounded-md"
                  >
                    <div className="flex items-center gap-2 py-1">
                      Documentation
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    className="flex items-center gap-2 py-2 !rounded-lg hover:!bg-link-hover"
                    onClick={() => {
                      newUserGuideRef.current?.showModal();
                    }}
                  >
                    Getting Started Guide
                  </div>
                  <NewUserModal
                    user={user}
                    userGuideRef={newUserGuideRef}
                    hasViewedNewUserGuide={true}
                  />
                </li>
                <li>
                  <a
                    className="flex flex-col items-start rounded-md"
                    onClick={() => {
                      contactModalRef.current?.classList.remove("hidden");
                      contactModalRef.current?.showModal();
                    }}
                  >
                    <div className="flex items-center gap-2 py-1">Contact</div>
                  </a>
                </li>
              </ul>
            </div>
            <ContactModal modalRef={contactModalRef} />
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

"use client";

import { Tables } from "@/supabase/types";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  InfoIcon,
  Search,
} from "lucide-react";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";
import { showToastError } from "@/app/_components/shared/showToast";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { useRouter } from "next/navigation";
import { checkStringLength } from "@/lib/actions";
import { setActiveProject } from "@/lib/actions/projects";

export default function ProjectDropdown({
  projects,
  activeProject,
  setActiveProjectRef,
  paymentPlan,
}: {
  projects: Tables<"Projects">[];
  activeProject: Tables<"Projects"> | undefined;
  setActiveProjectRef: Dispatch<SetStateAction<Tables<"Projects"> | undefined>>;
  paymentPlan: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCreateProjectPending, startCreateProjectTransition] =
    useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  /* The dropdown toggle ref is used to manually toggle the closing of 
  the project dropdown menu when "Create New Project" is clicked, 
  since DaisyUI doesn't have a built-in option for dropdown toggling. */
  const toggleElement = useRef<HTMLDivElement>(null);

  async function handleSubmit(
    project: Tables<"Projects">,
    activeProject: Tables<"Projects">
  ) {
    startTransition(async () => {
      if (project.user_id) {
        if (activeProject.id !== project.id) {
          const { error } = await setActiveProject(
            project.user_id,
            project.id.toString()
          );
          if (error) {
            console.log(error);
            showToastError(error);
          } else {
            setActiveProjectRef(project);
          }
        }
      }
      router.push(`/dashboard/project/${project.id}/create`);
    });
  }

  const filteredProjects = projects.filter((project) =>
    project?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap items-center">
      <ul className="menu menu-horizontal w-fit">
        <div className="dropdown min-w-fit">
          <li
            className="text-sm text-base-content font-semibold mr-1 w-fit"
            tabIndex={1}
            onClick={() => {
              toggleElement?.current?.classList.remove("hidden");
            }}
          >
            <a className="w-fit px-2">
              {" "}
              {activeProject?.name ? activeProject.name : "Select Project"}{" "}
              <ChevronsUpDown
                height={16}
                width={16}
                strokeWidth={2}
                color="oklch(var(--bc))"
              />
              {isPending && (
                <span className="loading loading-spinner loading-sm bg-base-content"></span>
              )}
            </a>
          </li>
          <div
            className="dropdown-content right-[3px] md:left-0 lg:left-0 border mt-1 border-gray-300 dark:border-gray-600 z-[10] p-2 shadow-lg bg-base-100 rounded-md w-52"
            ref={toggleElement}
            tabIndex={1}
          >
            <div
              className="flex flex-col transition-all ease-in-out duration-300"
              id="project-dropdown-trigger"
            >
              <label className="input input-sm flex items-center">
                <Search
                  strokeWidth={2}
                  color="oklch(var(--bc))"
                  height={16}
                  width={16}
                />
                <input
                  type="text"
                  className="grow w-5 ml-4 !border-none"
                  placeholder="Search Projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
              <hr className="border-t border-gray-300"></hr>
              <div className="mt-4">
                <div className="text-xs ml-2 font-semibold text-gray-400">
                  Projects
                </div>
                <ul className="mt-2 max-h-32 overflow-y-scroll">
                  {activeProject &&
                    filteredProjects.map((project) => (
                      <li
                        key={project.id}
                        className={`flex flex-row text-sm text-base-content rounded-md mb-2 ${
                          activeProject?.id === project.id &&
                          !isPending &&
                          `bg-link-hover text-primary-content`
                        }`}
                        onClick={() => {
                          handleSubmit(project, activeProject);
                          setTimeout(() => {
                            toggleElement?.current?.classList.add("hidden");
                          }, 1000);
                        }}
                      >
                        <a className="w-full flex justify-between">
                          {checkStringLength(project.name)}
                          {activeProject?.id === project.id && !isPending && (
                            <Check
                              color="oklch(var(--bc))"
                              height={18}
                              width={18}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                </ul>
                {paymentPlan.includes("Starter") ? (
                  <div className="bg-primary/10 p-2 mt-2 rounded-lg text-xs flex items-center gap-2">
                    <InfoIcon width={24} height={24} />
                    <p>You are only allowed one project on the Starter plan.</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr className="my-2 border-t border-gray-300"></hr>
              <Link
                href={"/dashboard/create-project"}
                className="btn btn-primary text-white btn-sm rounded-md h-auto p-2 mt-1 min-h-[38px]"
                onClick={() => {
                  startCreateProjectTransition(() => {
                    setTimeout(() => {
                      toggleElement?.current?.classList.add("hidden");
                    }, 700);
                  });
                }}
              >
                {isCreateProjectPending ? (
                  <LoadingDots color="#FFFFFF" size="sm" />
                ) : (
                  <>
                    <CirclePlus height={18} width={18} />
                    New Project
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}

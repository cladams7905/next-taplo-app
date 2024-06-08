"use client";

import { Tables } from "@/utils/supabase/types";
import { Check, ChevronsUpDown, CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import { setActiveProject } from "../actions";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";
import { showToastError } from "@/components/shared/showToast";
import LoadingDots from "@/components/shared/LoadingDots";
import { useRouter } from "next/navigation";
import { checkStringLength } from "@/utils/actions";

export default function ProjectDropdown({
  projects,
  activeProject,
  setActiveProjectRef,
}: {
  projects: Tables<"Projects">[];
  activeProject: Tables<"Projects"> | undefined;
  setActiveProjectRef: Dispatch<SetStateAction<Tables<"Projects"> | undefined>>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCreateProjectPending, startCreateProjectTransition] =
    useTransition();
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* The dropdown trigger ref is used to manually toggle the closing of 
  the project dropdown menu when "Create New Project" is clicked, 
  since DaisyUI doesn't have a built-in option for dropdown toggling. */
  const triggerElement = useRef<HTMLDivElement>(null);

  async function handleSubmit(
    project: Tables<"Projects">,
    activeProject: Tables<"Projects">
  ) {
    setLoadingProjectId(project.id.toString());
    startTransition(async () => {
      if (project.user_id) {
        if (activeProject.id !== project.id) {
          const { error } = JSON.parse(
            await setActiveProject(project.user_id, project.id.toString())
          );
          if (error) {
            showToastError(error);
          } else {
            setActiveProjectRef(project);
          }
        }
      }
      router.push(`/dashboard/project/${project.id}`);
    });
  }

  const filteredProjects = projects.filter((project) =>
    project?.project_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap items-center">
      <ul className="menu menu-horizontal">
        <div className="dropdown">
          <li
            className="text-sm text-primary-content font-semibold mr-1"
            tabIndex={1}
            onClick={() => {
              triggerElement?.current?.classList.remove("hidden");
            }}
          >
            <a>
              {" "}
              {activeProject?.project_name
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
            ref={triggerElement}
            tabIndex={1}
          >
            <div
              className="flex flex-col transition-all ease-in-out duration-300"
              id="project-dropdown-trigger"
            >
              <label className="input input-sm flex items-center">
                <Search
                  strokeWidth={1}
                  color="oklch(var(--pc))"
                  height={16}
                  width={16}
                />
                <input
                  type="text"
                  className="grow w-5 ml-4"
                  placeholder="Search Projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
              <hr className="text-gray-300"></hr>
              <div className="mt-4">
                <div className="text-xs ml-2 font-semibold text-gray-400">
                  Projects
                </div>
                <ul className="mt-2 max-h-32 overflow-y-scroll">
                  {activeProject &&
                    filteredProjects.map((project) => (
                      <li
                        key={project.id}
                        className={`flex flex-row text-sm text-primary-content rounded-md mb-2 ${
                          activeProject?.id === project.id &&
                          !isPending &&
                          `bg-gray-200`
                        }`}
                        onClick={() => {
                          handleSubmit(project, activeProject);
                          setTimeout(() => {
                            triggerElement?.current?.classList.add("hidden");
                          }, 1000);
                        }}
                      >
                        <a className="w-full flex justify-between">
                          {checkStringLength(project.project_name)}
                          {activeProject?.id === project.id && !isPending && (
                            <Check
                              color="oklch(var(--pc))"
                              height={18}
                              width={18}
                            />
                          )}
                          {isPending &&
                            loadingProjectId === project.id.toString() && (
                              <LoadingDots />
                            )}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <hr className="text-gray-300 my-2"></hr>
              <Link
                href={"/dashboard/create-project"}
                className="btn btn-primary btn-sm rounded-md h-auto p-2 mt-1 min-h-[38px]"
                onClick={() => {
                  startCreateProjectTransition(() => {
                    setTimeout(() => {
                      triggerElement?.current?.classList.add("hidden");
                    }, 700);
                  });
                }}
              >
                {isCreateProjectPending ? (
                  <LoadingDots color="#FFFFFF" />
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

"use client";

import { ActiveProject } from "@/utils/customTypes";
import { Tables } from "@/utils/supabase/types";
import { Check, CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import { setActiveProject } from "../actions";
import { Dispatch, SetStateAction } from "react";
import { showToastError } from "@/components/shared/showToast";

export default function ProjectDropdown({
  triggerElement,
  projects,
  activeProject,
  setActiveProjectRef,
}: {
  triggerElement: HTMLDivElement | null;
  projects: Tables<"Projects">[];
  activeProject: ActiveProject | undefined;
  setActiveProjectRef: Dispatch<SetStateAction<ActiveProject | undefined>>;
}) {
  return (
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
        />
      </label>
      <hr className="text-gray-300"></hr>
      <div className="mt-4">
        <div className="text-xs ml-2 font-semibold text-gray-400">Projects</div>
        <ul className="mt-2 max-h-32 overflow-y-scroll">
          {activeProject &&
            projects.map((project, i) => (
              <li
                key={project.id}
                className={`flex flex-row text-sm text-primary-content rounded-md mb-2 ${
                  activeProject?.id === project.id && `bg-gray-200`
                }`}
                onClick={async () => {
                  if (project.user_id) {
                    const { error } = JSON.parse(
                      await setActiveProject(
                        project.user_id,
                        project.id.toString()
                      )
                    );
                    if (error) {
                      showToastError(error);
                    }
                  }
                }}
              >
                <a className="w-full flex justify-between">
                  {project.project_name}
                  {activeProject?.id === project.id && (
                    <Check color="oklch(var(--pc))" height={18} width={18} />
                  )}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <hr className="text-gray-300 my-2"></hr>
      <Link
        href={"/dashboard/create-project"}
        className="btn btn-primary btn-sm rounded-md h-auto p-2 mt-1"
        onClick={() => {
          triggerElement?.classList.add("hidden");
        }}
      >
        <CirclePlus height={18} width={18} />
        New Project
      </Link>
    </div>
  );
}

"use client";

import { Tables } from "@/supabase/types";
import { Check, CirclePlus, Search } from "lucide-react";
import { useState } from "react";

export default function ProjectDropdown({
  projects,
  activeProject,
}: {
  projects: Tables<"Projects">[];
  activeProject: Tables<"Projects">;
}) {
  const [isActive, setIsActive] = useState(true);
  const [currentProjects, setCurrentProjects] =
    useState<Tables<"Projects">[]>(projects);

  /**
   * const handleCreateToast = () => {
    startTransition(async () => {
      const { data, error } = await createUserToast({
        title: checkDuplicateTitle(
          userToasts.map((toast) => toast.title),
          "New Toast"
        ),
        bg_color: "#FFFFFF",
        text_color: "#172554",
        accent_color: "#6b7280",
        border_color: "#D1D3D7",
        verified_color: "#4ade80",
        screen_alignment: ScreenAlignment.BottomLeft,
      });
      if (error) {
        showToastError(error);
      } else {
        setCurrentToasts((prevToasts) => [...prevToasts, data]);
        setActiveToast(data);
        templateModalRef.current?.showModal();
      }
    });
  };

  useEffect(() => {
    if (activeToast) {
      setCurrentToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === activeToast.id ? { ...toast, ...activeToast } : toast
        )
      );
    }
  }, [activeToast, setCurrentToasts]);

  const sortedToasts = userToasts?.sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";
    return titleA.localeCompare(titleB);
  });
   */
  return (
    <div className="flex flex-col">
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
          {currentProjects.map((project, i) => (
            <li
              key={i}
              className={`${
                project.is_active ? `bg-gray-200` : ``
              } flex flex-row text-sm text-primary-content rounded-md`}
            >
              <a className="w-full flex justify-between">
                {project.name ? project.name : "Untitled Project"}
                {project.is_active && (
                  <Check color="oklch(var(--pc))" height={18} width={18} />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="text-gray-300 my-2"></hr>
      <div className="btn btn-secondary btn-sm rounded-md h-auto p-2 mt-3">
        <CirclePlus height={18} width={18} />
        New Project
      </div>
    </div>
  );
}

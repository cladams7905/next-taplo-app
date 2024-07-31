"use client";

import { Tables } from "@/supabase/types";
import "react-color-palette/css";
import {
  Code2Icon,
  Ellipsis,
  Fullscreen,
  Pencil,
  TrashIcon,
} from "lucide-react";
import { IColor } from "react-color-palette";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import RenameProjectModal from "./RenameProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import PreviewContainer from "./PreviewContainer";

export default function PopupContainerHeader({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
}) {
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const renameModalRef = useRef<HTMLDialogElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      previewRef.current &&
      previewRef.current.contains(event.target as Node)
    ) {
      previewRef.current.classList.add("hidden");
      previewRef.current.classList.remove("flex");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div
          className="tooltip tooltip-bottom tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Preview"
          onClick={() => {
            previewRef.current?.classList.remove("hidden");
            previewRef.current?.classList.add("flex");
          }}
        >
          <Fullscreen width={20} height={20} />
        </div>
        <PreviewContainer
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          verifiedColor={verifiedColor}
          borderColor={borderColor}
          previewRef={previewRef}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="btn btn-primary text-white text-xs btn-sm">
          Embed
          <Code2Icon width={18} height={18} />
        </div>
        <div tabIndex={0} className="dropdown dropdown-end">
          <div
            className="tooltip tooltip-bottom tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20 mt-1"
            onClick={() => dropdownRef.current?.classList.remove("hidden")}
            data-tip="Settings"
          >
            <Ellipsis width={20} height={20} />
          </div>
          <ul
            tabIndex={0}
            ref={dropdownRef}
            className={`menu menu-sm dropdown-content border border-gray-300 z-[10] shadow-md bg-base-100 rounded-md min-w-44 p-2`}
          >
            <li>
              <a
                className="flex flex-col items-start rounded-md"
                onClick={() => {
                  renameModalRef.current?.showModal();
                }}
              >
                <div className="flex items-center gap-2 py-1">
                  {" "}
                  <Pencil width={16} height={16} />
                  Rename Project
                </div>
                <RenameProjectModal
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                  renameModalRef={renameModalRef}
                  dropdownRef={dropdownRef}
                  project={activeProject}
                />
              </a>
            </li>
            <li>
              <a
                className="flex flex-col items-start rounded-md"
                onClick={() => {
                  deleteModalRef.current?.showModal();
                }}
              >
                <div className="flex items-center gap-2 py-1">
                  {" "}
                  <TrashIcon width={16} height={16} />
                  Delete Project
                </div>
                <DeleteProjectModal
                  deleteModalRef={deleteModalRef}
                  dropdownRef={dropdownRef}
                  project={activeProject}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

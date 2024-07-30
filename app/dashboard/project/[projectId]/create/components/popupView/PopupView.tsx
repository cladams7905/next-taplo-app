"use client";

import { Tables } from "@/supabase/types";
import "react-color-palette/css";
import {
  Code2Icon,
  Ellipsis,
  MonitorSmartphone,
  PauseIcon,
  Pencil,
  TrashIcon,
} from "lucide-react";
import { PopupTemplates, ScreenAlignment } from "@/lib/enums";
import ToastPopup from "../toastview/ToastPopup";
import { IColor } from "react-color-palette";
import { Dispatch, SetStateAction, useRef } from "react";
import RenameProjectModal from "./RenameProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

export default function PopupView({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
}: {
  activeProject: Tables<"Projects"> | undefined;
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
  return activeProject !== undefined ? (
    <div className="flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-purple-100 h-full shadow-lg z-[1]">
      <div className="w-full lg:h-1/3 h-1/2 py-4 px-[25px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <MonitorSmartphone width={20} height={20} />
            <PauseIcon width={18} height={18} />
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
                className={`menu menu-sm dropdown-content border border-neutral z-[10] shadow bg-base-100 rounded-md min-w-44 p-2`}
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
        <div className="flex items-center h-[75vh] w-full py-12 px-20">
          <div className="relative flex items-center justify-center bg-white/60 border border-base-300 rounded-lg shadow-lg h-full w-full p-4">
            <p className="text-gray-400 text-xl">Your website</p>
            {activeProject.template === PopupTemplates.Toast ? (
              <div
                className={`absolute p-[inherit] ${
                  activeProject.screen_alignment === ScreenAlignment.BottomLeft
                    ? "bottom-0 left-0"
                    : ""
                }
                ${
                  activeProject.screen_alignment === ScreenAlignment.TopLeft
                    ? "top-0 left-0"
                    : ""
                }
                ${
                  activeProject.screen_alignment === ScreenAlignment.BottomRight
                    ? "bottom-0 right-0"
                    : ""
                }
                ${
                  activeProject.screen_alignment === ScreenAlignment.TopRight
                    ? "top-0 right-0"
                    : ""
                }`}
              >
                <ToastPopup
                  activeProject={activeProject}
                  events={events}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                  accentColor={accentColor}
                  borderColor={borderColor}
                  verifiedColor={verifiedColor}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>No popup</>
  );
}

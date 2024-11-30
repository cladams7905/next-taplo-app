"use client";

import { showToastError } from "@/app/_components/shared/showToast";
import { updateProject } from "@/lib/actions/projects";
import useScroll from "@/lib/hooks/use-scroll";
import { RefObject, useState, useTransition } from "react";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { HelpCircleIcon } from "lucide-react";

export default function AdditionalSettings({
  scrollRef,
  styleHeaderHeight,
  isPreviewMode,
}: {
  scrollRef: RefObject<HTMLDivElement>;
  styleHeaderHeight: number | undefined;
  isPreviewMode: boolean;
}) {
  const { activeProject, setActiveProject, displayTime, setDisplayTime } =
    useProjectContext();
  const [isSettingsPending, startSettingsTransition] = useTransition();
  const [eventInterval, setEventInterval] = useState<number>(
    activeProject.event_interval
  );
  const scrolled = useScroll(styleHeaderHeight, scrollRef);

  const handleSetEventInterval = (interval: number) => {
    startSettingsTransition(async () => {
      setEventInterval(interval);
      const projectUpdateResult = await updateProject(activeProject.id, {
        ...activeProject,
        event_interval: interval,
      });

      if (projectUpdateResult.error) {
        showToastError(projectUpdateResult.error);
      } else {
        setActiveProject({
          ...activeProject,
          event_interval: interval,
        });
      }
    });
  };

  const handleSetDisplayTime = (displayTime: number) => {
    startSettingsTransition(async () => {
      setDisplayTime(displayTime);
      const projectUpdateResult = await updateProject(activeProject.id, {
        ...activeProject,
        display_time: displayTime,
      });

      if (projectUpdateResult.error) {
        showToastError(projectUpdateResult.error);
      } else {
        setActiveProject({
          ...activeProject,
          display_time: displayTime,
        });
      }
    });
  };
  return (
    <div className="sticky top-[128px] flex flex-col border-t bg-white border-b border-gray-300 pb-4 z-[0]">
      <div className="flex flex-col w-full h-fit">
        <div
          className={`flex items-center sticky top-[-1px] px-4 py-6 gap-2 bg-white border-gray-300 ${
            scrolled ? "border-b -mb-[1px]" : ""
          } ${isPreviewMode ? "z-[1]" : "z-[2]"}`}
        >
          <div className="font-semibold ml-2 text-md">Settings</div>
          {isSettingsPending && (
            <span className="loading loading-spinner loading-xs bg-base-content"></span>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 gap-6">
        <div className="flex flex-col w-full gap-3 px-2">
          <div className="flex flex-row items-center justify-between gap-2 text-sm px-2">
            Show events from the past
            <div className="flex items-center gap-2">
              <select
                defaultValue={eventInterval || "default"}
                className="select select-bordered select-sm w-full max-w-20"
                onChange={(e) => handleSetEventInterval(Number(e.target.value))}
              >
                <option disabled value={"default"}>
                  Select
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </select>
              days
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 text-sm px-2">
            <div className="flex items-center gap-2">
              Popup display duration
              <div
                className="tooltip tooltip-top tooltip-info"
                data-tip="The length of time each popup notification is displayed (in milliseconds)."
              >
                <HelpCircleIcon size={16} strokeWidth={1.75} />
              </div>
            </div>
            <div className="flex items-center gap-2 mr-[10px]">
              <input
                className="input input-bordered input-sm max-w-20"
                defaultValue={displayTime}
                onBlur={(e) => handleSetDisplayTime(Number(e.target.value))}
              />
              ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

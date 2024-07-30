"use client";

import useScroll from "@/lib/hooks/use-scroll";
import { RefObject, useTransition } from "react";

export default function AdditionalSettings({
  scrollRef,
  styleHeaderHeight,
}: {
  scrollRef: RefObject<HTMLDivElement>;
  styleHeaderHeight: number | undefined;
}) {
  const [isSettingsPending, startSettingsTransition] = useTransition();
  const scrolled = useScroll(styleHeaderHeight, scrollRef);
  return (
    <div className="sticky top-[128px] flex flex-col border-t bg-white border-b border-base-300 pb-6 z-[3]">
      <div className="flex flex-col w-full h-fit">
        <div
          className={`flex items-center sticky top-[-1px] text-xs px-4 py-6 gap-2 bg-white border-base-300 ${
            scrolled ? "border-b -mb-[1px]" : ""
          }`}
        >
          <div className="font-semibold text-gray-400 ml-2">Settings</div>
          {isSettingsPending && (
            <span className="loading loading-spinner loading-xs bg-base-content"></span>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 gap-6">
        <div className="flex flex-col gap-6 rounded-lg border border-base-300 px-5 pt-3 pb-5">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="text-sm font-bold">General</p>
          </div>
          <p className="text-xs">Show city in location</p>
          <p className="text-xs">Only show events from the past ____ days</p>
        </div>
        <div className="flex flex-col gap-6 rounded-lg border border-base-300 px-5 pt-3 pb-5">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="text-sm font-bold">Project Settings</p>
          </div>
          <p className="text-xs">Rename project</p>
          <p className="text-xs">Delete project</p>
        </div>
      </div>
    </div>
  );
}

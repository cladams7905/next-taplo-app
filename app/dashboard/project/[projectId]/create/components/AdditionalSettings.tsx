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
      <div className="flex flex-col p-4 py-2 gap-6">
        <div className="flex flex-col w-full gap-3 px-2">
          <div className="flex flex-row items-center gap-2 text-sm">
            Only show events from the past
            <select className="select select-bordered select-sm w-full max-w-24">
              <option disabled selected>
                Select
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>10</option>
              <option>15</option>
              <option>30</option>
              <option>60</option>
              <option>90</option>
            </select>
            days{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

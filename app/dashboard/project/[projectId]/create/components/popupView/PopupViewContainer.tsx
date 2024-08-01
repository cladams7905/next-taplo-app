"use client";

import { Tables } from "@/supabase/types";
import { IColor } from "react-color-palette";
import { Dispatch, SetStateAction } from "react";
import PopupContainerHeader from "./PopupContainerHeader";
import PopupList from "./PopupList";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function PopupViewContainer({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  isInPreview,
  setIsInPreview,
  displayTime,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  activeEvent: Tables<"Events"> | undefined;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  isInPreview: boolean;
  setIsInPreview: Dispatch<SetStateAction<boolean>>;
  displayTime: number;
}) {
  return (
    <div className="relative flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-purple-100 h-full shadow-lg z-[1]">
      <div className="w-full py-4 px-5">
        <PopupContainerHeader
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          verifiedColor={verifiedColor}
          borderColor={borderColor}
          isInPreview={isInPreview}
          setIsInPreview={setIsInPreview}
          displayTime={displayTime}
        />

        <div className="flex justify-center items-center h-[75vh] w-full py-12 px-20">
          {events.length > 0 && (
            <PopupList
              activeProject={activeProject}
              setActiveProject={setActiveProject}
              events={events}
              activeEvent={activeEvent}
              backgroundColor={backgroundColor}
              accentColor={accentColor}
              textColor={textColor}
              verifiedColor={verifiedColor}
              borderColor={borderColor}
            />
          )}
        </div>
      </div>
      <div className="flex w-full justify-end items-end px-5">
        <div
          className="tooltip tooltip-top tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Help"
        >
          <QuestionMarkCircledIcon width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
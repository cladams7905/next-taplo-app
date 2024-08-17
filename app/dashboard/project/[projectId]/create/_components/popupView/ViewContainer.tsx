"use client";

import { Tables } from "@/supabase/types";
import { IColor } from "react-color-palette";
import { Dispatch, SetStateAction, useTransition } from "react";
import PopupViewer from "./PopupViewer";
import ViewContainerHeader from "./ViewContainerHeader";
import ViewContainerFooter from "./ViewContainerFooter";

export default function ViewContainer({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  activeEvent,
  setActiveEvent,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  isPreviewMode,
  setPreviewMode,
  displayTime,
  replaceVariablesInContentBody,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  isPreviewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
  displayTime: number;
  replaceVariablesInContentBody: (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => string;
}) {
  const [isLoadPending, startLoadTransition] = useTransition();

  return (
    <div className="relative flex flex-col !rounded-none bg-gradient-to-tr from-primary/90 to-purple-100 h-full z-[1] py-2 px-5">
      <ViewContainerHeader
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        events={events}
        activeEvent={activeEvent}
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        textColor={textColor}
        borderColor={borderColor}
        isPreviewMode={isPreviewMode}
        setPreviewMode={setPreviewMode}
        displayTime={displayTime}
        isLoadPending={isLoadPending}
        replaceVariablesInContentBody={replaceVariablesInContentBody}
      />
      <div className="flex justify-center items-center w-full h-full">
        {events.length > 0 && (
          <PopupViewer
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            activeEvent={activeEvent}
            setActiveEvent={setActiveEvent}
            backgroundColor={backgroundColor}
            accentColor={accentColor}
            textColor={textColor}
            borderColor={borderColor}
            startLoadTransition={startLoadTransition}
            replaceVariablesInContentBody={replaceVariablesInContentBody}
          />
        )}
      </div>
      <ViewContainerFooter />
    </div>
  );
}

"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { IColor } from "react-color-palette";
import TemplatePopup from "./TemplatePopup";
import TemplateList from "./TemplateList";
import { Pencil } from "lucide-react";

export default function PopupList({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
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
}) {
  return (
    <div className="flex flex-col w-full items-center gap-3 max-w-[40vw] p-4 px-6 rounded-lg">
      <div className="flex flex-col w-full items-center">
        <div className="w-full max-w-[320px]">
          <div className="px-4 py-2 w-fit text-sm font-bold mb-2">
            {activeEvent ? activeEvent.event_type : ""}
          </div>
        </div>
        <TemplatePopup
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          events={events}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          textColor={textColor}
          verifiedColor={verifiedColor}
          borderColor={borderColor}
        />
      </div>
      <div className="flex w-full justify-end items-center max-w-[320px]">
        <div className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs font-bold">
          <Pencil height={14} width={14} />
          Change Template
        </div>
      </div>
      <TemplateList
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
    </div>
  );
}

"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction } from "react";
import { IColor } from "react-color-palette";
import TemplatePopup from "./TemplatePopup";

export default function PopupList({
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
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex w-full max-w-[35vw] items-start">
        <div className="bg-white/40 rounded-lg rounded-b-none px-4 py-2 w-fit text-sm font-bold">
          On Review
        </div>
      </div>
      <div className="flex flex-col w-full h-full max-w-[35vw] rounded-lg rounded-tl-none justify-start p-4 gap-4 bg-white/40 overflow-y-scroll max-h-[70vh]">
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
    </div>
  );
}

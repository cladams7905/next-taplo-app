"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, RefObject, SetStateAction } from "react";
import { IColor } from "react-color-palette";
import PopupTemplate from "./PopupTemplate";
import { TemplateTypes, ScreenAlignment } from "@/lib/enums";

export default function PreviewContainer({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  previewRef,
  displayTime,
  isPreviewMode,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  borderColor: IColor;
  previewRef: RefObject<HTMLDivElement>;
  displayTime: number;
  isPreviewMode: boolean;
}) {
  return (
    <div
      ref={previewRef}
      className="items-center justify-center fixed hidden w-full h-full top-0 left-0 z-50 bg-black/30 text-lg p-5"
    >
      <div
        className={`absolute p-[inherit] 
          ${
            activeProject.screen_alignment === ScreenAlignment.BottomLeft
              ? "bottom-0 left-0"
              : activeProject.screen_alignment === ScreenAlignment.TopLeft
              ? "top-0 left-0"
              : activeProject.screen_alignment === ScreenAlignment.BottomRight
              ? "bottom-0 right-0"
              : activeProject.screen_alignment === ScreenAlignment.TopRight
              ? "top-0 right-0"
              : activeProject.screen_alignment === ScreenAlignment.BottomCenter
              ? "bottom-0"
              : activeProject.screen_alignment === ScreenAlignment.TopCenter
              ? "top-0"
              : ""
          }`}
      >
        <PopupTemplate
          activeProject={activeProject}
          backgroundColor={backgroundColor}
          textColor={textColor}
          accentColor={accentColor}
          borderColor={borderColor}
          displayTime={displayTime}
          isPreviewMode={isPreviewMode}
        />
      </div>
    </div>
  );
}

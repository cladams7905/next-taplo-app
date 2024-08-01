"use client";

import { Tables } from "@/supabase/types";
import { Dispatch, RefObject, SetStateAction } from "react";
import { IColor } from "react-color-palette";
import PreviewPopup from "./PreviewPopup";
import { PopupTemplates, ScreenAlignment } from "@/lib/enums";

export default function PreviewContainer({
  activeProject,
  setActiveProject,
  events,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  previewRef,
  displayTime,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  previewRef: RefObject<HTMLDivElement>;
  displayTime: number;
}) {
  return (
    <div
      ref={previewRef}
      className="items-center justify-center fixed hidden w-full h-full top-0 left-0 z-40 bg-black/30 text-lg p-5"
    >
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
          <PreviewPopup
            activeProject={activeProject}
            events={events}
            backgroundColor={backgroundColor}
            textColor={textColor}
            accentColor={accentColor}
            borderColor={borderColor}
            verifiedColor={verifiedColor}
            displayTime={displayTime}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

"use client";

import { RefObject } from "react";
import PopupTemplate from "./PopupTemplate";
import { ScreenAlignment } from "@/lib/enums";
import { useProjectContext } from "../ProjectBoard";

export default function PreviewContainer({
  previewRef,
}: {
  previewRef: RefObject<HTMLDivElement>;
}) {
  const { activeProject } = useProjectContext();
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
        <PopupTemplate isPreviewMode={true} />
      </div>
    </div>
  );
}

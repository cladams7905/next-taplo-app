"use client";

import PopupViewer from "./PopupViewer";
import ViewContainerHeader from "./ViewContainerHeader";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { Dispatch, SetStateAction } from "react";

export default function ViewContainer({
  isPreviewMode,
  setPreviewMode,
}: {
  isPreviewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { events } = useProjectContext();
  return (
    <div className="relative flex flex-col !rounded-none h-full z-[1]">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex flex-col h-full">
        <ViewContainerHeader
          isPreviewMode={isPreviewMode}
          setPreviewMode={setPreviewMode}
        />
        {events.length > 0 && <PopupViewer />}
      </div>
    </div>
  );
}

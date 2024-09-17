"use client";

import PopupViewer from "./PopupViewer";
import ViewContainerHeader from "./ViewContainerHeader";
import ViewContainerFooter from "./ViewContainerFooter";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { Dispatch, SetStateAction } from "react";

export default function ViewContainer({
  featuresVoteToken,
  isPreviewMode,
  setPreviewMode,
}: {
  featuresVoteToken: string | undefined;
  isPreviewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { events } = useProjectContext();
  return (
    <div className="relative flex flex-col !rounded-none bg-gradient-to-tr from-primary to-purple-100 h-full z-[1] py-2 px-5">
      <ViewContainerHeader
        isPreviewMode={isPreviewMode}
        setPreviewMode={setPreviewMode}
      />
      <div className="flex justify-center items-center w-full h-full">
        {events.length > 0 && <PopupViewer />}
      </div>
      <ViewContainerFooter featuresVoteToken={featuresVoteToken} />
    </div>
  );
}

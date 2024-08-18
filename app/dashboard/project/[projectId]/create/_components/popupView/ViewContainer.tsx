"use client";

import PopupViewer from "./PopupViewer";
import ViewContainerHeader from "./ViewContainerHeader";
import ViewContainerFooter from "./ViewContainerFooter";
import { useProjectContext } from "../ProjectBoard";

export default function ViewContainer() {
  const { events } = useProjectContext();
  return (
    <div className="relative flex flex-col !rounded-none bg-gradient-to-tr from-primary/90 to-purple-100 h-full z-[1] py-2 px-5">
      <ViewContainerHeader />
      <div className="flex justify-center items-center w-full h-full">
        {events.length > 0 && <PopupViewer />}
      </div>
      <ViewContainerFooter />
    </div>
  );
}

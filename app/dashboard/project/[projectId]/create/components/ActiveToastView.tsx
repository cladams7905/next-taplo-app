"use client";

import { Tables } from "@/supabase/types";
import ToastTabList from "./toastview/ToastTabList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToastPopup from "./toastview/ToastPopup";
import { RenameToastButton } from "./toastview/RenameToastButton";
import { DeleteToastButton } from "./toastview/DeleteToastButton";
import { ToastEventTab } from "./toastview/ToastEventTab";
import { NoToastView } from "./toastview/NoToastView";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import { ToastContentTab } from "./toastview/ToastContentTab";

export default function ActiveProjectView({
  activeProject,
  setActiveProject,
  integrations,
}: {
  activeProject: Tables<"Projects"> | undefined;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  integrations: Tables<"Integrations">[];
}) {
  const [currentTab, setCurrentTab] = useState(0);

  return activeProject !== undefined ? (
    <div className="flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-purple-100 h-full shadow-lg z-[1]">
      <div className="w-full lg:h-1/3 h-1/2 p-4">
        <div className="flex justify-between items-center">
          {/* <RenameToastButton
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            setCurrentProjects={setCurrentProjects}
          />
          <DeleteToastButton
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            setCurrentProjects={setCurrentProjects}
          /> */}
        </div>
        <div className="flex items-center justify-center">
          {/* <ToastPopup
            activeProject={activeProject}
            products={products}
            backgroundToastColor={backgroundToastColor}
            textColor={textColor}
            accentColor={accentColor}
            verifiedColor={verifiedColor}
            borderColor={borderColor}
            isShowProductsChecked={isShowProductsChecked}
            productImageSrc={productImageSrc}
          /> */}
        </div>
      </div>
    </div>
  ) : (
    <NoToastView />
  );
}

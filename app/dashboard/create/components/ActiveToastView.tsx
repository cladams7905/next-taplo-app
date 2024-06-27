"use client";

import { Tables } from "@/supabase/types";
import ToastTabList from "./toastview/ToastTabList";
import { Dispatch, SetStateAction, useState } from "react";
import ToastPopup from "./toastview/ToastPopup";
import { RenameToastButton } from "./toastview/RenameToastButton";
import { DeleteToastButton } from "./toastview/DeleteToastButton";
import { ToastEventTab } from "./toastview/ToastEventTab";
import { ToastContentTab } from "./toastview/ToastContentTab";
import { NoToastView } from "./toastview/NoToastView";

export default function ActiveToastView({
  activeToast,
  setActiveToast,
  setCurrentToasts,
  integrations,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"Toasts">[]>>;
  integrations: Tables<"Integrations">[];
}) {
  const [currentTab, setCurrentTab] = useState(0);

  return activeToast !== undefined ? (
    <div className="flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-violet-100 h-full shadow-lg z-[1]">
      <div className="w-full lg:h-1/3 h-1/2 p-4">
        <div className="flex justify-between items-center">
          <RenameToastButton
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            setCurrentToasts={setCurrentToasts}
          />
          <DeleteToastButton
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            setCurrentToasts={setCurrentToasts}
          />
        </div>
        <div className="flex h-full w-full lg:items-start items-center justify-center -mt-8 lg:mt-4">
          <ToastPopup activeToast={activeToast} />
        </div>
      </div>
      <ToastTabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col w-full items-center h-2/3 overflow-y-auto bg-white dark:bg-base-100 rounded-br-lg p-6 gap-6">
        {currentTab === 0 && (
          <ToastEventTab
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            integrations={integrations}
          />
        )}
        {currentTab === 1 && <ToastContentTab activeToast={activeToast} />}
        {/* {currentTab === 2 && <ToastStyleTab activeToast={activeToast} />} */}
      </div>
    </div>
  ) : (
    <NoToastView />
  );
}

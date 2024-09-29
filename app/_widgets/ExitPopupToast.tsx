import { Tables } from "@/supabase/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";

export default function ExitPopupToast({
  projectData,
  showExitPopupToast,
}: {
  projectData: Tables<"Projects">;
  showExitPopupToast: boolean;
}) {
  return (
    <div className="fixed z-50 bottom-4 flex items-center justify-center w-full">
      <div
        style={{
          backgroundColor: projectData.bg_color || "#FFFFFF",
          borderColor: projectData.border_color || "#FFFFFF",
          color: projectData.text_color || "#000000",
        }}
        className={`flex items-center border text-sm w-fit rounded-lg shadow-lg px-4 py-2 ${
          showExitPopupToast
            ? "animate-twSlideInBottom"
            : "animate-twSlideOutBottom"
        }`}
      >
        <InfoCircledIcon width={16} height={16} className="mr-2" />
        Notifications will be paused for 5 minutes.
      </div>
    </div>
  );
}

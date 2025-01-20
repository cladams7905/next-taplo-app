import { Tables } from "@/lib/supabase/types";
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
    <div className="taplo-fixed taplo-z-50 taplo-bottom-4 taplo-flex taplo-items-center taplo-justify-center taplo-w-full">
      <div
        style={{
          backgroundColor: projectData.bg_color || "#FFFFFF",
          borderColor: projectData.border_color || "#FFFFFF",
          color: projectData.text_color || "#000000",
        }}
        className={`taplo-flex taplo-items-center taplo-border taplo-text-sm taplo-w-fit taplo-rounded-lg taplo-shadow-lg taplo-px-4 taplo-py-2 ${
          showExitPopupToast
            ? "taplo-animate-twSlideInBottom"
            : "taplo-animate-twSlideOutBottom"
        }`}
      >
        <InfoCircledIcon width={16} height={16} className="taplo-mr-2" />
        Notifications will be paused for 5 minutes.
      </div>
    </div>
  );
}

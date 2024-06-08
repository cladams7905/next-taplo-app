"use client";

import { Frown, Smile } from "lucide-react";
import { toast } from "@/components/shared/use-toast";
import Draggable from "react-draggable";

export default function OneTapSurvey() {
  return (
    <Draggable>
      <div
        onMouseEnter={() => {
          toast({
            className: "w-fit",
            description: (
              <div className="w-full p-2">
                Do you like this feature?
                <div className="flex flex-row gap-2 mt-2">
                  <div className="btn btn-sm grow">
                    <Smile width={20} height={20} />
                  </div>
                  <div className="btn btn-sm grow">
                    <Frown width={20} height={20} />
                  </div>
                </div>
              </div>
            ),
          });
        }}
      >
        Test feature
      </div>
    </Draggable>
  );
}

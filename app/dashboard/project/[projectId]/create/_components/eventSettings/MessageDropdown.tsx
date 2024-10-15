"use client";

import { replaceVariablesInContentBody } from "@/lib/actions";
import { EventType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import { ChevronDown } from "lucide-react";
import React, { useRef } from "react";

export default function MessageDropdown({
  currentEvent,
}: {
  currentEvent: Tables<"Events">;
}) {
  {
    const messageOptions = getMessageOptions(
      currentEvent.event_type as EventType
    );

    const toggleModalRef = useRef<HTMLDivElement>(null);
    return (
      <>
        <div
          className="dropdown"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleModalRef?.current?.classList.remove("hidden");
          }}
        >
          <div
            tabIndex={0}
            className={`!relative flex p-2 px-3 items-center justify-between cursor-pointer border bg-white border-gray-200 rounded-lg text-sm`}
          >
            <div
              className="flex items-center gap-[2px]"
              dangerouslySetInnerHTML={{
                __html: replaceVariablesInContentBody(currentEvent.message),
              }}
            />
            <ChevronDown width={16} height={16} />
          </div>
          <div
            tabIndex={0}
            ref={toggleModalRef}
            className="!absolute dropdown-content bg-white border border-gray-200 shadow-md z-50 rounded-lg w-full mt-1 h-fit min-h-16"
          >
            <ul className="h-full w-full overflow-y-scroll">
              {messageOptions.map((option, index) => (
                <li
                  key={index}
                  className="p-2 px-3 cursor-pointer hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleModalRef?.current?.classList.add("hidden");
                    // setEventMessage(option);
                  }}
                  dangerouslySetInnerHTML={{
                    __html: replaceVariablesInContentBody(option),
                  }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const getMessageOptions = (eventType: EventType) => {
  let options: string[] = [];
  switch (eventType) {
    case EventType.ActiveVisitors:
      options = ["New visitor", "Returning visitor"];
      break;
    case EventType.Purchase:
      options = [
        "\\PERSON in \\LOCATION subscribed to \\PRODUCT.",
        "\\NUMPURCHASESHOUR customers bought \\PRODUCT in the last hour.",
        "\\PERSON bought \\PRODUCT for \\PRICE.",
        "Hurry, \\NUMPURCHASESTODAY have been made today!",
      ];
      break;
    case EventType.Checkout:
    case EventType.CustomerTrends:
    case EventType.SomeoneViewing:
  }
  return options;
};

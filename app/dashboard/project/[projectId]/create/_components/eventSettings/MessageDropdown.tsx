"use client";

import { replaceVariablesInContentBody } from "@/lib/actions";
import { EventType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import { ChevronDown, CirclePlus } from "lucide-react";
import React, { TransitionStartFunction, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import EditContentModal from "./EditContentModal";

export default function MessageDropdown({
  projectName,
  currentEvent,
  currentProduct,
  startLoadingTransition,
  handleUpdateEvent,
}: {
  projectName: string;
  currentEvent: Tables<"Events">;
  currentProduct: Tables<"Products"> | undefined;
  startLoadingTransition: TransitionStartFunction;
  handleUpdateEvent: (
    event: Tables<"Events">,
    integrationId?: number,
    message?: string
  ) => void;
}) {
  {
    const messageOptions = getDefaultMessageOptions(
      currentEvent.event_type as EventType
    );

    const toggleModalRef = useRef<HTMLDivElement>(null);
    const editContentModalRef = useRef<HTMLDialogElement>(null);

    const setEventMessage = (option: string) => {
      if (option === currentEvent.message) return;

      startLoadingTransition(() => {
        handleUpdateEvent(currentEvent, undefined, option);
      });
    };
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
              className="inline-block items-center gap-[2px]"
              dangerouslySetInnerHTML={{
                __html: replaceVariablesInContentBody(currentEvent.message),
              }}
            />
            <ChevronDown width={16} height={16} />
          </div>
          <div
            tabIndex={0}
            ref={toggleModalRef}
            className="!absolute dropdown-content bg-white border border-gray-200 shadow-md z-30 rounded-lg w-full mt-1 h-fit min-h-16"
          >
            <ul className="h-full w-full overflow-y-scroll">
              {messageOptions.map((option, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 cursor-pointer gap-3 hover:bg-link-hover py-3`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEventMessage(option);
                  }}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary !rounded-lg w-5 h-5"
                    checked={option === currentEvent.message}
                    readOnly
                  ></input>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        replaceVariablesInContentBody(option) +
                        DOMPurify.sanitize(
                          `<br/><div class="text-gray-400 text-xs">"${replaceVariablesInContentBody(
                            option,
                            true,
                            false,
                            false,
                            currentProduct,
                            projectName
                          )}"</div>`
                        ),
                    }}
                  ></div>
                </li>
              ))}
            </ul>
            <hr></hr>
            <div
              className="btn btn-ghost text-sm w-full !rounded-t-none"
              onClick={() => {
                editContentModalRef.current?.classList.remove("hidden");
                editContentModalRef.current?.showModal();
              }}
            >
              Create custom message
              <CirclePlus height={16} width={16} />
            </div>
            <EditContentModal
              modalRef={editContentModalRef}
              currentEvent={currentEvent}
            />
          </div>
        </div>
      </>
    );
  }
}

const getDefaultMessageOptions = (eventType: EventType) => {
  let options: string[] = [];
  switch (eventType) {
    case EventType.ActiveUsers:
      options = [
        "\\NUMUSERS users are online now.",
        "\\NUMUSERS people are currently considering \\PROJECTNAME's products.",
      ];
      break;
    case EventType.Purchase:
      options = [
        "\\PERSON in \\LOCATION purchased \\PRODUCT.",
        "\\PERSON in \\LOCATION subscribed to \\PRODUCT.",
        "\\PERSON in \\LOCATION bought \\PRODUCT for \\PRICE.",
      ];
      break;
    case EventType.Checkout:
    case EventType.CustomerTrends:
    case EventType.SomeoneViewing:
  }
  return options;
};

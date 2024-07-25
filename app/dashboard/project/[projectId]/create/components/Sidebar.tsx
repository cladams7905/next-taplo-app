"use client";

import LoadingDots from "@/components/shared/loadingdots";
import { showToastError } from "@/components/shared/showToast";
import { checkDuplicateTitle, checkStringLength } from "@/lib/actions";
import { Tables, TablesInsert } from "@/supabase/types";
import { Check, CirclePlus, EllipsisIcon } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useTransition,
} from "react";
import TemplateModal from "./TemplateModal";
import { ScreenAlignment, ToastType } from "@/lib/enums";
import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import StripeLogo from "@/public/images/stripe-logo.svg";
import LemonSqueezyLogo from "@/public/images/lemonsqueezy-logo.jpeg";
import { createEvent } from "@/lib/actions/events";

export default function Sidebar({
  activeProject,
  setActiveProject,
  events,
  setEvents,
  integrations,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  setEvents: Dispatch<SetStateAction<Tables<"Events">[]>>;
  integrations: Tables<"Integrations">[];
}) {
  const [isEventPending, startEventTransition] = useTransition();

  const handleCreateEvent = () => {
    startEventTransition(async () => {
      if (activeProject) {
        const event: TablesInsert<"Events"> = {
          user_id: activeProject.user_id,
          project_id: activeProject.id,
        };
        const { data, error } = await createEvent(event);
        if (error) {
          showToastError(error);
        } else {
          setEvents((prevEvents) => [...prevEvents, data]);
        }
      }
    });
  };
  return (
    <div className="flex flex-col rounded-none bg-white dark:bg-base-100 relative h-full border-r border-neutral shadow-lg z-[3]">
      <div className="flex flex-col border-b border-base-300 p-4 pb-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-xs ml-2 font-semibold text-gray-400">
              Events
            </div>
            {isEventPending && (
              <span className="loading loading-spinner loading-xs bg-base-content"></span>
            )}
          </div>
          <div
            className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-primary text-white text-xs"
            onClick={() => {
              handleCreateEvent();
            }}
          >
            <CirclePlus height={18} width={18} /> New Event
          </div>
        </div>
        {events.map((event, i) => (
          <div key={i} className="collapse collapse-arrow rounded-lg text-sm">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <div className="font-bold">On purchase</div>
                <div className="text-xs font-bold text-gray-400">
                  Listens to:
                </div>
              </div>
              <EllipsisIcon />
            </div>
            <div className="collapse-content flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">Integration</div>
                </div>
                <div className="flex flex-row gap-2">
                  <select className="select select-bordered select-sm w-full text-xs">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                  <div className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-primary text-white text-xs">
                    <CirclePlus height={18} width={18} /> New Integration
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">Content body</div>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-b border-base-300 p-4 pb-10">
        <div className="text-xs ml-2 font-semibold text-gray-400">Style</div>
      </div>
      <div className="flex flex-col gap-3 border-b border-base-300 p-4 pb-10">
        <div className="text-xs ml-2 font-semibold text-gray-400">Settings</div>
      </div>
    </div>
  );
}

{
  /* <div className="drawer-side">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col bg-white dark:bg-base-100 lg:p-0 md:px-8 p-4 pt-0 h-full lg:w-full md:w-1/2 sm:w-1/2 w-2/3">
          <div className="flex w-full overflow-x-scroll lg:hidden">
            <NavbarTablist />
          </div>
          <hr className="border-t border-neutral mb-6 lg:hidden" />
          <div
            className="btn btn-primary w-full text-white"
            onClick={() => handleCreateToast()}
          >
            {isPending ? (
              <LoadingDots color="#FFFFFF" size="sm" />
            ) : (
              <>
                <CirclePlus height={18} width={18} />
                New Toast
              </>
            )}
          </div>
          <TemplateModal
            templateModalRef={templateModalRef}
            toastType={toastType}
            setToastType={setToastType}
            activeToast={activeToast}
            setActiveToast={setActiveToast}
          />
          <div className="mt-4">
            <div className="text-sm ml-2 font-semibold">
              My Toasts ({userToasts.length})
            </div>
            <ul className="menu px-0 py-2 mt-2 overflow-y-scroll flex-nowrap max-h-[75vh] flex flex-col gap-3">
              {sortedToasts.map((toast, i) => (
                <li
                  key={i}
                  className={`flex gap-2 rounded-lg border border-neutral shadow-sm ${
                    activeToast?.id === toast.id && `bg-link-hover`
                  }`}
                >
                  <a
                    className="flex w-full items-center cursor-pointer justify-between"
                    onClick={() => {
                      setActiveToast(toast);
                    }}
                  >
                    <div className="flex flex-col gap-[2px]">
                      <p>{checkStringLength(toast.title)}</p>
                      {!toast.event_type ? (
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-error">
                            No Event Selected
                          </p>
                          <ExclamationTriangleIcon color="oklch(var(--er))" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {integrations.filter(
                            (x) => x.id === toast.integration_id
                          )[0]?.provider === "Stripe" ? (
                            <Image
                              width={16}
                              height={16}
                              alt={"Stripe logo"}
                              src={StripeLogo}
                              className="aspect-square rounded-md"
                            />
                          ) : integrations.filter(
                              (x) => x.id === toast.integration_id
                            )[0]?.provider === "LemonSqueezy" ? (
                            <Image
                              width={16}
                              height={16}
                              alt={"LemonSqueezy logo"}
                              src={LemonSqueezyLogo}
                              className="aspect-square rounded-md"
                            />
                          ) : (
                            ""
                          )}
                          <p className="text-sm text-gray-500">
                            {toast.event_type}
                          </p>
                        </div>
                      )}
                    </div>
                    {activeToast?.id === toast.id && (
                      <Check color="oklch(var(--bc))" height={22} width={22} />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */
}

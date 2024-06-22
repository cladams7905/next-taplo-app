"use client";

import { Tables } from "@/lib/supabase/types";
import { ToastType } from "@/lib/types";
import { Dispatch, RefObject, SetStateAction } from "react";

export default function TemplateModal({
  templateModalRef,
  toastType,
  setToastType,
  activeToast,
  setActiveToast,
}: {
  templateModalRef: RefObject<HTMLDialogElement>;
  toastType: ToastType;
  setToastType: Dispatch<SetStateAction<ToastType>>;
  activeToast: Tables<"UserToasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"UserToasts"> | undefined>>;
}) {
  return (
    <dialog className="modal" ref={templateModalRef}>
      <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-6 justify-center !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none absolute right-2 top-2 text-base-content"
            onClick={() => templateModalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold">Select toast template</div>
        <div className="flex w-full items-center gap-4 overflow-x-scroll pb-4 pt-2 px-1">
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform
            ${
              toastType === "Payment Complete" &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType("Payment Complete")}
          >
            <div className="flex items-center w-full h-2/3 bg-primary/35 rounded-t-lg"></div>
            <div className="flex flex-col justify-center items-center gap-1 p-4">
              <p className="font-bold">On payment complete</p>
              <p className="text-gray-500 text-sm text-center">
                Displays whenever a purchase is made.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform
            ${
              toastType === "Email Subscribe" &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType("Email Subscribe")}
          >
            <div className="flex items-center w-full h-2/3 bg-primary/35 rounded-t-lg"></div>
            <div className="flex flex-col justify-center items-center gap-1 p-4">
              <p className="font-bold">On email subscribe</p>
              <p className="text-gray-500 text-sm text-center">
                Displays whenever a user subscribes to an email list.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform 
            ${
              toastType === "User Register" &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType("User Register")}
          >
            <div className="flex items-center w-full h-2/3 bg-primary/35 rounded-t-lg"></div>
            <div className="flex flex-col justify-center items-center gap-1 p-4">
              <p className="font-bold">On new register</p>
              <p className="text-gray-500 text-sm text-center">
                Displays whenever a new user registers.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform 
            ${
              toastType === "Webpage Open" &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType("Webpage Open")}
          >
            <div className="flex items-center w-full h-2/3 bg-primary/35 rounded-t-lg"></div>
            <div className="flex flex-col justify-center items-center gap-1 p-4">
              <p className="font-bold">On webpage open</p>
              <p className="text-gray-500 text-sm text-center">
                Displays whenever a webpage is first opened.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform 
            ${
              toastType === "Custom" &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType("Custom")}
          >
            <div className="flex items-center w-full h-2/3 bg-primary/35 rounded-t-lg"></div>
            <div className="flex flex-col items-center !h-[100px] gap-1 p-4">
              <p className="font-bold">Custom</p>
              <p className="text-gray-500 text-sm text-center">
                Make your own!
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div
            className={`btn btn-primary w-full max-w-72 ${
              !toastType && "btn-disabled"
            }`}
            onClick={() => {
              if (activeToast && toastType) {
                setActiveToast({
                  ...activeToast,
                  event_type: toastType?.toString(),
                });
              }
              templateModalRef.current?.close();
            }}
          >
            Use this template
          </div>
        </div>
      </div>
    </dialog>
  );
}

"use client";

import LoadingDots from "@/components/shared/loadingdots";
import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/userToasts";
import { Tables } from "@/supabase/types";
import { ToastType } from "@/lib/enums";
import { Dispatch, RefObject, SetStateAction, useTransition } from "react";
import { createProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

export default function TemplateModal({
  templateModalRef,
  toastType,
  setToastType,
  activeToast,
  setActiveToast,
}: {
  templateModalRef: RefObject<HTMLDialogElement>;
  toastType: ToastType | undefined;
  setToastType: Dispatch<SetStateAction<ToastType | undefined>>;
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleTemplateSubmit = () => {
    startTransition(async () => {
      if (activeToast && toastType) {
        setActiveToast({
          ...activeToast,
          event_type: toastType,
          content: setToastContent(toastType),
        });
        const { error } = await updateUserToast(activeToast.id, {
          ...activeToast,
          event_type: toastType,
          content: setToastContent(toastType),
        });
        if (error) {
          showToastError(error);
        }

        //If "On Purchase" type, create example product
        if (toastType === ToastType.PaymentComplete) {
          const { error } = await createProduct({
            toast_id: activeToast.id,
            name: "My Product",
            price: 20,
          });
          if (error) {
            showToastError(error);
          } else {
            router.refresh();
          }
        }
      }
      templateModalRef.current?.close();
    });
  };
  return (
    <dialog className="modal" ref={templateModalRef}>
      <div className="modal-box w-fit lg:max-w-5xl flex flex-col gap-6 justify-center !border !border-neutral text-base-content relative">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => templateModalRef.current?.close()}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold text-left">Select a template</div>
        <div className="flex w-full items-center lg:justify-center overflow-x-scroll gap-4 pb-4 pt-2 px-1">
          <div
            className={`flex flex-col w-64 h-64 min-w-64 rounded-lg border border-neutral cursor-pointer hover:shadow-lg hover:outline hover:outline-2 hover:outline-primary hover:-translate-y-1 transition-transform
            ${
              toastType === ToastType.PaymentComplete &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType(ToastType.PaymentComplete)}
          >
            <div className="flex items-center w-full h-2/3 bg-gradient-to-tr from-primary/50 to-violet-100 rounded-t-lg"></div>
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
              toastType === ToastType.EmailSubscribe &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType(ToastType.EmailSubscribe)}
          >
            <div className="flex items-center w-full h-2/3 bg-gradient-to-tr from-primary/50 to-violet-100 rounded-t-lg"></div>
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
              toastType === ToastType.Custom &&
              "shadow-lg outline outline-2 outline-primary"
            }`}
            onClick={() => setToastType(ToastType.Custom)}
          >
            <div className="flex items-center w-full h-2/3 bg-gradient-to-tr from-primary/50 to-violet-100 rounded-t-lg"></div>
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
            className={`btn btn-primary text-white w-full max-w-72 ${
              !toastType && "btn-disabled text-base-content"
            }`}
            onClick={() => handleTemplateSubmit()}
          >
            {isPending ? <LoadingDots color="#FFFFFF" /> : "Use this template"}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export const setToastContent = (toastType: ToastType | undefined) => {
  let toastContent;
  switch (toastType) {
    case ToastType.PaymentComplete:
      toastContent = "Someone in USA made a purchase.";
      break;
    case ToastType.EmailSubscribe:
      toastContent = "Someone in USA subscribed via email.";
      break;
    default:
      toastContent = "";
  }
  return toastContent;
};

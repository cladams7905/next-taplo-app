"use client";

import LoadingDots from "@/components/shared/loadingdots";
import { showToastError } from "@/components/shared/showToast";
import { checkDuplicateTitle, checkStringLength } from "@/lib/actions";
import { createUserToast } from "@/lib/actions/userToasts";
import { Tables } from "@/supabase/types";
import { Check, CirclePlus } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useTransition,
} from "react";
import TemplateModal from "./TemplateModal";
import { ToastType } from "@/lib/enums";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import NavbarTablist from "../../components/NavbarTablist";
import Image from "next/image";
import StripeLogo from "@/public/images/stripe-logo.svg";
import LemonSqueezyLogo from "@/public/images/lemonsqueezy-logo.jpeg";

export default function Sidebar({
  userToasts,
  activeToast,
  setActiveToast,
  setCurrentToasts,
  toastType,
  setToastType,
  integrations,
}: {
  userToasts: Tables<"Toasts">[];
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"Toasts">[]>>;
  toastType: ToastType | undefined;
  setToastType: Dispatch<SetStateAction<ToastType | undefined>>;
  integrations: Tables<"Integrations">[];
}) {
  const [isPending, startTransition] = useTransition();
  const templateModalRef = useRef<HTMLDialogElement>(null);

  const handleCreateToast = () => {
    startTransition(async () => {
      const { data, error } = await createUserToast({
        title: checkDuplicateTitle(
          userToasts.map((toast) => toast.title),
          "New Toast"
        ),
        event_type: "",
      });
      if (error) {
        showToastError(error);
      } else {
        setCurrentToasts((prevToasts) => [...prevToasts, data]);
        setActiveToast(data);
        templateModalRef.current?.showModal();
      }
    });
  };

  useEffect(() => {
    if (activeToast) {
      setCurrentToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === activeToast.id ? { ...toast, ...activeToast } : toast
        )
      );
    }
  }, [activeToast]);

  const sortedToasts = userToasts.sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";
    return titleA.localeCompare(titleB);
  });

  return (
    <div className="drawer lg:drawer-open flex flex-col lg:join-item rounded-none bg-white dark:bg-base-100 relative h-full lg:p-4 border-r border-neutral shadow-lg z-[3]">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
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
                  className={`flex gap-2 rounded-lg border border-neutral ${
                    activeToast?.id === toast.id && `bg-link-hover`
                  }`}
                >
                  <a
                    className="flex w-full items-center cursor-pointer justify-between"
                    onClick={() => {
                      setActiveToast(toast);
                    }}
                  >
                    <div>
                      <p>{checkStringLength(toast.title)}</p>
                      {toast.event_type === "" ? (
                        <div className="flex items-center gap-1">
                          <p className="text-sm text-error">
                            No Event Selected
                          </p>
                          <ExclamationTriangleIcon color="oklch(var(--er))" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">
                            {toast.event_type}
                          </p>
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
      </div>
    </div>
  );
}

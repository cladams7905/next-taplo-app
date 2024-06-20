"use client";

import LoadingDots from "@/components/shared/loadingdots";
import { showToastError } from "@/components/shared/showToast";
import { checkStringLength } from "@/lib/actions";
import { createUserToast } from "@/lib/actions/userToasts";
import { Tables } from "@/lib/supabase/types";
import { Check, CirclePlus } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";

export default function Sidebar({
  userToasts,
  project,
  activeToast,
  setActiveToast,
}: {
  userToasts: Tables<"UserToasts">[];
  project: Tables<"Projects">;
  activeToast: Tables<"UserToasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"UserToasts"> | undefined>>;
}) {
  const [currentToasts, setCurrentToasts] =
    useState<Tables<"UserToasts">[]>(userToasts);
  const [isPending, startTransition] = useTransition();

  const handleCreateToast = () => {
    startTransition(async () => {
      const { data, error } = await createUserToast({
        title: "New Toast",
        event_type: "On user register",
        project_id: project.id,
      });
      if (error) {
        showToastError(error);
      } else {
        setCurrentToasts((prevToasts) => [...prevToasts, data]);
        setActiveToast(data);
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

  const sortedToasts = currentToasts.sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";
    return titleA.localeCompare(titleB);
  });

  return (
    <div className="flex flex-col join-item bg-white rounded-r-none relative rounded-lg h-full p-4 border border-neutral shadow-lg z-[3]">
      <div
        className="btn btn-primary border border-neutral hover:border-neutral w-full"
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
      <div className="mt-4">
        <div className="text-sm ml-2 font-semibold">
          My Toasts ({currentToasts.length})
        </div>
        <ul className="menu px-0 py-2 mt-2 overflow-y-auto max-h-[65vh] flex flex-col gap-3">
          {sortedToasts.map((toast, i) => (
            <li
              key={i}
              className={`flex gap-2 rounded-lg border border-neutral ${
                activeToast?.id === toast.id && `bg-primary/35`
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
                  <p className="text-sm text-gray-500">{toast.event_type}</p>
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
  );
}

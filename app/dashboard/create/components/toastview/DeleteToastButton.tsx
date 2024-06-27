"use client";

import { showToast, showToastError } from "@/components/shared/showToast";
import { deleteUserToast } from "@/lib/actions/userToasts";
import { Tables } from "@/supabase/types";
import { Ellipsis, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useTransition } from "react";

export const DeleteToastButton = ({
  activeToast,
  setActiveToast,
  setCurrentToasts,
}: {
  activeToast: Tables<"Toasts">;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"Toasts">[]>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const toggleElement = useRef<HTMLUListElement>(null);

  /* Toast delete */
  const handleDelete = () => {
    startTransition(async () => {
      if (activeToast) {
        const { data, error } = await deleteUserToast(activeToast.id);
        if (error) {
          showToastError(error);
        } else {
          setCurrentToasts((prevToasts) => {
            const updatedToasts = prevToasts.filter(
              (toast) => toast.id !== data.id
            );
            setActiveToast(
              updatedToasts.length > 0 ? updatedToasts[0] : undefined
            );
            return updatedToasts;
          });
          toggleElement?.current?.classList.add("hidden");
          showToast(`Successfully deleted \"${data.title}\"`);
        }
      }
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        className="p-2 -mt-2 rounded-lg cursor-pointer hover:bg-primary/35"
        onClick={() => {
          toggleElement?.current?.classList.remove("hidden");
        }}
      >
        <Ellipsis
          width={22}
          height={22}
          tabIndex={0}
          className="!outline-none"
        />
      </div>
      <ul
        tabIndex={0}
        ref={toggleElement}
        className="menu menu-sm dropdown-content border border-neutral z-[1] p-2 shadow bg-base-100 rounded-md w-52"
      >
        <li>
          <a
            className="flex items-center justify-between py-2 rounded-md"
            onClick={() => handleDelete()}
          >
            <div className="flex items-center gap-2">
              {" "}
              <Trash width={18} height={18} />
              Delete
            </div>
            {isPending && (
              <span className="loading loading-spinner loading-sm bg-base-content" />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};

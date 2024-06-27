"use client";

import { showToast, showToastError } from "@/components/shared/showToast";
import { checkStringLength } from "@/lib/actions";
import { updateUserToast } from "@/lib/actions/userToasts";
import { Tables, TablesUpdate } from "@/supabase/types";
import { PencilLine } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
  useEffect,
} from "react";

export const RenameToastButton = ({
  activeToast,
  setActiveToast,
  setCurrentToasts,
}: {
  activeToast: Tables<"Toasts">;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"Toasts">[]>>;
}) => {
  const [isRenameClicked, setIsRenameClicked] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  /* This useEffect handles renaming of the toast */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      startTransition(() => {
        if (
          renameInputRef.current &&
          ((event instanceof MouseEvent &&
            !renameInputRef.current.contains(event.target as Node)) ||
            (event instanceof KeyboardEvent && event.key === "Enter"))
        ) {
          setIsRenameClicked(false);

          if (
            activeToast &&
            renameInputRef.current.value &&
            renameInputRef.current.value !== activeToast?.title
          ) {
            const newTitle = renameInputRef.current.value;
            setActiveToast({
              ...activeToast,
              title: newTitle,
            });
            updateToast({
              ...activeToast,
              title: newTitle,
            });
          }
        }
      });
    }

    async function updateToast(toast: TablesUpdate<"Toasts">) {
      if (toast?.id) {
        const { data, error } = await updateUserToast(toast.id, toast);
        if (error) {
          showToastError(error);
        } else {
          showToast(`Successfully renamed toast to \"${data.title}\"`);
        }
      }
    }

    function handleKeyPress(event: KeyboardEvent) {
      if (event.code === "Enter") {
        event.preventDefault();
        handleClickOutside(event);
      }
    }

    if (isRenameClicked) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isRenameClicked, activeToast, setActiveToast]);

  return (
    <div className="flex items-center gap-1 -mt-2">
      {!isRenameClicked ? (
        <p>{checkStringLength(activeToast.title)}</p>
      ) : (
        <input
          type="text"
          ref={renameInputRef}
          placeholder={activeToast.title ? activeToast.title : "New Toast"}
          defaultValue={activeToast.title ? activeToast.title : "New Toast"}
          autoFocus={true}
          className={`input input-ghost input-sm w-full max-w-xs`}
        />
      )}
      <div
        className="hover:bg-primary/35 p-2 rounded-lg cursor-pointer"
        onClick={() => setIsRenameClicked(!isRenameClicked)}
      >
        <PencilLine width={18} height={18} />
      </div>
      {isPending && (
        <span className="loading loading-spinner loading-sm bg-base-content" />
      )}
    </div>
  );
};

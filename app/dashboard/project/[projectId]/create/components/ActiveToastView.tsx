"use client";

import Image from "next/image";
import ToastImg from "@/public/images/toaster2.jpeg";
import { CirclePlus, Ellipsis, PencilLine, Trash } from "lucide-react";
import { Tables, TablesUpdate } from "@/lib/supabase/types";
import ToastTabList from "./ToastTabList";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { checkStringLength } from "@/lib/actions";
import { deleteUserToast, updateUserToast } from "@/lib/actions/userToasts";
import { showToast, showToastError } from "@/components/shared/showToast";

export default function ActiveToastView({
  project,
  activeToast,
  setActiveToast,
  setCurrentToasts,
}: {
  project: Tables<"Projects">;
  activeToast: Tables<"UserToasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"UserToasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"UserToasts">[]>>;
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isRenameClicked, setIsRenameClicked] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

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

    async function updateToast(toast: TablesUpdate<"UserToasts">) {
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
  }, [project.id, isRenameClicked, activeToast, setActiveToast]);

  /* Toast delete */
  const handleDelete = () => {
    startDeleteTransition(async () => {
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
          showToast(`Successfully deleted \"${data.title}\"`);
        }
      }
    });
  };

  return activeToast !== undefined ? (
    <div className="flex flex-col join-item bg-accent-light rounded-lg h-full border border-neutral shadow-lg z-[1]">
      <div className="w-full h-1/3 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 -mt-2">
            {!isRenameClicked ? (
              <p>{checkStringLength(activeToast.title)}</p>
            ) : (
              <input
                type="text"
                ref={renameInputRef}
                placeholder={
                  activeToast.title ? activeToast.title : "New Toast"
                }
                defaultValue={
                  activeToast.title ? activeToast.title : "New Toast"
                }
                autoFocus={true}
                className={`input input-ghost input-sm w-full max-w-xs`}
              />
            )}
            <div
              className="hover:bg-primary/50 p-2 rounded-lg cursor-pointer"
              onClick={() => setIsRenameClicked(!isRenameClicked)}
            >
              <PencilLine width={18} height={18} />
            </div>
            {isPending && (
              <span className="loading loading-spinner loading-sm bg-base-content" />
            )}
          </div>
          <div className="dropdown dropdown-end">
            <div className="p-2 -mt-2 rounded-lg cursor-pointer hover:bg-primary/50">
              <Ellipsis
                width={22}
                height={22}
                tabIndex={0}
                className="!outline-none"
              />
            </div>
            <ul
              tabIndex={0}
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
                  {isDeletePending && (
                    <span className="loading loading-spinner loading-sm bg-base-content" />
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastTabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col w-full items-center h-2/3 overflow-y-auto bg-white rounded-br-lg p-6 gap-6">
        {currentTab === 0 && <ToastEvent activeToast={activeToast} />}
        {currentTab === 1 && <ToastContent activeToast={activeToast} />}
        {/* {currentTab === 2 && <ToastStyle activeToast={activeToast} />} */}
      </div>
    </div>
  ) : (
    <NoToastView />
  );
}

function ToastEvent({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Event</p>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p>Event Type</p>
          <select
            className="select select-bordered border-neutral w-full"
            defaultValue={"default"}
          >
            <option value={"default"}>Select</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="w-full">
          <p>Integration</p>
          <select
            className="select select-bordered border-neutral w-full"
            defaultValue={"default"}
          >
            <option value={"default"}>Select</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ToastContent({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Content</p>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p>Toast Heading</p>
          <input
            type="text"
            placeholder={activeToast?.title ? activeToast.title : "New Toast"}
            className="input input-bordered border border-neutral w-full"
          />
        </div>
        <div className="w-full">
          <p>Toast Body</p>
          <textarea
            placeholder={activeToast?.title ? activeToast.title : "New Toast"}
            className="textarea textarea-bordered border border-neutral w-full"
          />
        </div>
      </div>
    </div>
  );
}

function ToastStyle({
  activeToast,
}: {
  activeToast: Tables<"UserToasts"> | undefined;
}) {
  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold">Toast Style</p>
      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p>Background type</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Background color</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Text color</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="w-full">
            {" "}
            <p>Font</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
          <div className="w-full">
            {" "}
            <p>Screen alignment</p>
            <input
              type="text"
              placeholder={activeToast?.title ? activeToast.title : "New Toast"}
              className="input input-bordered border border-neutral w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoToastView() {
  return (
    <div className="flex flex-col items-center gap-3 join-item bg-accent-light rounded-lg h-full p-4 border border-neutral">
      <Image
        className="rounded-3xl max-h-[300px] mt-12"
        width={300}
        alt="toast"
        src={ToastImg}
      />
      <div className="flex flex-col gap-2 items-center justify-center">
        {" "}
        <div className="font-bold text-2xl">
          You haven&apos;t made any toasts yet.
        </div>
        <div className="flex flex-row items-center gap-2">
          Click{" "}
          <span>
            <CirclePlus height={20} width={20} />
          </span>{" "}
          to create a new one!
        </div>
      </div>
    </div>
  );
}

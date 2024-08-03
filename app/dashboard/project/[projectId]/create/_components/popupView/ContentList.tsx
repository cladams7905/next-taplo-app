"use client";

import { Tables } from "@/supabase/types";
import { CirclePlus, Pencil, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import { IColor } from "react-color-palette";
import AddEditContentModal from "./AddEditContentModal";

export default function ContentList({
  activeProject,
  setActiveProject,
  events,
  activeEvent,
  backgroundColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  contentBody,
  setContentBody,
  activeContent,
  setActiveContent,
  variableList,
  replaceVariablesInContentBody,
}: {
  activeProject: Tables<"Projects">;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  events: Tables<"Events">[];
  activeEvent: Tables<"Events"> | undefined;
  backgroundColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  contentBody: string[];
  setContentBody: Dispatch<SetStateAction<string[]>>;
  activeContent: string;
  setActiveContent: Dispatch<SetStateAction<string>>;
  variableList: string[];
  replaceVariablesInContentBody: (
    contentStr?: string | null,
    shouldReturnHTML?: boolean
  ) => string;
}) {
  const addEditContentModalRef = useRef<HTMLDialogElement>(null);

  const handleToggleActiveContent = (content: string) => {
    if (content !== activeContent) {
      setActiveContent(content);
    }
  };

  return (
    <div className="flex flex-col w-full mt-4 ml-20 h-fit lg:max-h-64 gap-3 overflow-y-scroll overflow-x-visible py-2 cursor-pointer">
      {contentBody.map((entry, i) => (
        <div
          key={i}
          className="flex flex-row items-center justify-center gap-4"
        >
          <div
            onClick={() => handleToggleActiveContent(entry)}
            className={`inline-block w-full max-w-[35vw] h-fit bg-white/50 border border-gray-300 rounded-lg py-2 px-5 text-sm ${
              activeContent === entry
                ? "ring-2 ring-primary"
                : "hover:ring-2 ring-primary/35"
            }`}
            dangerouslySetInnerHTML={{
              __html: replaceVariablesInContentBody(entry, true),
            }}
          />
          <div className="flex flex-row items-center justify-center gap-2 right-[-2rem] top-1/2">
            {activeContent === entry ? (
              <>
                {" "}
                <div
                  className="rounded-lg p-1 cursor-pointer hover:bg-primary/20"
                  onClick={() => addEditContentModalRef.current?.showModal()}
                >
                  <Pencil width={18} height={18} />
                </div>
                <div className="rounded-lg p-1 cursor-pointer hover:bg-primary/20">
                  <TrashIcon width={18} height={18} />
                </div>
              </>
            ) : (
              <div className="w-[60px]" />
            )}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center mt-1 mr-[70px]">
        <div
          className="btn btn-sm lg:mt-0 mt-8 lg:w-auto w-full btn-ghost text-xs"
          onClick={() => addEditContentModalRef.current?.showModal()}
        >
          <CirclePlus height={16} width={16} />
          Add Content
        </div>
      </div>
      <AddEditContentModal modalRef={addEditContentModalRef} />
    </div>
  );
}

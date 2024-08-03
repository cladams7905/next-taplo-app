"use client";

import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import ContentBodyEditor from "./ContentBodyEditor";
import { Tables } from "@/supabase/types";

export default function AddEditContentModal({
  activeEvent,
  setActiveEvent,
  modalRef,
  activeContent,
  setActiveContent,
  variableList,
}: {
  activeEvent: Tables<"Events"> | undefined;
  setActiveEvent: Dispatch<SetStateAction<Tables<"Events"> | undefined>>;
  modalRef: RefObject<HTMLDialogElement>;
  activeContent: string;
  setActiveContent: Dispatch<SetStateAction<string>>;
  variableList: string[];
}) {
  const editContentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box flex flex-col p-6 pb-2 justify-center !border !border-neutral text-base-content relative cursor-auto">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-2 top-2 text-base-content"
            onClick={() => {
              modalRef.current?.close();
              if (editContentTextAreaRef?.current)
                editContentTextAreaRef.current.value = activeContent;
            }}
          >
            ✕
          </button>
        </form>
        <div className="text-xl font-bold mb-6">Add/Edit Content</div>
        <ContentBodyEditor
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
          variableList={variableList}
          activeContent={activeContent}
          setActiveContent={setActiveContent}
          editContentTextAreaRef={editContentTextAreaRef}
        />
      </div>
    </dialog>
  );
}

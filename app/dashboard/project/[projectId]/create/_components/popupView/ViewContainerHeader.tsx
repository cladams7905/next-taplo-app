"use client";

import "react-color-palette/css";
import { Code2Icon, Fullscreen, Settings } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PreviewContainer from "./PreviewContainer";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import EmbedModal from "./EmbedModal";
import Link from "next/link";

export default function ViewContainerHeader({
  isPreviewMode,
  setPreviewMode,
}: {
  isPreviewMode: boolean;
  setPreviewMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { events } = useProjectContext();
  const previewRef = useRef<HTMLDivElement>(null);
  const embedModalRef = useRef<HTMLDialogElement>(null);
  const settingsDropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        previewRef.current &&
        previewRef.current.contains(event.target as Node)
      ) {
        previewRef.current.classList.add("hidden");
        previewRef.current.classList.remove("flex");
        setPreviewMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPreviewMode]);

  return (
    <div
      className={`flex justify-between items-center bg-white border-b border-gray-300 z-10 px-5 py-2`}
    >
      <div className="flex items-center justify-center w-full gap-2">
        <div className="tooltip tooltip-bottom tooltip-info" data-tip="Preview">
          <div
            className={`${
              events.length > 0
                ? "hover:bg-primary/20 cursor-pointer"
                : "text-gray-300"
            } flex items-center text-xs rounded-lg p-2`}
            onClick={() => {
              if (events.length > 0) {
                previewRef.current?.classList.remove("hidden");
                previewRef.current?.classList.add("flex");
                setPreviewMode(true);
              }
            }}
          >
            <Fullscreen width={20} height={20} strokeWidth={1.75} />
          </div>
        </div>
        <PreviewContainer
          previewRef={previewRef}
          isPreviewMode={isPreviewMode}
        />
        <div className="tooltip tooltip-bottom tooltip-info" data-tip="Embed">
          <div
            className={`${
              events.length > 0
                ? "hover:bg-primary/20 cursor-pointer"
                : "text-gray-300"
            } flex items-center text-xs rounded-lg p-2`}
            onClick={() => {
              if (events.length > 0) embedModalRef.current?.showModal();
            }}
          >
            <Code2Icon width={20} height={20} strokeWidth={1.75} />
          </div>
        </div>
        <EmbedModal modalRef={embedModalRef} />
        <div
          className="tooltip tooltip-bottom tooltip-info p-2 rounded-lg cursor-pointer hover:bg-primary/20"
          data-tip="Project settings"
          onClick={() =>
            settingsDropdownRef.current?.classList.remove("hidden")
          }
        >
          <Link href={"./settings"}>
            <Settings width={20} height={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

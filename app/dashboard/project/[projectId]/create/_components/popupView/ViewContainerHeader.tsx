"use client";

import "react-color-palette/css";
import { Code2Icon, Fullscreen } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import PreviewContainer from "./PreviewContainer";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import EmbedModal from "./EmbedModal";

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
    <div className={`flex justify-between items-center mt-1`}>
      <div className="flex items-center gap-2">
        {events.length > 0 && (
          <>
            <div
              className="tooltip tooltip-bottom tooltip-info"
              data-tip="Embed"
            >
              <div
                className="btn btn-primary flex items-center text-white text-xs btn-sm"
                onClick={() => {
                  embedModalRef.current?.showModal();
                }}
              >
                <Code2Icon width={18} height={18} />
              </div>
            </div>
            <EmbedModal modalRef={embedModalRef} />
            <div
              className="tooltip tooltip-bottom tooltip-info"
              data-tip="Preview"
            >
              <div
                className="btn btn-accent flex items-center text-white text-xs btn-sm"
                onClick={() => {
                  previewRef.current?.classList.remove("hidden");
                  previewRef.current?.classList.add("flex");
                  setPreviewMode(true);
                }}
              >
                <Fullscreen width={18} height={18} />
              </div>
            </div>
            <PreviewContainer
              previewRef={previewRef}
              isPreviewMode={isPreviewMode}
            />
          </>
        )}
      </div>
    </div>
  );
}

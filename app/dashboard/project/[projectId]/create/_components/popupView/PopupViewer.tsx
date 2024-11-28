"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCheck, Pencil } from "lucide-react";
import { TemplateTypes } from "@/lib/enums";
import TemplateModal from "./TemplateModal";
import PopupTemplate from "./PopupTemplate";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { DashboardIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function PopupViewer() {
  const { activeProject, activeEvent, activeProduct } = useProjectContext();
  const templateModalRef = useRef<HTMLDialogElement>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateTypes>(
    activeProject.template as TemplateTypes
  );
  const [isAnimatePulse, setAnimatePulse] = useState<boolean>(false);

  useEffect(() => {
    setAnimatePulse(true);
    setTimeout(() => {
      setAnimatePulse(false);
    }, 1000);
  }, [activeEvent, activeProduct]);

  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <div
        className="flex gap-3 left-0 h-fit px-4 outline-1 outline-primary bottom-0 rounded-b-lg text-xs cursor-pointer z-10 absolute top-16"
        onClick={() => templateModalRef.current?.showModal()}
      >
        <div className="flex text-xs items-center gap-2">
          <DashboardIcon strokeWidth={1.5} />
          {activeTemplate}
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-info"
          data-tip="Change template"
        >
          <div className="btn btn-xs btn-primary">
            <Pencil height={14} width={14} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-3 py-4 rounded-lg">
        <div className="flex flex-col relative items-center justify-center rounded-lg lg:min-w-[35vw] lg:w-fit w-full min-h-[350px] px-4">
          <PopupTemplate
            isAnimatePulse={isAnimatePulse}
            isPreviewMode={false}
          />
        </div>
        <TemplateModal
          templateModalRef={templateModalRef}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
      </div>
    </div>
  );
}

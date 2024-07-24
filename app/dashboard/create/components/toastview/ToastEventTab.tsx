"use client";

import NewIntegrationModal from "@/app/dashboard/connect/components/NewIntegrationModal";
import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/projects";
import { ToastType } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { setToastContent } from "../TemplateModal";

export const ToastEventTab = ({
  activeToast,
  setActiveToast,
  integrations,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  integrations: Tables<"Integrations">[];
}) => {
  const toastTypes = Object.values(ToastType);
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [currentIntegrations, setCurrentIntegrations] =
    useState<Tables<"Integrations">[]>(integrations);

  const handleTypeSelect = async (toastType: ToastType) => {
    if (activeToast && toastType) {
      const updatedToast = {
        ...activeToast,
        event_type: toastType.toString() !== "default" ? toastType : "",
        content: setToastContent(toastType),
      };
      setActiveToast(updatedToast);
      const { error } = await updateUserToast(activeToast.id, updatedToast);
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleIntegrationSelect = async (integration: string) => {
    const integrationId = integrations.find((x) => x.name === integration)?.id;
    if (activeToast && integrationId) {
      const updatedToast = { ...activeToast, integration_id: integrationId };
      setActiveToast(updatedToast);
      const { error } = await updateUserToast(activeToast.id, updatedToast);
      if (error) {
        showToastError(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-2/3 gap-6">
      <div className="flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p>Event</p>
            {!activeToast?.event_type && (
              <div className="flex items-center gap-1">
                <p className="text-sm text-error">Required</p>
                <ExclamationTriangleIcon color="oklch(var(--er))" />
              </div>
            )}
          </div>
          <select
            className="select select-bordered border-neutral w-full"
            value={activeToast?.event_type || "default"}
            onChange={(e) => handleTypeSelect(e.target.value as ToastType)}
          >
            <option value={"default"}>Select</option>
            {toastTypes.map((toastType, i) => (
              <option key={i} value={toastType}>
                {toastType}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              Listens to{" "}
              <div
                className="tooltip tooltip-info"
                data-tip="Integrations enable your toast to listen to notifications from a
              3rd party service."
              >
                <QuestionMarkCircledIcon />
              </div>
            </div>
            {!activeToast?.integration_id && (
              <div className="flex items-center gap-1">
                <p className="text-sm text-error">Required</p>
                <ExclamationTriangleIcon color="oklch(var(--er))" />
              </div>
            )}
          </div>
          <div className="lg:flex gap-2">
            <select
              className="select select-bordered border-neutral w-full"
              value={
                integrations.find((x) => x.id === activeToast?.integration_id)
                  ?.name || "default"
              }
              onChange={(e) => handleIntegrationSelect(e.target.value)}
            >
              <option value={"default"}>Select</option>
              {integrations.map((integration, i) => (
                <option key={i} value={integration.name || ""}>
                  {`(${integration.provider}) - ${integration.name}`}
                </option>
              ))}
            </select>
            <div
              className="btn lg:mt-0 mt-8 lg:w-auto w-full btn-primary text-white"
              onClick={() => newIntegrationModalRef.current?.showModal()}
            >
              <CirclePlus height={18} width={18} /> New Integration
            </div>
            <NewIntegrationModal
              newIntegrationModalRef={newIntegrationModalRef}
              integrations={currentIntegrations}
              setIntegrations={setCurrentIntegrations}
              activeToast={activeToast}
              setActiveToast={setActiveToast}
            />
          </div>
          <p>TODO: Only displays toasts from the past ____ days</p>
        </div>
      </div>
    </div>
  );
};

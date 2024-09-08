"use client";

import { Tables } from "@/supabase/types";
import { CirclePlus, EllipsisVertical, Trash } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import { convertDateTime } from "@/lib/actions";
import { Dispatch, SetStateAction, useRef, useTransition } from "react";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { deleteIntegration } from "@/lib/actions/integrations";

export default function IntegrationsList({
  events,
  integrations,
  setIntegrations,
  searchQuery,
}: {
  events: Tables<"Events">[];
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  searchQuery: string;
}) {
  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration?.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIntegrationEventTypes = (integration: Tables<"Integrations">) => {
    let eventTypes: string[] = [];
    events.forEach((event) => {
      if (event?.integration_id === integration.id) {
        eventTypes.push(event.event_type);
      }
    });

    const eventStr = eventTypes.join(", ");
    if (eventStr !== "") {
      return (
        <p className="text-sm text-gray-500">
          <span className="text-base-content">Used in events:</span>{" "}
          {eventTypes}
        </p>
      );
    }
  };

  return integrations.length > 0 ? (
    filteredIntegrations.map((integration, i) => (
      <div
        key={i}
        className="flex max-h-64 border border-gray-200 shadow-md rounded-lg py-2 pr-2"
      >
        <div className="flex items-center justify-center w-28">
          <div className="aspect-square w-full h-full max-w-[48px] max-h-[48px] bg-link-hover rounded-lg">
            {integration.provider === "Stripe" && (
              <Image
                width={48}
                height={48}
                alt={"Stripe logo"}
                src={StripeLogo}
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col h-full w-full p-2 gap-2">
          <p>{integration.name}</p>
          <div className="max-w-64">
            <p className="text-sm text-gray-500">
              <span className="text-base-content">Provider: </span>
              {integration.provider}
            </p>
            <p className="text-sm text-gray-500">
              <span className="text-base-content">Created: </span>
              {convertDateTime(integration.created_at)}
            </p>
            {getIntegrationEventTypes(integration)}
          </div>
        </div>
        <div className="flex items-center">
          <DeleteIntegrationButton
            integration={integration}
            setIntegrations={setIntegrations}
          />
        </div>
      </div>
    ))
  ) : (
    <div className="flex flex-col gap-2 text-gray-400 mt-4 items-center border border-gray-200 rounded-lg py-12">
      {" "}
      <div className="text-md">
        You haven&apos;t created any integrations yet.
      </div>
      <div className="flex flex-row items-center gap-2">
        Click{" "}
        <span>
          <CirclePlus height={18} width={18} />
        </span>{" "}
        to create a new one!
      </div>
    </div>
  );
}

const DeleteIntegrationButton = ({
  integration,
  setIntegrations,
}: {
  integration: Tables<"Integrations">;
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const toggleElement = useRef<HTMLUListElement>(null);

  const handleDelete = () => {
    startTransition(async () => {
      const { data, error } = await deleteIntegration(integration.id);
      if (error) {
        showToastError(error);
      } else {
        setIntegrations((prevIntegrations) => {
          const updatedIntegrations = prevIntegrations.filter(
            (integration) => integration.id !== data.id
          );
          return updatedIntegrations;
        });
        toggleElement?.current?.classList.add("hidden");
        showToast(`Successfully deleted \"${data.name}\"`);
      }
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        className="p-2 rounded-lg cursor-pointer hover:bg-primary/20"
        onClick={() => {
          toggleElement?.current?.classList.remove("hidden");
        }}
      >
        <EllipsisVertical
          width={22}
          height={22}
          tabIndex={0}
          className="outline-none"
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

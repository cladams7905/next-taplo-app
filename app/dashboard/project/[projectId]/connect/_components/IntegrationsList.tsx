"use client";

import { Tables } from "@/supabase/types";
import { CirclePlus, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import { convertDateTime } from "@/lib/actions";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useTransition,
} from "react";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { deleteIntegration } from "@/lib/actions/integrations";
import { Providers } from "@/lib/enums";
import GA4Logo from "@/public/images/providers/ga-logo.svg";

export default function IntegrationsList({
  events,
  integrations,
  setIntegrations,
  searchQuery,
  integrationModalRef,
  setIntegrationToEdit,
}: {
  events: Tables<"Events">[] | null;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  searchQuery: string;
  integrationModalRef: RefObject<HTMLDialogElement>;
  setIntegrationToEdit: Dispatch<
    SetStateAction<Tables<"Integrations"> | undefined>
  >;
}) {
  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration?.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIntegrationEventTypes = (integration: Tables<"Integrations">) => {
    if (!events) return;
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
          <span className="text-base-content">Used in events:</span> {eventStr}
        </p>
      );
    } else {
      return <p className="text-sm text-error">Unused integration</p>;
    }
  };

  /**
   * Returns the logo of the selected provider
   */
  const getProviderLogo = (provider: Providers) => {
    switch (provider) {
      case Providers.Stripe:
        return (
          <Image
            width={48}
            height={48}
            alt={"Stripe logo"}
            src={StripeLogo}
            className="rounded-lg"
          />
        );
      case Providers.GoogleAnalytics:
        return (
          <Image
            width={48}
            height={48}
            alt={"Google analytics logo"}
            src={GA4Logo}
            className="rounded-lg aspect-square"
          />
        );
      default:
        return null;
    }
  };

  return integrations.length > 0 ? (
    filteredIntegrations.map((integration, i) => {
      const providerLogo = getProviderLogo(integration.provider as Providers);
      return (
        <div
          key={i}
          className="flex max-h-64 border border-gray-200 shadow-md rounded-lg py-2 pr-2"
        >
          <div className="flex items-center justify-center w-28">
            <div
              className={`aspect-square w-full h-full max-w-[48px] max-h-[48px] ${
                !providerLogo ? "bg-link-hover" : ""
              } rounded-lg`}
            >
              {providerLogo}
            </div>
          </div>
          <div className="flex flex-col h-full w-full p-2 gap-2">
            <p>{integration.name}</p>
            <div className="md:max-w-sm">
              <p className="text-sm text-gray-500">
                <span className="text-base-content">Created: </span>
                {convertDateTime(integration.created_at)}
              </p>
              {getIntegrationEventTypes(integration)}
            </div>
          </div>
          <div className="flex items-center">
            <IntegrationSettingsDropdown
              integration={integration}
              setIntegrations={setIntegrations}
              integrationModalRef={integrationModalRef}
              setIntegrationToEdit={setIntegrationToEdit}
            />
          </div>
        </div>
      );
    })
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

const IntegrationSettingsDropdown = ({
  integration,
  setIntegrations,
  integrationModalRef,
  setIntegrationToEdit,
}: {
  integration: Tables<"Integrations">;
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  integrationModalRef: RefObject<HTMLDialogElement>;
  setIntegrationToEdit: Dispatch<
    SetStateAction<Tables<"Integrations"> | undefined>
  >;
}) => {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const toggleElement = useRef<HTMLUListElement>(null);

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const { data, error } = await deleteIntegration(integration);
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
        className="menu menu-sm dropdown-content border border-neutral z-[1] p-2 shadow bg-base-100 rounded-md w-40"
      >
        <li>
          <a
            className="flex items-center justify-between py-2 rounded-md"
            onClick={() => {
              setIntegrationToEdit(integration);
              integrationModalRef.current?.showModal();
            }}
          >
            <div className="flex items-center gap-2">
              {" "}
              <Pencil width={18} height={18} />
              Edit
            </div>
          </a>
        </li>
        <li>
          <a
            className="flex items-center justify-between py-2 rounded-md"
            onClick={() => handleDelete()}
          >
            <div className="flex items-center gap-2">
              {" "}
              <Trash2 width={18} height={18} />
              Delete
            </div>
            {isDeletePending && (
              <span className="loading loading-spinner loading-sm bg-base-content" />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};

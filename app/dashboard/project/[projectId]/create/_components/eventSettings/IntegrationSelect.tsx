"use client";

import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types";
import { ChevronDown } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventType, Providers } from "@/lib/enums";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import GA4Logo from "@/public/images/providers/ga-logo.svg";
import { convertDateTime, formatCentsToDollars } from "@/lib/actions";
import Stripe from "stripe";
import { filterIntegrationsByEventType } from "../../_lib/sharedFunctions";

export default function IntegrationSelect({
  currentEvent,
  startLoadingTransition,
  handleUpdateEvent,
  selectedIntegration,
  setSelectedIntegration,
  setProductsToSelect,
  fetchProductsFromStripe,
}: {
  currentEvent?: Tables<"Events">;
  startLoadingTransition: TransitionStartFunction;
  handleUpdateEvent?: (
    currentEvent: Tables<"Events">,
    newEvent: TablesUpdate<"Events">
  ) => void;
  selectedIntegration?: Tables<"Integrations"> | undefined;
  setSelectedIntegration?: Dispatch<
    SetStateAction<Tables<"Integrations"> | undefined>
  >;
  setProductsToSelect?: Dispatch<SetStateAction<TablesInsert<"Products">[]>>;
  fetchProductsFromStripe?: (
    integration: Tables<"Integrations">
  ) => Promise<any>;
}) {
  const { integrations } = useProjectContext();
  const toggleModalRef = useRef<HTMLDivElement>(null);

  // Whether or not the integration select component is inside of the new product modal
  const isInProductModal = currentEvent === undefined;

  /**
   * handles integration selection in the dropdown menu
   * @param integration the integration to select
   */
  const handleIntegrationSelect = (integration: Tables<"Integrations">) => {
    if (isInProductModal && setSelectedIntegration && fetchProductsFromStripe) {
      if (setProductsToSelect) setProductsToSelect([]);
      setSelectedIntegration(integration);

      startLoadingTransition(async () => {
        const products: Stripe.Product[] = (
          await fetchProductsFromStripe(integration)
        )?.data;
        if (products && setProductsToSelect)
          setProductsToSelect(() => {
            let newProducts: TablesInsert<"Products">[] = [];
            products.forEach((product) => {
              newProducts.push({
                stripe_product_id: product.id,
                project_id: integration.project_id,
                user_id: integration.user_id,
                currency: (product.default_price as Stripe.Price)?.currency,
                price: parseFloat(
                  formatCentsToDollars(
                    (product.default_price as Stripe.Price)?.unit_amount,
                    false
                  )
                ),
                name: product.name,
                image_url: product.images[0],
              });
            });
            return newProducts;
          });
      });
    } else {
      startLoadingTransition(() => {
        if (handleUpdateEvent && currentEvent) {
          handleUpdateEvent(currentEvent, { integration_id: integration.id });
        }
      });
    }
    setTimeout(
      () => {
        toggleModalRef.current?.classList.add("hidden");
      },
      isInProductModal ? 100 : 1000
    );
  };

  /**
   * Gets the integrations that can be used for product fetching
   * @returns filtered integrations
   */
  const getIntegrationsForProductFetching = () => {
    return integrations.filter(
      (integration) => integration.provider === Providers.Stripe
    );
  };

  const [filteredIntegrations, setFilteredIntegrations] = useState<
    Tables<"Integrations">[]
  >(
    currentEvent
      ? filterIntegrationsByEventType(
          currentEvent.event_type as EventType,
          integrations
        )
      : getIntegrationsForProductFetching()
  );

  /**
   * Returns the logo of the selected provider
   */
  const getProviderLogo = (provider: Providers, isGrayscale = false) => {
    switch (provider) {
      case Providers.Stripe:
        return (
          <Image
            width={16}
            height={16}
            alt={"Stripe logo"}
            src={StripeLogo}
            className={`rounded-sm aspect-square ${
              isGrayscale ? "grayscale opacity-50" : ""
            }`}
          />
        );
      case Providers.GoogleAnalytics:
        return (
          <Image
            width={16}
            height={16}
            alt={"Google analytics logo"}
            src={GA4Logo}
            className={`rounded-sm aspect-square ${
              isGrayscale ? "grayscale opacity-50" : ""
            }`}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Change integration dropdown options whenever integrations array changes.
   */
  useEffect(() => {
    setFilteredIntegrations(
      filterIntegrationsByEventType(
        currentEvent?.event_type as EventType,
        integrations
      )
    );
  }, [integrations, currentEvent?.event_type]);

  return (
    <>
      {" "}
      <div
        className={`dropdown ${isInProductModal && "w-full"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleModalRef?.current?.classList.remove("hidden");
        }}
      >
        <div
          tabIndex={0}
          className={`flex p-2 px-3 items-center justify-between cursor-pointer border bg-white border-gray-200 rounded-lg text-sm ${
            isInProductModal && "text-lg w-full join-item h-[48px]"
          }`}
        >
          {currentEvent?.integration_id || selectedIntegration ? (
            <div className="flex items-center gap-2 pl-1">
              {selectedIntegration?.provider &&
                getProviderLogo(selectedIntegration.provider as Providers)}
              {selectedIntegration?.name}
            </div>
          ) : (
            <span className="text-gray-400">Select an integration</span>
          )}
          <ChevronDown width={16} height={16} />
        </div>
        <div
          tabIndex={0}
          ref={toggleModalRef}
          className="menu menu-sm dropdown-content bg-white border border-gray-200 shadow-md z-[1] rounded-lg w-full mt-1 h-fit max-h-44 min-h-11"
        >
          <ul className="h-full w-full overflow-y-scroll">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration, i) => (
                <li key={i}>
                  <a
                    className={`flex flex-col items-start justify-between py-2 ${
                      integration.id === currentEvent?.integration_id
                        ? "text-gray-400 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleIntegrationSelect(integration)}
                  >
                    <div className="flex items-center gap-3 pl-1">
                      {getProviderLogo(
                        integration.provider as Providers,
                        integration.id === currentEvent?.integration_id
                      )}
                      <div className="flex flex-col gap-[2px]">
                        {integration.name}{" "}
                        {integration.id === currentEvent?.integration_id &&
                          "- Selected"}
                        <p className="text-xs text-gray-400">
                          {" "}
                          Created: {convertDateTime(integration.created_at)}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <div className="text-gray-400 text-xs px-1 pt-1">
                {isInProductModal
                  ? "You don't have any integrations connected that are able to fetch products. Please first create a Stripe integration to fetch products."
                  : 'You haven\'t created any integrations for this event yet. Click "+" to create a new one!'}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

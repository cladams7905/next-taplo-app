"use client";

import { Tables, TablesInsert } from "@/supabase/types";
import { ChevronDown } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventType, Providers } from "@/lib/enums";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import { convertDateTime, formatCentsToDollars } from "@/lib/actions";
import Stripe from "stripe";

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
  handleUpdateEvent?: (event: Tables<"Events">, integrationId: number) => void;
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
   * Gets the integration that matches the current currentEvent's integration id.
   * @returns the integration
   */
  const getCurrentEventIntegration = () => {
    return integrations.find(
      (integration) => integration.id === currentEvent?.integration_id
    );
  };

  /**
   * Returns the integrations that are compatible with the current currentEvent.
   */
  const filterIntegrationsByEventType = useCallback(() => {
    let filteredIntegrations: Tables<"Integrations">[] = integrations;
    switch (currentEvent?.event_type) {
      case EventType.AddToCart:
      case EventType.SomeoneViewing:
      case EventType.Purchase:
        filteredIntegrations = integrations.filter(
          (integration) => integration.provider === Providers.Stripe
        );
        break;
      case EventType.ActiveUsers:
        filteredIntegrations = integrations.filter(
          (integration) => integration.provider === Providers.GoogleAnalytics
        );
        break;
    }
    return filteredIntegrations;
  }, [currentEvent?.event_type, integrations]);

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
          handleUpdateEvent(currentEvent, integration.id);
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
      ? filterIntegrationsByEventType()
      : getIntegrationsForProductFetching()
  );

  /**
   * Change integration dropdown options whenever integrations array changes.
   */
  useEffect(() => {
    setFilteredIntegrations(filterIntegrationsByEventType());
  }, [integrations, filterIntegrationsByEventType]);

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
          {currentEvent?.integration_id ? (
            <div className="flex items-center gap-2">
              <Image
                width={16}
                height={16}
                alt={"provider logo"}
                src={StripeLogo}
                className="rounded-sm"
              />
              {getCurrentEventIntegration()?.name}
            </div>
          ) : selectedIntegration ? (
            <div className="flex items-center gap-2">
              {" "}
              <Image
                width={16}
                height={16}
                alt={"provider logo"}
                src={StripeLogo}
                className="rounded-sm"
              />
              {selectedIntegration.name}
            </div>
          ) : (
            <span className="text-gray-400">Select an integration</span>
          )}
          <ChevronDown width={16} height={16} />
        </div>
        <div
          tabIndex={0}
          ref={toggleModalRef}
          className="menu menu-sm dropdown-content bg-white border border-gray-200 shadow-md z-[1] rounded-lg w-full mt-1 h-fit min-h-16 max-h-44"
        >
          <ul className="h-full w-full overflow-y-scroll">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map((integration, i) => (
                <li key={i}>
                  <a
                    className={`flex flex-col items-start justify-between rounded-md py-2 ${
                      integration.id === currentEvent?.integration_id
                        ? "text-gray-400 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleIntegrationSelect(integration)}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        width={16}
                        height={16}
                        alt={"provider logo"}
                        src={StripeLogo}
                        className={`rounded-sm ${
                          integration.id === currentEvent?.integration_id
                            ? "grayscale opacity-50"
                            : ""
                        }`}
                      />
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
              <div className="text-gray-400 text-xs">
                {isInProductModal
                  ? "You don't have any integrations connected that are able to fetch products. Please first create a Stripe or Shopify integration to fetch products."
                  : 'You haven\'t created any integrations for this event yet. Click "+" to create a new one!'}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

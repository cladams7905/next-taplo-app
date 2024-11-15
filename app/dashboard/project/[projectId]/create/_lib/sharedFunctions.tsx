import {
  ContentVars,
  DefaultMessages,
  EventType,
  Providers,
} from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";
import {
  ShoppingBag,
  ShoppingCart,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";

/**
 * Filters integrations based on the current event type.
 * @param currentEventType - The type of the current event.
 * @param integrations - The list of integrations to filter.
 * @returns The filtered list of integrations.
 */
export const filterIntegrationsByEventType = (
  currentEventType: EventType | undefined,
  integrations: Tables<"Integrations">[]
): Tables<"Integrations">[] => {
  let filteredIntegrations: Tables<"Integrations">[] = integrations;

  switch (currentEventType) {
    case EventType.Checkout:
    case EventType.Purchase:
    case EventType.CustomerTrends:
      filteredIntegrations = integrations.filter(
        (integration) => integration.provider === Providers.Stripe
      );
      break;
    case EventType.SomeoneViewing:
    case EventType.ActiveUsers:
      filteredIntegrations = integrations.filter(
        (integration) => integration.provider === Providers.GoogleAnalytics
      );
      break;
  }

  return filteredIntegrations;
};

/**
 * Gets the available variables based on the event type
 * @returns the available list of variables
 */
export const getVariableList = (currentEvent: Tables<"Events"> | undefined) => {
  let variableList: string[] = [];
  if (currentEvent) {
    switch (currentEvent.event_type) {
      case EventType.Purchase:
      case EventType.Checkout:
        variableList = [
          ContentVars.Person,
          ContentVars.Location,
          ContentVars.Product,
          ContentVars.Price,
        ];
        break;
      case EventType.ActiveUsers:
        variableList = [ContentVars.NumUsers, ContentVars.ProjectName];
        break;
      case EventType.SomeoneViewing:
        variableList = [ContentVars.Location, ContentVars.ProjectName];
        break;
    }
  }
  return variableList;
};

/**
 * Returns the icon for the corresponding event type
 * @param eventType the event type
 * @param size the dimensions of the icon
 * @param color the color of the icon
 * @returns the icon
 */
export const getEventIcon = (
  eventType: EventType,
  size = 20,
  color = "#FFFFFF"
) => {
  switch (eventType) {
    case EventType.Purchase:
      return <ShoppingBag size={size} color={color} />;
    case EventType.Checkout:
      return <ShoppingCart size={size} color={color} />;
    case EventType.SomeoneViewing:
      return <UserRoundSearch size={size} color={color} />;
    case EventType.ActiveUsers:
      return <UsersRound size={size} color={color} />;
  }
};

/**
 * Gets the default message options available for a notification event.
 * @param eventType the event's type
 * @returns an array of the message options
 */
export const getDefaultMessageOptions = (eventType: EventType) => {
  let options: string[] = [];
  switch (eventType) {
    case EventType.ActiveUsers:
      options = [
        DefaultMessages.ActiveUsers,
        "\\NUMUSERS people are currently considering \\PROJECTNAME's products.",
      ];
      break;
    case EventType.Purchase:
      options = [
        DefaultMessages.Purchase,
        "\\PERSON in \\LOCATION subscribed to \\PRODUCT.",
        "\\PERSON in \\LOCATION bought \\PRODUCT for \\PRICE.",
      ];
      break;
    case EventType.Checkout:
      options = [
        DefaultMessages.Checkout,
        "\\PERSON in \\LOCATION activated their free trial.",
        "\\PERSON in \\LOCATION added \\PRODUCT to cart.",
      ];
      break;
    case EventType.SomeoneViewing:
      options = [DefaultMessages.SomeoneViewing];
      break;
    case EventType.CustomerTrends:
      break;
  }
  return options;
};

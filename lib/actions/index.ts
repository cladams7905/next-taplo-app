import { Tables as StripeTables } from "@/stripe/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ContentVars } from "../enums";
import DOMPurify from "isomorphic-dompurify";
import { Tables } from "@/supabase/types";
import { MessageData } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @returns the current site url (or localhost if in dev mode)
 */
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

/**
 * Converts date time into a more readable format (i.e. Today 3:14 PM)
 * @param timestampz timestampz
 * @returns time
 */
export function convertDateTime(
  timestampz: string,
  includeYear: boolean = false,
  isLiveMode: boolean = false
): string {
  const now = new Date();
  const inputDate = new Date(timestampz);

  const currentDateMidnight = new Date(now.setHours(0, 0, 0, 0));
  const inputDateMidnight = new Date(inputDate.setHours(0, 0, 0, 0));

  const diffTime = inputDateMidnight.getTime() - currentDateMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (isLiveMode) {
    return getLiveModeTimeDifference(now, inputDate);
  } else {
    return getFormattedDateTime(inputDate, diffDays, includeYear);
  }
}

function getLiveModeTimeDifference(now: Date, inputDate: Date): string {
  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}

function getFormattedDateTime(
  inputDate: Date,
  diffDays: number,
  includeYear: boolean
): string {
  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear().toString().slice(-2);

  const time = formatTime(inputDate);

  if (diffDays === 0) {
    return `Today ${time}`;
  } else if (diffDays === -1) {
    return `Yesterday ${time}`;
  } else if (diffDays === 1) {
    return `Tomorrow ${time}`;
  } else {
    return `${month}/${day}${includeYear ? `/${year}` : ""} ${time}`;
  }
}

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const isPM = hours >= 12;

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${isPM ? "PM" : "AM"}`;
}

/**
 * converts seconds to DateTime object.
 * @param secs seconds
 * @returns DateTime object
 */
export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:00:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

/**
 * Calculates date two weeks from now for billing cycle.
 * @returns date two weeks from now (in seconds)
 */
export const calculateBillingCycle = () => {
  const now = Math.floor(Date.now() / 1000); // Get the current time in seconds since Unix epoch
  const twoWeeksInSeconds = 2 * 7 * 24 * 60 * 60; // Two weeks in seconds
  return now + twoWeeksInSeconds;
};

/**
 * Formats cents to dollars.
 * @param cents value in cents
 * @returns $0.00 format
 */
export function formatCentsToDollars(
  cents: number | null,
  includeDollarSign: boolean = true
) {
  if (cents !== null) {
    const dollars = (cents / 100).toFixed(2);
    return includeDollarSign ? `$${dollars}` : dollars;
  }
  return "";
}

/**
 * Formats a price string to $0.00 format
 * @param price the price
 */
export const formatPrice = (price: string | number | null) => {
  if (!price) return "";

  let value;
  if (typeof price === "string") {
    value = parseFloat(price);
  } else {
    value = price;
  }

  if (!isNaN(value)) {
    // Format the value as currency with 2 decimal places
    price = value.toFixed(2);
    // Optionally, prepend the currency symbol
    price = `$${price}`;
  } else {
    price = "0.00"; // Handle empty or invalid input
  }
  return price;
};

/**
 * Checks if a subscription is in a trial period.
 * @param subscription the subscription
 */
export const isFreeTrialPeriod = (
  subscription: StripeTables<"subscriptions">
) => {
  const now = Math.floor(Date.now() / 1000);
  const trialStart = subscription?.trial_start
    ? Math.floor(new Date(subscription.trial_start).getTime() / 1000)
    : 0;
  const trialEnd = subscription?.trial_end
    ? Math.floor(new Date(subscription.trial_end).getTime() / 1000)
    : 0;

  return trialStart <= now && now < trialEnd;
};

/**
 * Appends an ellipsis to the end of a string when str exceeds maxLength
 * @param str the string
 * @param maxLength default 25 chars
 * @returns modified string
 */
export function checkStringLength(str: string | null, maxLength?: number) {
  if (str == null) {
    return "";
  }

  let modifiedStr = str;
  if (str.length > (maxLength ? maxLength : 25)) {
    modifiedStr = str.substring(0, 20) + "...";
  }

  return modifiedStr;
}

/**
 * Capitalizes first letter of string.
 * @param string the string
 * @returns the updated string.
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Checks to see if a title already exists in an array of strings.
 * If it does, then it appends a number to the end of the title to make it unique.
 * @param arr the array of strings
 * @param title the title to check against
 * @returns the new title
 */
export const checkDuplicateTitle = (arr: (string | null)[], title: string) => {
  let count = 0;
  arr.forEach((value: string | null) => {
    if (value && value.includes(title)) {
      count++;
    }
  });
  arr.forEach((value) => {
    if (value) {
      const match = value.match(/\d/);
      if (match) {
        const num = parseInt(match[0]);
        if (num >= count) {
          count = num + 1;
        }
      }
    }
  });
  if (count > 0) {
    title = `${title} (${count})`;
  }
  return title;
};

/**
 * Sorts an array by the created_at field in descending order (most recent entries at the top).
 */
export const sortByTimeCreated = (arr: any[]) => {
  return arr
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
};

/**
 * Converts a hex string value to rgba (with opacity)
 * @param hex the hex string
 * @param opacity the opacity value (between 0 and 1)
 * @returns the rgba string
 */
export function hexToRgba(hex: string, opacity?: number) {
  if (!opacity) opacity = 1;

  // Remove the "#" if present
  hex = hex.replace(/^#/, "");

  // Convert the hex to RGB
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Searches for variables inside of the popup text content and replaces them with placeholder data
 * if called inside of the popup template or events sidebar, or it sets real data if called inside
 * of the live popup widget.
 *
 * @param contentStr the content body text
 * @param isPopup whether the content is appearing in the popup or in the sidebar
 * @param isLiveMode whether the content is appearing in the live popup widget
 * @returns the revised content body (should be set inside of dangerouslySetHTML if
 * isReturnHTML is set to true)
 */
export const replaceVariablesInContentBody = (
  product: Tables<"Products"> | undefined,
  backgroundColor: string,
  accentColor: string,
  contentStr: string | undefined,
  isPopup = false,
  isLiveMode = false,
  messageData?: MessageData
) => {
  if (!contentStr) return "";

  const getVariableHTML = (word: string, index: number) => {
    const returnHTML = `<span key=${index} class="text-primary ${
      !isPopup || product?.link ? "px-1 rounded-lg" : ""
    }">${
      "[" +
      replaceVariable(word.substring(1).toLocaleLowerCase() as ContentVars) +
      "]"
    }</span>`;
    return DOMPurify.sanitize(returnHTML);
  };

  const replaceVariable = (
    variable: ContentVars,
    messageData?: MessageData
  ) => {
    switch (variable) {
      case ContentVars.Person:
        return isLiveMode && messageData?.customerName
          ? messageData.customerName
          : isPopup
          ? "Somone"
          : "Person";
      case ContentVars.Location:
        return getLocationString(messageData);
      case ContentVars.Product:
        return getProductHTML();
      case ContentVars.NumUsers:
      case ContentVars.RecentUsers:
        return isPopup ? "20" : "#";
      case ContentVars.Price:
        return isPopup ? "$29.99" : "$";
      default:
        return "undefined";
    }
  };

  const getLocationString = (messageData?: MessageData) => {
    if (isLiveMode && messageData?.customerAddress.country) {
      const { city, state, country } = messageData?.customerAddress;
      const locationParts = [city, state, country].filter(Boolean);
      return locationParts.join(", ");
    } else {
      return isPopup ? "North America" : "Location";
    }
  };

  const getProductHTML = () => {
    if (!isPopup) return "Product";
    const productLink = product?.link
      ? `<a href="${product.link}" target="_blank">`
      : "";
    const productName = product?.name ? product.name : "a product";
    const productStyle = product?.name ? `style="color: ${accentColor};"` : "";
    const productClass = product?.name ? "font-bold underline mr-1" : "";
    const underlineClass = product?.link ? "underline" : "";
    const svgIcon = product?.link ? getSVGIcon() : "";

    return DOMPurify.sanitize(
      `${productLink}<span ${productStyle} class="rounded-lg ${productClass} ${underlineClass}">${productName}</span>${svgIcon}${
        product?.link ? "</a>" : ""
      }`
    );
  };

  const getSVGIcon = () => {
    return `<svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="10" 
      height="10" 
      viewBox="0 0 24 24" 
      fill="${backgroundColor}" 
      stroke="${accentColor}" 
      stroke-width="3" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      class="inline-flex items-center mb-[2px] mr-1"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
      <path d="M21 3l-9 9"/>
      <path d="M15 3h6v6"/>
    </svg>`;
  };

  const transformWord = (word: string, index: number) => {
    const checkForInvalidCharsRegex = /[^a-zA-Z0-9\\]/;
    const filterInvalidCharsRegex = /(\\\w+|\w+|[^\w\s])/g;

    if (word.startsWith("\\") && checkForInvalidCharsRegex.test(word)) {
      const cleanedWord = word.split(filterInvalidCharsRegex).filter(Boolean);
      return cleanedWord
        .map((val) => {
          return val.startsWith("\\")
            ? isPopup
              ? replaceVariable(
                  val.substring(1).toLocaleLowerCase() as ContentVars,
                  messageData
                )
              : getVariableHTML(val, index)
            : val;
        })
        .join("");
    } else {
      return word.startsWith("\\")
        ? isPopup
          ? replaceVariable(
              word.substring(1).toLocaleLowerCase() as ContentVars,
              messageData
            )
          : getVariableHTML(word, index)
        : word;
    }
  };

  const transformedWords = contentStr.split(" ").map(transformWord);
  return transformedWords.join(" ");
};

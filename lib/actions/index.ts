import { type ClassValue, clsx } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

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
  includeYear: boolean = false
): string {
  const now = new Date();
  const inputDate = new Date(timestampz);

  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ); // Set to today's midnight
  const inputDateMidnight = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  ); // Midnight of input date

  const diffTime = inputDateMidnight.getTime() - currentDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear().toString().slice(-2); // Get the last two digits of the year

  let isPM = false;
  let hours = inputDate.getHours();
  if (hours >= 12) {
    if (hours !== 12) {
      hours -= 12;
    }
    isPM = true;
  } else if (hours === 0) {
    hours = 12;
  }
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}${isPM ? "PM" : "AM"}`;

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
export const isFreeTrialPeriod = (subscription: Stripe.Subscription) => {
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

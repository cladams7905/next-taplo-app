import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts date time into a more readable format (i.e. Today 3:14 PM)
 * @param timestampz timestampz
 * @returns time
 */
export function convertDateTime(timestampz: string): string {
  const currentDate = new Date();
  currentDate.setHours(24, 0, 0, 0); //Set current date to midnight
  const inputDate = new Date(timestampz);
  const diffTime = Math.abs(currentDate.getTime() - inputDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  let isPM = false;
  let hours = inputDate.getHours();
  if (hours >= 12) {
    if (hours != 12) {
      hours -= 12;
    }
    isPM = true;
  } else if (hours == 0) {
    hours = 12;
  }
  hours.toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");

  const time = `${hours}:${minutes}${isPM ? "PM" : "AM"}`;

  if (diffDays === 0) {
    return `Today ${time}`;
  } else if (diffDays === 1) {
    return `Yesterday ${time}`;
  } else {
    return `${month}/${day} ${time}`;
  }
}

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

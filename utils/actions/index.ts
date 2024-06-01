import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Moves an array value to the top index of an array.
 * @param arr The array
 * @param value the value to move
 * @returns
 */
export function moveToTop(arr: any[], value: any) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
    arr.unshift(value);
  }
  return arr;
}

"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Updates the raw metadata for a user
 * @param data a JSON object containing user metadata
 * @returns the result of the updateUser attempt
 */
export const updateUserMetadata = async (data: object | undefined) => {
  const supabase = createClient();
  const result = await supabase.auth.updateUser({ data: data });
  return result;
};

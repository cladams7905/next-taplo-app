"use server";

import { createClient } from "@/supabase/server";
import { TablesInsert, TablesUpdate } from "@/supabase/types";

export async function createUserToast(userToast: TablesInsert<"Toasts">) {
  const supabase = createClient();
  const result = await supabase
    .from("Toasts")
    .insert(userToast)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getUserToasts(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("Toasts").select().eq("user_id", userId);
  return JSON.parse(JSON.stringify(result));
}

export async function updateUserToast(
  toastId: number,
  userToast: TablesUpdate<"Toasts">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Toasts")
    .update(userToast)
    .eq("id", toastId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function deleteUserToast(toastId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Toasts")
    .delete()
    .eq("id", toastId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

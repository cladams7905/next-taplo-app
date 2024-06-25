"use server";

import { createClient } from "@/app/supabase/server";
import { TablesInsert, TablesUpdate } from "@/app/supabase/types";

export async function createWebhook(webhook: TablesInsert<"ApiKeys">) {
  const supabase = createClient();
  const result = await supabase
    .from("ApiKeys")
    .insert(webhook)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getApiKeys(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("ApiKeys").select().eq("user_id", userId);
  return JSON.parse(JSON.stringify(result));
}

export async function updateWebhook(
  webhookId: number,
  webhook: TablesUpdate<"ApiKeys">
) {
  const supabase = createClient();
  const result = await supabase
    .from("ApiKeys")
    .update(webhook)
    .eq("id", webhookId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function deleteWebhook(webhookId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("ApiKeys")
    .delete()
    .eq("id", webhookId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

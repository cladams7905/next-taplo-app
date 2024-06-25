"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert, TablesUpdate } from "@/lib/supabase/types";

export async function createWebhook(webhook: TablesInsert<"Webhooks">) {
  const supabase = createClient();
  const result = await supabase
    .from("Webhooks")
    .insert(webhook)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getWebhooks(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Webhooks")
    .select()
    .eq("project_id", projectId);
  return JSON.parse(JSON.stringify(result));
}

export async function updateWebhook(
  webhookId: number,
  webhook: TablesUpdate<"Webhooks">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Webhooks")
    .update(webhook)
    .eq("id", webhookId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function deleteWebhook(webhookId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Webhooks")
    .delete()
    .eq("id", webhookId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

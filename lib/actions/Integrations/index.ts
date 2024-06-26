"use server";

import { createClient } from "@/supabase/server";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";

export async function createIntegration(
  integration: TablesInsert<"Integrations">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Integrations")
    .insert(integration)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getIntegrations(userId: string) {
  const supabase = createClient();
  const result = await supabase
    .from("Integrations")
    .select()
    .eq("user_id", userId);
  return JSON.parse(JSON.stringify(result));
}

export async function updateIntegration(
  integrationId: number,
  integration: TablesUpdate<"Integrations">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Integrations")
    .update(integration)
    .eq("id", integrationId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function deleteIntegration(integrationId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Integrations")
    .delete()
    .eq("id", integrationId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

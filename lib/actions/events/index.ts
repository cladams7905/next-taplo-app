"use server";

import { createClient } from "@/supabase/server";
import { TablesInsert, TablesUpdate } from "@/supabase/types";

export async function createEvent(event: TablesInsert<"Events">) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .insert(event)
    .select("*")
    .single();
  return result;
}

export async function getEvents(projectId: string) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .select()
    .eq("project_id", projectId);
  return result;
}

export async function updateEvent(
  eventId: number,
  event: TablesUpdate<"Events">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .update(event)
    .eq("id", eventId)
    .select("*")
    .single();
  return result;
}

export async function deleteEvent(eventId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .delete()
    .eq("id", eventId)
    .select("*")
    .single();
  return result;
}

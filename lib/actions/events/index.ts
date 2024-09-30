"use server";

import { createClient } from "@/supabase/server";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import { revalidatePath } from "next/cache";

export async function createEvent(event: TablesInsert<"Events">) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .insert(event)
    .select("*")
    .single();
  revalidatePath(`/dashboard/project/${event.project_id}/create`, "layout");
  return result;
}

export async function getEvents(projectId: number) {
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
  revalidatePath(`/dashboard/project/${event.project_id}/create`, "layout");
  return result;
}

export async function deleteEvent(event: Tables<"Events">) {
  const supabase = createClient();
  const result = await supabase
    .from("Events")
    .delete()
    .eq("id", event.id)
    .select("*")
    .single();
  revalidatePath(`/dashboard/project/${event.project_id}/create`, "layout");
  return result;
}

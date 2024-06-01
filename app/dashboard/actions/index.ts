"use server";

import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/utils/supabase/types";

export async function createProject(project: TablesInsert<"Projects">) {
  const supabase = await createClient();
  const result = await supabase
    .from("Projects")
    .insert(project)
    .select("*")
    .single();
  return JSON.stringify(result);
}

export async function getProjectsByUserId(userId: string) {
  const supabase = await createClient();
  const result = await supabase.from("Projects").select().eq("user_id", userId);
  return JSON.stringify(result);
}

export async function getProjectSessionData(projectId: string) {
  const supabase = await createClient();
  const result = await supabase
    .from("SessionData")
    .select()
    .eq("project_id", projectId);
  return JSON.stringify(result);
}

export async function getActiveProject(userId: string) {
  const supabase = await createClient();
  const result = await supabase
    .from("Projects")
    .select(
      `*,
    SessionData!inner (
      last_opened
    )`
    )
    .eq("SessionData.is_active", true)
    .single();
  return JSON.stringify(result);
}

export async function setActiveProject(userId: string, projectId: string) {
  const supabase = await createClient();
  const result = await supabase
    .from("SessionData")
    .update({ is_active: true })
    .eq("user_id", userId)
    .eq("project_id", projectId);
  return JSON.stringify(result);
}

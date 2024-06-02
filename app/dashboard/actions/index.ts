"use server";

import { createClient } from "@/utils/supabase/server";
import { TablesInsert } from "@/utils/supabase/types";

export async function createProject(project: TablesInsert<"Projects">) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .insert(project)
    .select("*")
    .single();
  return JSON.stringify(result);
}

export async function getProjectsByUserId(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("Projects").select().eq("user_id", userId);
  return JSON.stringify(result);
}

export async function getProjectSessionData(projectId: string) {
  const supabase = createClient();
  const result = await supabase
    .from("SessionData")
    .select()
    .eq("project_id", projectId);
  return JSON.stringify(result);
}

export async function getActiveProject(userId: string) {
  const supabase = createClient();
  const sessionData = await supabase
    .from("SessionData")
    .select("project_id")
    .eq("is_active", true)
    .eq("user_id", userId);

  if (!sessionData.data || sessionData.data?.length === 0) {
    return JSON.stringify(sessionData);
  }
  const activeProjectId = sessionData.data[0];

  if (!activeProjectId.project_id) {
    return JSON.stringify(activeProjectId);
  } else {
    const result = await supabase
      .from("Projects")
      .select()
      .eq("id", activeProjectId.project_id)
      .single();
    return JSON.stringify(result);
  }
}

export async function setActiveProject(userId: string, projectId: string) {
  const supabase = createClient();
  const result = await supabase
    .from("SessionData")
    .update({ is_active: true })
    .eq("user_id", userId)
    .eq("project_id", projectId);
  return JSON.stringify(result);
}

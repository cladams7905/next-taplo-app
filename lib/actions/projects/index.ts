"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/lib/supabase/types";

export async function createProject(project: TablesInsert<"Projects">) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .insert(project)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getProjectsByUserId(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("Projects").select().eq("user_id", userId);
  return JSON.parse(JSON.stringify(result));
}

export async function getProjectById(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .select()
    .eq("id", projectId)
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function deleteProjectById(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .delete()
    .eq("id", projectId)
    .single();
  return JSON.parse(JSON.stringify(result));
}

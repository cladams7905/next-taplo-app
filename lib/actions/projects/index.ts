"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert, TablesUpdate } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

export async function createProject(project: TablesInsert<"Projects">) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .insert(project)
    .select("*")
    .single();
  revalidatePath("/dashboard/project/[projectId]/create", "layout");
  return result;
}

export async function getProjects(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("Projects").select().eq("user_id", userId);
  return result;
}

export async function getActiveProject(userId: string) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .select()
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();
  return result;
}

export async function getProjectById(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .select()
    .eq("id", projectId)
    .single();
  return result;
}

export async function setActiveProject(userId: string, projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .update({ is_active: true })
    .eq("user_id", userId)
    .eq("id", projectId);
  return result;
}

export async function updateProject(
  projectId: number,
  project: TablesUpdate<"Projects">,
  shouldRevalidatePath: boolean = false
) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .update(project)
    .eq("id", projectId)
    .select("*")
    .single();
  if (shouldRevalidatePath) {
    revalidatePath("/dashboard/project/[projectId]/create", "layout");
  }
  return result;
}

export async function deleteProject(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Projects")
    .delete()
    .eq("id", projectId)
    .select("*")
    .single();
  revalidatePath("/dashboard/project/[projectId]/create", "layout");
  return result;
}

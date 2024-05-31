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
  const { data, error } = await supabase
    .from("Projects")
    .select()
    .eq("user_id", userId);
  if (error) {
    console.error(`Error fetching projects for user ${userId}:`, error.message);
    return null;
  }
  return data;
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/lib/supabase/types";

export async function createUserToast(userToast: TablesInsert<"UserToasts">) {
  const supabase = createClient();
  const result = await supabase
    .from("UserToasts")
    .insert(userToast)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}

export async function getUserToasts(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("UserToasts")
    .select()
    .eq("project_id", projectId);
  return JSON.parse(JSON.stringify(result));
}

"use server";

import { getActiveProject } from "@/lib/actions/sessionData";
import { createClient } from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = createClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = createClient();
  const result = await supabase.auth.signOut();
  return JSON.stringify(result);
}

export async function getRedirectPathname(userId: string) {
  const activeProject = await getActiveProject(userId);
  if (activeProject?.data.id) {
    return `/dashboard/project/${activeProject.data.id}/create`;
  } else {
    return `/dashboard/create-project`;
  }
}

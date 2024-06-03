"use server";

import { getActiveProject } from "@/app/dashboard/actions";
import { createClient } from "@/utils/supabase/server";

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
  const activeProject = JSON.parse(await getActiveProject(userId));
  if (activeProject?.data) {
    return `/dashboard/project/${activeProject.data.id}`;
  } else {
    return `/dashboard/create-project`;
  }
}

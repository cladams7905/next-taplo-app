import { redirect } from "next/navigation";
import React from "react";
import ProjectNavbar from "./ProjectNavbar";
import { createClient } from "@/utils/supabase/server";

export default async function ProjectsPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <main>
      <div>Projects</div>
      <ProjectNavbar />
    </main>
  );
}

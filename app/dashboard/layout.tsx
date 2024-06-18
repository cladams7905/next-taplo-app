import React from "react";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProjectsByUserId } from "@/lib/actions/projects";
import { getActiveProject } from "@/lib/actions/sessionData";
import { revalidatePath } from "next/cache";
import ProjectTabList from "./project/[projectId]/components/ProjectTabList";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  revalidatePath("/dashboard/project");
  const currentProjects = (await getProjectsByUserId(data.user.id))?.data || [];
  const activeProject = (await getActiveProject(data.user.id))?.data;

  return (
    <main>
      <Navbar
        user={data.user}
        projects={currentProjects}
        fetchedActiveProject={activeProject}
      />
      <div className="flex flex-col h-screen-minus-navbar bg-white dark:bg-base-100 relative">
        <div className="flex flex-col w-full h-full font-sans relative">
          {children}
        </div>
      </div>
    </main>
  );
}

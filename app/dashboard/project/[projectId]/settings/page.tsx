import { getActiveProject } from "@/lib/actions/projects";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import ProjectDetails from "./_components/ProjectDetails";
import DeleteProjectModal from "./_components/DeleteProjectModal";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const { data: activeProject } = await getActiveProject(data.user.id);
  if (!activeProject) {
    redirect("/dashboard/create-project");
  }

  return (
    <div className="flex items-center justify-center w-full py-6 h-full">
      <div className="lg:max-w-[70vw] w-full h-full flex flex-col gap-6 px-6 pt-6 overflow-y-scroll bg-white rounded-lg border border-gray-300">
        <p className="text-lg font-bold">Project Settings</p>
        <ProjectDetails fetchedActiveProject={activeProject} />
        <div className="flex flex-col border border-error rounded-lg px-6 py-4 gap-3 text-sm">
          <p className="font-bold text-error">Danger Zone</p>
          <DeleteProjectModal activeProject={activeProject} />
        </div>
      </div>
    </div>
  );
}

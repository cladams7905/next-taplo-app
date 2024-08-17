import { getActiveProject } from "@/lib/actions/projects";
import ProjectBoard from "./_components/ProjectBoard";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { getEvents } from "@/lib/actions/events";

export default async function CreatePopupPage({ params }: { params: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const activeProject = (await getActiveProject(data.user.id)).data;
  const integrations = (await getIntegrations(activeProject.id)).data;
  const events = (await getEvents(activeProject.id)).data;

  return (
    <ProjectBoard
      fetchedActiveProject={activeProject}
      fetchedIntegrations={integrations}
      fetchedEvents={events}
    />
  );
}

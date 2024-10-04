import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import IntegrationBoard from "./_components/IntegrationBoard";
import { getIntegrations } from "@/lib/actions/integrations";
import { getActiveProject } from "@/lib/actions/projects";
import { getEvents } from "@/lib/actions/events";

export default async function ConnectPage() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: activeProject } = await getActiveProject(userData.user.id);
  if (!activeProject) {
    redirect("/dashboard/create-project");
  }

  const { data: integrations } = await getIntegrations(activeProject.id);
  const { data: events } = await getEvents(activeProject.id);

  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12 px-4">
      <IntegrationBoard
        events={events}
        activeProject={activeProject}
        fetchedIntegrations={integrations}
      />
    </div>
  );
}

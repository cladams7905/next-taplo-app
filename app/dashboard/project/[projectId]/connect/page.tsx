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
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/80 to-violet-100 h-screen-minus-navbar w-full md:px-24 sm:px-10">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <IntegrationBoard
        events={events}
        activeProject={activeProject}
        fetchedIntegrations={integrations}
      />
    </div>
  );
}

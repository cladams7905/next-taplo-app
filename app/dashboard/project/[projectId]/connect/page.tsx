import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import IntegrationBoard from "./_components/IntegrationBoard";
import { getIntegrations } from "@/lib/actions/integrations";
import { getActiveProject } from "@/lib/actions/projects";

export default async function ConnectPage() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/");
  }

  const { data: projectData } = await getActiveProject(userData.user.id);
  const { data: integrations } = await getIntegrations(projectData.id);
  const activeProject = await getActiveProject(userData.user.id);
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <IntegrationBoard
        fetchedActiveProject={activeProject}
        fetchedIntegrations={integrations}
      />
    </div>
  );
}

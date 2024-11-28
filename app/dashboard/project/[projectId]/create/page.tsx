import { getActiveProject } from "@/lib/actions/projects";
import ProjectBoard from "./_components/ProjectBoard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { getEvents } from "@/lib/actions/events";
import { getProducts } from "@/lib/actions/products";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const { data: activeProject } = await getActiveProject(data.user.id);
  if (!activeProject) {
    redirect("/dashboard/create-project");
  }

  const { data: integrations } = await getIntegrations(activeProject.id);
  const { data: events } = await getEvents(activeProject.id);
  const { data: products } = await getProducts(activeProject.id);

  return (
    <ProjectBoard
      user={data.user}
      fetchedActiveProject={activeProject}
      fetchedIntegrations={integrations}
      fetchedEvents={events}
      fetchedProducts={products}
    />
  );
}

import { getActiveProject, getProjects } from "@/lib/actions/projects";
import ToastBoard from "./components/ToastBoard";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { revalidatePath } from "next/cache";
import { getProducts } from "@/lib/actions/products";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const activeProject = (await getActiveProject(data.user.id)).data;
  const integrations = (await getIntegrations(data.user.id)).data;
  const products = (await getProducts(data.user.id)).data;

  return (
    <ToastBoard
      activeProject={activeProject}
      integrations={integrations}
      products={products}
    />
  );
}

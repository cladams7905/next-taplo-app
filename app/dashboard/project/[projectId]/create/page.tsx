import { getActiveProject } from "@/lib/actions/projects";
import ProjectBoard from "./_components/ProjectBoard";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { getEvents } from "@/lib/actions/events";
import { getProducts } from "@/lib/actions/products";
import { User } from "@supabase/supabase-js";
import { getURL } from "@/lib/actions";

export default async function CreatePopupPage({ params }: { params: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const activeProject = (await getActiveProject(data.user.id)).data;
  const integrations = (await getIntegrations(activeProject.id)).data;
  const events = (await getEvents(activeProject.id)).data;
  const products = (await getProducts(activeProject.id)).data;
  const featuresVoteToken = await fetchToken(data.user);

  return (
    <ProjectBoard
      user={data.user}
      fetchedActiveProject={activeProject}
      fetchedIntegrations={integrations}
      fetchedEvents={events}
      fetchedProducts={products}
      featuresVoteToken={featuresVoteToken}
    />
  );
}

const fetchToken = async (user: User) => {
  try {
    const res = await fetch(getURL() + "/api/v1/features_vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch token:", res.statusText);
      return;
    }

    const responseData = await res.json();
    return responseData.token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

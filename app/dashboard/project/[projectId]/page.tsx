import Sidebar from "./components/Sidebar";
import FeatureBoard from "./components/FeatureBoard";
import { getProjectById } from "@/lib/actions/projects";
import { getFeatureRequests } from "@/lib/actions/featureRequests";
import { notFound } from "next/navigation";

export default async function DashboardHome({
  params,
}: {
  params: { projectId: number };
}) {
  const featureRequests = (await getFeatureRequests(params.projectId)).data;
  const project = (await getProjectById(params.projectId)).data;

  if (!project) {
    return notFound();
  }

  return (
    <main className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 h-full">
        <FeatureBoard featureRequests={featureRequests} project={project} />
      </div>
    </main>
  );
}

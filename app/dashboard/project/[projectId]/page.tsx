import Sidebar from "./components/Sidebar";
import FeatureBoard from "./components/FeatureBoard";
import { getProjectById } from "@/lib/actions/projects";
import { getFeatureRequests } from "@/lib/actions/featureRequests";
import { notFound } from "next/navigation";
import ProjectTabList from "./components/ProjectTabList";

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
    <main className="flex flex-col w-full h-full font-sans relative">
      <div className="flex items-center justify-center px-2 w-full bg-base-100 dark:bg-neutral border border-gray-200 border-b-transparent rounded-md rounded-b-none py-2">
        <ProjectTabList />
      </div>
      <div className="flex flex-row w-full h-full columns-2 font-sans relative">
        <div className="w-1/5 h-full">
          <Sidebar />
        </div>
        <div className="w-4/5 h-full">
          <FeatureBoard featureRequests={featureRequests} project={project} />
        </div>
      </div>
    </main>
  );
}

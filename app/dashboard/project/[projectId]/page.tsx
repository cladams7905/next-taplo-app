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
    <main className="flex flex-col w-full h-full font-sans relative"></main>
  );
}

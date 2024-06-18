import { getProjectById } from "@/lib/actions/projects";
import { getFeatureRequests } from "@/lib/actions/featureRequests";
import { notFound } from "next/navigation";

export default async function CreatePopupPage({
  params,
}: {
  params: { projectId: number };
}) {
  const featureRequests = (await getFeatureRequests(params.projectId)).data;
  const project = (await getProjectById(params.projectId)).data;

  if (!project) {
    return notFound();
  }

  return <>Connect</>;
}

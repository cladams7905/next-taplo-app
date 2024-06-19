import { getProjectById } from "@/lib/actions/projects";
import { getUserToasts } from "@/lib/actions/userToasts";
import { notFound } from "next/navigation";

export default async function CreatePopupPage({
  params,
}: {
  params: { projectId: number };
}) {
  const userToasts = (await getUserToasts(params.projectId)).data;
  const project = (await getProjectById(params.projectId)).data;

  if (!project) {
    return notFound();
  }

  return <>Share</>;
}

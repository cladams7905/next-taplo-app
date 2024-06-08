import FeatureRequests from "./components/FeatureRequests";
import { Suspense } from "react";
import Skeleton from "./components/Skeleton";
import Await from "@/components/shared/await";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { revalidatePath } from "next/cache";
import { getProjectById } from "@/lib/actions/projects";
import { getFeatureRequests } from "@/lib/actions/featureRequests";

export default function DashboardHome({
  params,
}: {
  params: { projectId: number };
}) {
  revalidatePath(`/dashboard/project/${params.projectId}`);
  const featureRequestData = getFeatureRequests(params.projectId);
  const projectData = getProjectById(params.projectId);

  return (
    <main className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 h-full">
        <div className="flex flex-col flex-wrap h-full bg-base-100 border border-gray-200 rounded-md px-12 py-6 gap-5">
          <Suspense fallback={<Skeleton />}>
            <Await promise={projectData}>
              {({ data }) => <Header project={data} />}
            </Await>
            <hr></hr>
            <Await promise={featureRequestData}>
              {({ data }) => <FeatureRequests featureRequests={data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

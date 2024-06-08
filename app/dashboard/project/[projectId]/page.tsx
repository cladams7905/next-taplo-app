import { ChevronUpSquare, Ellipsis, SquareArrowOutUpRight } from "lucide-react";
import FeatureRequests from "./components/FeatureRequests";
import { getFeatureRequests } from "./actions";
import { Suspense } from "react";
import RequestSkeletion from "./components/RequestSkeletion";
import Await from "@/components/shared/await";
import { revalidatePath } from "next/cache";

export default async function DashboardHome({
  params,
}: {
  params: { projectId: number };
}) {
  revalidatePath(`/dasboard/projects/${params.projectId}`);
  const promise = getFeatureRequests(params.projectId);
  return (
    <main className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="w-1/5">
        <div className="flex flex-col w-full bg-base-100 rounded-md p-4 gap-6 border border-gray-200">
          <div className="stat-title text-gray-500">Project Activity</div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            New feature requests (3)
            <SquareArrowOutUpRight height={16} width={16} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full">
              <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 bg-gray-100 rounded-md">
                Change someth...
                <div className="flex gap-2 items-center">
                  42 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 bg-gray-100 rounded-md">
                Make this easier...
                <div className="flex gap-2 items-center">
                  36 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 bg-gray-100 rounded-md">
                Redo the home...
                <div className="flex gap-2 items-center">
                  29 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap w-4/5 bg-base-100 border border-gray-200 rounded-md px-12 py-6 gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-5 items-center">
            <p className="text-2xl">Feature Dashboard</p>
            <Ellipsis />
          </div>
          <select
            defaultValue={"Sort by"}
            className="select select-bordered select-sm w-full max-w-44"
          >
            <option>Alphabetical order</option>
            <option>Date submitted</option>
            <option>Importance</option>
            <option>Status</option>
            <option>Type</option>
          </select>
        </div>
        <hr></hr>
        <Suspense fallback={<RequestSkeletion />}>
          <Await promise={promise}>
            {({ data }) => <FeatureRequests featureRequests={data} />}
          </Await>
        </Suspense>
      </div>
    </main>
  );
}

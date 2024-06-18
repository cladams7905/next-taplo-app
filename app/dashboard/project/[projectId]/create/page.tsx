import { getProjectById } from "@/lib/actions/projects";
import { getFeatureRequests } from "@/lib/actions/featureRequests";
import { notFound } from "next/navigation";
import Image from "next/image";
import ToastImg from "@/public/images/toaster1.jpeg";
import ToastImg2 from "@/public/images/toaster2.jpeg";
import { CirclePlus, Search } from "lucide-react";

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

  return (
    <main className="flex columns-2 lg:px-48 py-4 w-full h-screen-minus-navbar">
      <div className="flex flex-col justify-between bg-white border-r-transparent rounded-r-none w-1/4 rounded-lg h-full p-4 border border-neutral">
        <div>
          <div className="btn btn-primary border border-neutral w-full">
            <CirclePlus height={18} width={18} />
            New Toast
          </div>
          <div className="mt-4">
            <div className="text-sm ml-2 font-semibold">My Toasts (0)</div>
            <ul className="mt-2 max-h-32 overflow-y-scroll"></ul>
          </div>
        </div>
        <div>
          <hr className="my-2 border-t border-neutral"></hr>
          <label className="input input-sm flex items-center">
            <Search
              strokeWidth={2}
              color="oklch(var(--n))"
              height={16}
              width={16}
            />
            <input
              type="text"
              className="grow w-5 ml-4"
              placeholder="Search Toasts..."
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-l-none bg-accent-light w-3/4 rounded-lg h-full p-4 border border-neutral">
        <Image
          className="rounded-3xl max-h-[300px] mt-12"
          width={300}
          alt="toast"
          src={ToastImg2}
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          {" "}
          <div className="font-bold text-2xl">
            You haven&apos;t made any toasts yet.
          </div>
          <div className="flex flex-row items-center gap-2">
            Click{" "}
            <span>
              <CirclePlus height={20} width={20} />
            </span>{" "}
            to create a new one!
          </div>
        </div>
      </div>
    </main>
  );
}

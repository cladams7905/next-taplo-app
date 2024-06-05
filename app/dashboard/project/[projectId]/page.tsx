import { CirclePlus, SquareArrowOutUpRight } from "lucide-react";

export default function DashboardHome() {
  return (
    <main className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="w-1/5">
        <div className="flex flex-col w-full gap-4 bg-base-100 border border-gray-200 rounded-md mb-3 p-4">
          <div className="btn btn-primary w-full">
            {" "}
            <CirclePlus height={18} width={18} />
            Create a new Tapform
          </div>
        </div>
        <div className="flex flex-col w-full bg-base-100 border border-gray-200 rounded-md p-4 gap-6">
          <div className="flex flex-row justify-between items-center">
            <div className="stat-title text-gray-500">Project Insights</div>
            <div className="link link-hover text-sm flex items-center gap-2">
              View all
              <SquareArrowOutUpRight height={12} width={12} />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="text-sm flex flex-row">
              <select className="select select-bordered select-sm mb-2 w-full">
                <option>Responses in the last 24 hours</option>
                <option>Responses in the last week</option>
                <option>Responses in the last month</option>
              </select>
            </div>
            <div className="text-3xl">0</div>
          </div>
          <div className="flex items-center flex-col">
            <div className="text-sm mb-2">Tapform completion rate:</div>
            <div className="text-3xl">0%</div>
          </div>
          <hr />
          <div className="text-sm">Responses collected:</div>
          <div className="flex flex-col items-center gap-2">
            <progress
              className="progress progress-primary w-fill"
              value="10"
              max="100"
            ></progress>
            <div className="text-3xl">0/10</div>
            <div className="text-sm text-gray-500">Renews July 3rd</div>
          </div>
          <div className="btn btn-neutral btn-sm w-full">
            Increase response limit
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-wrap w-4/5 bg-base-100 border border-gray-200 rounded-md px-12 py-6 gap-5">
        <p className="text-2xl">Project Workspace</p>
        <hr></hr>
        <div className="flex w-full columns-5">
          <div className="w-1/2 text-sm text-gray-500">
            <p>Name</p>
          </div>
          <div className="w-[16.67%] text-sm text-gray-500">
            <p>Type</p>
          </div>
          <div className="w-[16.67%] text-sm text-gray-500">
            <p>Responses</p>
          </div>
          <div className="w-[16.67%] text-sm text-gray-500">
            <p>Completion</p>
          </div>
          <div className="w-[16.67%] text-sm text-gray-500">
            <p>Last updated</p>
          </div>
        </div>
        <div className="flex flex-col overflow-y-scroll gap-3">
          <div className="flex items-center bg-gray-200 rounded-md px-6 py-4">
            <div className="flex w-full columns-5">
              <div className="flex items-center gap-4 w-[42.5%] text-sm text-gray-500">
                <p>Form Title</p>
                <div className="badge badge-neutral badge-outline p-3">
                  Draft
                </div>
              </div>
              <div className="w-[18%] text-sm text-gray-500">Review</div>
              <div className="w-[16%] text-sm text-gray-500">0</div>
              <div className="w-[12%] text-sm text-gray-500">0%</div>
              <div className="w-[12%] text-sm text-gray-500">Today</div>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 rounded-md px-6 py-4">
            <div className="flex w-full columns-5">
              <div className="flex items-center gap-4 w-[42.5%] text-sm text-gray-500">
                <p>Form Title</p>
                <div className="badge badge-neutral badge-outline p-3">
                  Draft
                </div>
              </div>
              <div className="w-[18%] text-sm text-gray-500">Review</div>
              <div className="w-[16%] text-sm text-gray-500">0</div>
              <div className="w-[12%] text-sm text-gray-500">0%</div>
              <div className="w-[12%] text-sm text-gray-500">Today</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

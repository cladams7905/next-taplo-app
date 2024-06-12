import { ChevronUpSquare, SquareArrowOutUpRight } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full bg-base-100 rounded-md p-4 gap-6 border border-gray-200">
      <div className="stat-title text-gray-500">Project Activity</div>
      <hr />
      <div className="flex flex-row items-center justify-between">
        New feature requests (3)
        <SquareArrowOutUpRight height={16} width={16} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row w-full">
          <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 border-b border-gray-200">
            Change someth...
            <div className="flex gap-2 items-center">
              42 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 border-b border-gray-200">
            Make this easier...
            <div className="flex gap-2 items-center">
              36 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-row items-center justify-between w-full text-sm px-4 py-2 border-b border-gray-200">
            Redo the home...
            <div className="flex gap-2 items-center">
              29 <ChevronUpSquare width={20} height={20} strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Tables } from "@/lib/supabase/types";
import { Ellipsis } from "lucide-react";

export default function Header({ project }: { project: Tables<"Projects"> }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex gap-3 items-center">
        <p className="text-2xl">{`${project.project_name} - Dashboard`}</p>
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
  );
}

"use client";

import { useState } from "react";
import Header from "./Header";
import FeatureRequests from "./FeatureRequests";
import { SortType } from "@/lib/enums";
import { Tables } from "@/lib/supabase/types";

export default function FeatureBoard({
  featureRequests,
  project,
}: {
  featureRequests: Tables<"FeatureRequests">[];
  project: Tables<"Projects">;
}) {
  const [sortType, setSortType] = useState<SortType>(SortType.dateSubmitted);

  return (
    <div className="flex flex-col flex-wrap h-full bg-base-100 border border-gray-200 rounded-md px-12 py-6 gap-5">
      <Header project={project} sortType={sortType} setSortType={setSortType} />
      <hr></hr>
      <FeatureRequests featureRequests={featureRequests} sortType={sortType} />
    </div>
  );
}

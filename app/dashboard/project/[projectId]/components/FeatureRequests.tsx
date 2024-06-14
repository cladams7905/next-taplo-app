"use client";

import {
  ChevronUp,
  ChevronUpSquare,
  EllipsisVertical,
  MessageSquare,
} from "lucide-react";
import { Enums, Tables } from "@/lib/supabase/types";
import { convertDateTime } from "@/lib/actions";
import { SortType } from "@/lib/enums";
import { FilterBuilder } from "@/lib/types";

export default function FeatureRequests({
  featureRequests,
  sortType,
  filterBuilder,
}: {
  featureRequests: Tables<"FeatureRequests">[];
  sortType: SortType;
  filterBuilder: FilterBuilder;
}) {
  const filteredRequests = filterRequests(featureRequests, filterBuilder);
  const sortedRequests = sortRequests(filteredRequests, sortType);
  const numComments = 0;
  return (
    <>
      {featureRequests.length > 0 ? (
        <>
          <div className="flex items-start w-full columns-3 px-6">
            <div className="w-[15%]"></div>
            <div className="w-[40%] text-sm font-semibold text-base-content">
              <p>Feature</p>
            </div>
            <div className="w-[18%] text-sm font-semibold text-base-content">
              <p>Submitted</p>
            </div>
            <div className="w-[15%] text-sm font-semibold text-base-content">
              <p>Type</p>
            </div>
            <div className=" text-sm font-semibold text-base-content">
              <p>Priority</p>
            </div>
          </div>
          <div className="flex flex-col overflow-y-scroll gap-3">
            {sortedRequests
              .map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center bg-gray-50 border border-gray-200 dark:border-gray-600 rounded-md px-6 py-2 min-h-14 hover:bg-gray-100 transition-all duration-150 ease-in-out"
                >
                  <div className="flex w-full columns-5">
                    <div className="flex w-[15%] items-center">
                      <div className="flex items-center gap-2 hover:rounded-md text-md text-base-content">
                        <div className="flex flex-col items-center justify-center">
                          <ChevronUpSquare
                            width={20}
                            height={20}
                            strokeWidth={1}
                          />
                          {feature.upvotes ? feature.upvotes : 0}
                        </div>
                        {numComments > 0 && (
                          <div className="flex flex-col items-center justify-center">
                            <MessageSquare
                              width={20}
                              height={20}
                              strokeWidth={1}
                            />
                            0
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 w-[40%] text-sm">
                      <p className="font-semibold text-base-content">
                        {feature.title}
                      </p>
                      <p className="text-gray-500">{feature.description}</p>
                    </div>
                    <div className="w-[18%] flex items-center text-sm text-gray-500">
                      {convertDateTime(feature.created_at)}
                    </div>
                    <div className="w-[15%] flex items-center text-sm text-gray-500">
                      {feature.type}
                    </div>
                    <div className="flex items-center justify-center ml-4">
                      {feature.importance === "Low" && (
                        <div className="flex flex-row gap-1 items-end">
                          <div className="w-1 h-2 bg-primary rounded-md"></div>
                          <div className="w-1 h-3 bg-gray-300 rounded-md"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                      )}
                      {feature.importance === "Moderate" && (
                        <div className="flex flex-row gap-1 items-end">
                          <div className="w-1 h-2 bg-warning rounded-md"></div>
                          <div className="w-1 h-3 bg-warning rounded-md"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                      )}
                      {feature.importance === "High" && (
                        <div className="flex flex-row gap-1 items-end">
                          <div className="w-1 h-2 bg-accent rounded-md"></div>
                          <div className="w-1 h-3 bg-accent rounded-md"></div>
                          <div className="w-1 h-4 bg-accent rounded-md"></div>
                        </div>
                      )}
                    </div>
                    <div className="w-[8.5%] flex items-center justify-end">
                      <EllipsisVertical />
                    </div>
                  </div>
                </div>
              ))
              .sort()}
          </div>
        </>
      ) : (
        <div className="flex items-center text-wrap text-lg stat-title mt-6">
          There are currently no feature requests for this project.
        </div>
      )}
    </>
  );
}

const sortRequests = (
  featureRequests: Tables<"FeatureRequests">[],
  sortType: SortType
) => {
  let sortedRequests;
  switch (sortType) {
    case SortType.dateSubmitted:
      sortedRequests = featureRequests.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case SortType.alphabetical:
      sortedRequests = featureRequests.sort((a, b) =>
        a.title != null && b.title != null
          ? a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          : 0
      );
      break;
    case SortType.upvotes:
      sortedRequests = featureRequests.sort((a, b) =>
        a.upvotes != null && b.upvotes != null ? b.upvotes - a.upvotes : 0
      );
      break;
  }
  return sortedRequests;
};

const filterRequests = (
  featureRequests: Tables<"FeatureRequests">[],
  filterBuilder: FilterBuilder
) => {
  let filteredRequests = featureRequests;

  filterBuilder.importanceFilter.forEach((filter) => {
    filteredRequests = filteredRequests.filter(
      (request) => request.importance !== filter
    );
  });
  filterBuilder.statusFilter.forEach((filter) => {
    filteredRequests = filteredRequests.filter(
      (request) => request.status !== filter
    );
  });
  filterBuilder.typeFilter.forEach((filter) => {
    filteredRequests = filteredRequests.filter(
      (request) => request.type !== filter
    );
  });

  return filteredRequests;
};

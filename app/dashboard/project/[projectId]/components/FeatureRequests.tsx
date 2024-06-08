import { ChevronUpSquare, EllipsisVertical, MessageSquare } from "lucide-react";
import { Tables } from "@/utils/supabase/types";
import { convertDateTime } from "@/utils/actions";

export default function FeatureRequests({
  featureRequests,
}: {
  featureRequests: Tables<"FeatureRequests">[];
}) {
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
              <p>Importance</p>
            </div>
          </div>
          <div className="flex flex-col overflow-y-scroll gap-3">
            {featureRequests.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center bg-gray-100 rounded-md px-6 py-4 min-h-14 hover:bg-gray-200 transition-all duration-150 ease-in-out"
              >
                <div className="flex w-full columns-5">
                  <div className="flex w-[15%] items-center">
                    <div className="flex items-center gap-2 rounded-md text-md font-semibold text-base-content">
                      <div className="flex flex-col items-center justify-center">
                        <ChevronUpSquare
                          width={20}
                          height={20}
                          strokeWidth={1.5}
                        />
                        {feature.upvotes}
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <MessageSquare
                          width={20}
                          height={20}
                          strokeWidth={1.5}
                        />
                        0
                      </div>
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
                  <div className="flex items-center justify-center">
                    <div className="flex flex-row gap-1 items-end">
                      <div className="w-2 h-3 bg-error rounded-md"></div>
                      <div className="w-2 h-4 bg-error rounded-md"></div>
                      <div className="w-2 h-5 bg-error rounded-md"></div>
                    </div>
                  </div>
                  <div className="w-[8.5%] flex items-center justify-end">
                    <EllipsisVertical />
                  </div>
                </div>
              </div>
            ))}
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

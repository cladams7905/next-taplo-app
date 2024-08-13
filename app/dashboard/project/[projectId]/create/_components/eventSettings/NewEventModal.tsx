"use client";

import {
  EyeIcon,
  Search,
  ShoppingBasket,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { RefObject, useTransition } from "react";

export default function NewEventModal({
  eventModalRef,
}: {
  eventModalRef: RefObject<HTMLDialogElement>;
}) {
  const [isLoading, startLoadingTransition] = useTransition();
  return (
    <dialog className="modal" ref={eventModalRef}>
      <div className="modal-box !py-0 max-w-screen-md text-base-content dark:border dark:border-gray-600">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col w-full pt-8 sticky top-0 bg-white">
            <form method="dialog" className="modal-backdrop">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute -right-2 top-2 text-base-content !outline-none"
                onClick={() => {
                  eventModalRef?.current?.close();
                }}
              >
                ✕
              </button>
            </form>
            <h3 className="font-semibold text-lg">Select Event Type</h3>
            {isLoading && (
              <span className="loading loading-spinner loading-sm bg-base-content"></span>
            )}
            <label className="input input-bordered flex items-center mt-6 mb-4">
              <Search
                strokeWidth={2}
                color="oklch(var(--bc))"
                height={16}
                width={16}
              />
              <input
                type="text"
                className="grow w-5 ml-4 !border-none"
                placeholder="Search by integration, event type..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-row flex-wrap gap-2 w-full overflow-y-scroll p-1 py-3">
            <div className="flex flex-row border border-gray-300 shadow-sm rounded-lg w-full lg:max-w-[352px] md:max-w-[352px] mb-1 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-center w-16 min-w-16 bg-purchase-event/30 h-full border-r border-gray-300">
                <ShoppingBasket color="#3eb981" />
              </div>
              <div className="flex flex-col py-4 px-2 gap-2">
                <div className="font-bold text-sm">Purchase</div>
                <div className="text-xs">Integrations: Stripe</div>
                <div className="text-xs text-wrap text-gray-400">
                  Displays popup whenever a user makes a purchase or creates a
                  checkout session.
                </div>
              </div>
            </div>
            <div className="flex flex-row border border-gray-300 shadow-sm rounded-lg w-full lg:max-w-[352px] md:max-w-[352px] mb-1 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-center w-16 min-w-16 bg-purchase-event/30 h-full border-r border-gray-300">
                <ShoppingCart color="#3eb981" />
              </div>
              <div className="flex flex-col py-4 px-2 gap-2">
                <div className="font-bold text-sm">Add to Cart</div>
                <div className="text-xs">Integrations: Stripe</div>
                <div className="text-xs text-wrap text-gray-400">
                  Displays popup whenever a user adds a product to cart.
                </div>
              </div>
            </div>
            <div className="flex flex-row border border-gray-300 shadow-sm rounded-lg w-full lg:max-w-[352px] md:max-w-[352px] mb-1 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-center w-16 min-w-16 h-full border-r bg-primary/30 border-gray-300">
                <EyeIcon color="#7A81EB" />
              </div>
              <div className="flex flex-col py-4 px-2 gap-2">
                <div className="font-bold text-sm">Someone is Viewing</div>
                <div className="text-xs">Integrations: Stripe</div>
                <div className="text-xs text-wrap text-gray-400">
                  Shows what products users are curently viewing.
                </div>
              </div>
            </div>
            <div className="flex flex-row border border-gray-300 shadow-sm rounded-lg w-full lg:max-w-[352px] md:max-w-[352px] mb-1 cursor-pointer hover:outline hover:outline-[3px] hover:outline-primary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-center w-16 min-w-16 h-full border-r bg-primary/30 border-gray-300">
                <UsersRound color="#7A81EB" />
              </div>
              <div className="flex flex-col py-4 px-2 gap-2">
                <div className="font-bold text-sm">Active Users</div>
                <div className="text-xs">Integrations: Google Analytics</div>
                <div className="text-xs text-wrap text-gray-400">
                  Display the current number of active users on your site.
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-t border-gray-300 sticky bottom-0 bg-white pb-6 mt-2">
            <div className="flex items-center rounded-lg bg-white px-8 -mt-[10px] text-sm text-gray-500">
              or
            </div>
            <div className="btn btn-ghost mt-2">Create your own</div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

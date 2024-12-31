"use client";

export default function LaunchOfferBadge() {
  return (
    <div className="px-2 md:text-md text-sm w-full text-center inline-block bg-accent text-white justify-center items-center lg:px-4 py-1 font-sans">
      <span className="mx-1 font-semibold">🚀 Launch offer:</span>
      <span className="text-pink-200 mx-1">50% off Pro Plan</span>
      for the next
      <span className="text-pink-200 mx-1">50</span>customers.
    </div>
  );
}

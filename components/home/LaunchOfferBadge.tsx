"use client";

export default function LaunchOfferBadge() {
  return (
    <div className="lg:text-lg md:text-md sm:text-sm w-fit text-xs px-2 lg:text-left text-center rounded-xl lg:px-4 py-1 bg-gradient-to-tr from-purple-100 via-white to-cyan-50 shadow-md font-sans">
      <span className="font-bold mx-1">🚀 Launch offer:</span>
      <span className="font-bold text-primary mx-1">50% off Pro</span>for the
      next
      <span className="font-bold text-primary mx-1">75</span>customers.
    </div>
  );
}

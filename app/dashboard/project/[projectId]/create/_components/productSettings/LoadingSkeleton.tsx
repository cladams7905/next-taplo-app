"use client";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-row w-full items-center mt-4 mb-4">
      <div className="flex w-fit items-center">
        <div className="skeleton bg-primary/20 mr-3 items-center min-w-[48px] max-h-[48px] aspect-square rounded-lg"></div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="skeleton rounded-lg h-6 w-full bg-primary/20" />
        <div className="skeleton rounded-lg h-6 w-[80%] bg-primary/20" />
      </div>
    </div>
  );
}

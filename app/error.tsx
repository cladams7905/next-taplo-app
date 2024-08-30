"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-tr from-primary/50 to-violet-100 items-center justify-center gap-10 font-sans">
      <div className="text-4xl font-bold">
        Whoops! (
        {`${error.name === "Error" ? "Client-Side Error" : error.name}`})
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        {" "}
        <h2 className="text-2xl">
          We ran into a snag. Please contact us at help@taplo.io to resolve this
          issue.
        </h2>
        <div className="text-gray-500 max-w-lg">{error.message}</div>
      </div>
      <div
        className="btn btn-primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Reloading
      </div>
    </div>
  );
}

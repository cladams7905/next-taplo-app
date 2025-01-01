"use client"; // Error components must be Client Components

import Link from "next/link";
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
    <div className="flex flex-col w-full h-screen bg-slate-50 items-center justify-center gap-10 font-sans">
      <div className="text-4xl font-bold">
        Whoops! (
        {`${error.name === "Error" ? "Client-Side Error" : error.name}`})
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        {" "}
        <div className="text-2xl">
          We ran into a snag. Please contact us at{" "}
          <Link
            href={`mailto:help@taplo.io?subject=Client%20side%20error:%20${error.name}`}
            target="_blank"
            className="link link-primary"
          >
            help@taplo.io
          </Link>{" "}
          to resolve this issue.
        </div>
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

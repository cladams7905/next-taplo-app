import Link from "next/link";
import React from "react";

export default function DocsHome() {
  return (
    <>
      <div className="text-3xl text-center font-bold font-logo">
        Welcome to the Taplo Docs!
      </div>
      <div className="flex w-full justify-center lg:px-28 md:px-16">
        <div className="flex flex-col my-6 join join-vertical shadow-md w-full">
          <Link href="/docs/getting-started">
            <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
              <p className="text-lg font-semibold">Getting Started</p>
              <p>Learn how to get started with Taplo</p>
            </div>
          </Link>
          <Link href="docs/integrations">
            <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
              <p className="text-lg font-semibold">Add an Integration</p>
              <p>Learn how to connect other services to your Taplo project</p>
            </div>
          </Link>
          <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">API Reference</p>
              <div className="badge badge-primary bg-primary/20 border-none text-primary">
                Coming soon!
              </div>
            </div>
            <p>Learn how to use the Taplo API</p>
          </div>
          <Link href="/docs/faqs">
            <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
              <p className="text-lg font-semibold">FAQs</p>
              <p>Get answers to common questions</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center md:px-24">
        Have unanswered questions? Reach out to me at{" "}
        <Link
          href={`mailto:help@taplo.io?subject=Business%20inquiry`}
          target="_blank"
          className="link link-primary"
        >
          help@taplo.io
        </Link>
        .
      </div>
    </>
  );
}

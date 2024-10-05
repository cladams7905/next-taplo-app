import Link from "next/link";
import React from "react";

export default function DocsHome() {
  return (
    <>
      <div className="text-3xl text-center font-bold font-logo">
        Welcome to the Taplo Docs!
      </div>
      <div className="flex flex-col my-6 join join-vertical shadow-md">
        <Link href="/docs/getting-started">
          <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
            <p className="text-lg font-bold">Getting Started</p>
            <p>Learn how to get started with Taplo</p>
          </div>
        </Link>
        <Link href="docs/integrations">
          <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
            <p className="text-lg font-bold">Add an Integration</p>
            <p>Learn how to connect other services to your Taplo project</p>
          </div>
        </Link>
        <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">API Reference</p>
            <div className="badge badge-primary bg-primary/20 border-none text-primary">
              Coming soon!
            </div>
          </div>
          <p>Learn how to use the Taplo API</p>
        </div>
        <Link href="/docs/faqs">
          <div className="flex flex-col join-item gap-3 text-sm border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 cursor-pointer">
            <p className="text-lg font-bold">FAQs</p>
            <p>Get answers to common questions</p>
          </div>
        </Link>
      </div>
      <div className="text-center md:px-24">
        <p>
          Have unanswered questions? Reach out to me at{" "}
          <span className="underline">help@taplo.io</span>.
        </p>
      </div>
    </>
  );
}

/**
 * Returns a description of the setup process for the selected provider
 */
// const getProviderDescription = (provider: ProvidersEnum) => {
//   switch (provider) {
//     case Providers.Stripe:
//       return (
//         <div className="flex flex-col gap-2">
//           <p className="text-sm font-bold">For connecting to Stripe:</p>
//           <ol className="list-decimal list-inside flex flex-col gap-2 max-h-28 overflow-y-scroll text-sm text-gray-500">
//             <li>Create a new Stripe Restricted API key.</li>
//             <li>
//               View Taplo event details to know what permissions to enable (for
//               example, the &quot;Recent Purchases&quot; event requires access to
//               Stripe charges data).
//             </li>
//             <li>Paste your restricted API key below.</li>
//           </ol>
//         </div>
//       );
//     case Providers.GoogleAnalytics:
//       return (
//         <div className="flex flex-col">
//           <p className="text-sm font-bold mb-3">
//             For connecting to Google Analytics:
//           </p>
//           <ol className="list-decimal list-inside flex flex-col gap-2 max-h-32 overflow-y-scroll text-sm text-gray-500">
//             <li>Create or access your project in the Google Cloud Console.</li>
//             <li>
//               Make sure the Google Analytics Data API is enabled for your
//               project.
//             </li>
//             <li>
//               Click &quot;Create Credentials&quot; and select &quot;API
//               key&quot;.
//             </li>
//             <li>
//               (Recommended) Under &quot;Website restrictions&quot;, add
//               restricted access to https://www.taplo.io. Under &quot;API
//               restrictions&quot;, restrict the API key to only being able to
//               access the Google Analytics Data API.
//             </li>
//             <li>Paste your new API Key below.</li>
//           </ol>
//         </div>
//       );
//     default:
//       return null;
//   }
// };

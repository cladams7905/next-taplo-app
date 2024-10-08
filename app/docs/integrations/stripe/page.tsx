import React from "react";

export default function StripeDocs() {
  return (
    <div className="font-sans lg:px-48 md:px-24 flex flex-col gap-6">
      <div className="w-full mb-10 flex flex-col items-center gap-4">
        <p className="text-3xl font-semibold text-center">Setting up Stripe</p>
        <p className="text-gray-500 italic text-center">
          Learn how to add a Stripe integation to your Taplo project.
        </p>
      </div>
      <ol className="list-decimal list-inside flex flex-col gap-10">
        <li>
          In your Stripe dashboard, go to the &quot;Developers&quot; tab and
          click on{" "}
          <span className="font-bold">
            Restricted Keys → Create Restricted Key
          </span>
          .
        </li>
        <li>
          Select the option{" "}
          <span className="font-bold">
            Providing this key to another website
          </span>
          .
        </li>
        <li>
          Under the &quot;Enter website details&quot; section, enter Taplo as
          the name and the URL as https://www.taplo.io. Make sure to check the
          box{" "}
          <span className="font-bold">Customize permissions for this key</span>.
        </li>
        <li>
          Ensure the following permissions are enabled based on the Stripe
          events you have in your project:{" "}
        </li>
        <table className="table-auto border-collapse w-full rounded-lg">
          <thead>
            <tr>
              <th className="border px-4 py-2">Event Name</th>
              <th className="border px-4 py-2">Required Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Recent Purchases</td>
              <td className="border px-4 py-2">
                Charges set to &quot;read&quot;
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Checkout sessions</td>
              <td className="border px-4 py-2">
                Checkout Sessions set to &quot;read&quot;
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Access to Stripe products</td>
              <td className="border px-4 py-2">
                Products set to &quot;write&quot;
              </td>
            </tr>
          </tbody>
        </table>
        <li>
          <span className="font-bold">Important: </span> if you wish to create
          products in Taplo via Stripe, make sure to enable the
          &quot;write&quot; permissions for Products on your API key.
        </li>
        <li>
          Click <span className="font-bold">Create Key</span> and paste the new
          key in Taplo under the &quot;Secret API Key&quot; field in the new
          integration form.
        </li>
        <li>Save your changes and test the integration.</li>
      </ol>
      <div className="mb-8"></div>
    </div>
  );
}

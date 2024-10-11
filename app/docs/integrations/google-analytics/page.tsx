import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateServiceAccount from "@/public/images/docs/CreateServiceAccount.png";
import ManageKeys from "@/public/images/docs/ManageKeys.png";
import CreateKey from "@/public/images/docs/CreateKey.png";
import UploadCredentials from "@/public/images/docs/UploadCredentials.png";
import PropertyDetails from "@/public/images/docs/PropertyDetails.png";
import UserManagement from "@/public/images/docs/UserManagement.png";

export default function GADocs() {
  return (
    <div className="font-sans lg:px-48 md:px-24 flex flex-col gap-6">
      <div className="w-full mb-10 flex flex-col items-center gap-4">
        <p className="text-3xl font-semibold text-center">
          Setting up Google Analytics
        </p>
        <p className="text-gray-500 italic text-center">
          Learn how to add a Google Analytics integation to your Taplo project.
        </p>
      </div>
      <ol className="list-decimal list-inside flex flex-col gap-10">
        <li>
          Go to your{" "}
          <Link
            href={"https://console.cloud.google.com/"}
            target="_blank"
            className="link link-primary"
          >
            Google Cloud Console
          </Link>{" "}
          and access your project, or{" "}
          <Link
            href={
              "https://developers.google.com/workspace/guides/create-project"
            }
            target="_blank"
            className="link link-primary"
          >
            create a new project
          </Link>{" "}
          if you don&apos;t have one already.
        </li>
        <li>
          Create a new service account to allow Taplo to access your Google
          Analytics Data by clicking{" "}
          <span className="font-bold">
            Credentials → Create Credentials → Service Account
          </span>
          . Add an account name of your choice. The other fields are optional,
          so you can skip them and click <span className="font-bold">Done</span>
          .
        </li>
        <div className="flex w-full justify-center">
          <Image
            src={CreateServiceAccount}
            alt="create-service-account"
            width={500}
            height={600}
          />
        </div>
        <li>
          Now that your service account has been created, click on the &quot;
          <EllipsisVertical width={20} height={20} className="inline-block" />
          &quot; under the &quot;Actions&quot; section and select{" "}
          <span className="font-bold">Manage keys</span>.
        </li>
        <div className="flex w-full justify-center">
          <Image src={ManageKeys} alt="manage-keys" width={500} height={600} />
        </div>
        <li>
          Click on <span className="font-bold">Add key</span> and select{" "}
          <span className="font-bold">Create new key</span>. Set the &quot;Key
          type&quot; as JSON and click <span className="font-bold">Create</span>
          .
        </li>
        <div className="flex w-full justify-center">
          <Image src={CreateKey} alt="create-key" width={500} height={600} />
        </div>
        <li>
          A private key is now created and saved to your computer. Take the
          newly-created .json file and upload it in Taplo&apos;s new integration
          form by clicking the <span className="font-bold">Upload</span> button.
          The required fields will auto-populate with your new API key data.
        </li>
        <div className="flex w-full justify-center">
          <Image
            src={UploadCredentials}
            alt="create-key"
            width={500}
            height={600}
          />
        </div>
        <li>
          Visit your{" "}
          <Link
            href={"https://analytics.google.com/"}
            target="_blank"
            className="link link-primary"
          >
            Google Analytics
          </Link>{" "}
          dashboard and go to{" "}
          <span className="font-bold">Admin → Property → Property Details</span>
          . Copy your property ID from the top right corner of this page and
          paste it into the &quot;Property ID&quot; field in your Taplo form.
        </li>
        <div className="flex w-full justify-center">
          <Image
            src={PropertyDetails}
            alt="property-details"
            width={500}
            height={600}
          />
        </div>
        <li>
          On the{" "}
          <span className="font-bold">
            Admin → Property → Property Access Management
          </span>{" "}
          page, enable the service account you created in the previous steps to
          have access to your Google Analytics data by clicking &quot;+&quot; in
          the top-right corner and selecting{" "}
          <span className="font-bold">Add users</span>. Enter the service
          account&apos;s email address and give it the role of{" "}
          <span className="font-bold">Viewer</span>.
        </li>
        <div className="flex w-full justify-center">
          <Image
            src={UserManagement}
            alt="user-management"
            width={500}
            height={600}
          />
        </div>
        <li>
          In your Taplo form, click{" "}
          <span className="font-bold">Create New Integration</span>. Make sure
          to select your newly-created integration in your notification events
          from the &quot;Create&quot; page!
        </li>
      </ol>
      <div className="mb-8"></div>
    </div>
  );
}

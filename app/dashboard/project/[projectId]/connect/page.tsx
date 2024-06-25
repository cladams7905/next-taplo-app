import { getProjectById } from "@/lib/actions/projects";
import { getWebhooks } from "@/lib/actions/webhooks";
import { CirclePlus, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import WebhooksList from "./components/WebhooksList";

export default async function ConnectPage({
  params,
}: {
  params: { projectId: number };
}) {
  const project = (await getProjectById(params.projectId)).data;
  const webhooks = (await getWebhooks(params.projectId)).data;

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <div className="h-full lg:w-2/3 w-3/4 bg-white border border-neutral border-t-0 p-4 flex shadow-md">
        <div className="flex flex-col gap-4 h-full w-1/3 p-4 pr-6 border-r border-neutral">
          <div className="btn btn-primary text-white w-full">
            <CirclePlus height={20} width={20} />
            New Webhook
          </div>
          <p>What is a webhook?</p>
          <p className="text-sm text-gray-500">
            Webhooks are used to "listen" to different services and notify you
            when an event occurs.
          </p>
          <p className="text-sm text-gray-500">
            Webhooks are how your toasts know when to display! You can learn
            more about them{" "}
            <span>
              <a
                href={"https://zapier.com/blog/what-are-webhooks/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 link"
              >
                {" "}
                here. <ExternalLink height={14} width={14} />
              </a>
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 h-full w-2/3 p-4 pl-6">
          <p className="text-xl">My Webhooks</p>
          <WebhooksList webhooks={webhooks} />
        </div>
      </div>
    </div>
  );
}

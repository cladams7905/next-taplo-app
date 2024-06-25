import { getWebhooks } from "@/lib/actions/webhooks";
import WebhookBoard from "./components/WebhookBoard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ConnectPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const webhooks = (await getWebhooks(data.user.id)).data;
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <WebhookBoard webhooks={webhooks} />
    </div>
  );
}

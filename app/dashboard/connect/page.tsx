import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import ApiKeyBoard from "./components/IntegrationBoard";
import { getIntegrations } from "@/lib/actions/integrations";

export default async function ConnectPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const integrations = (await getIntegrations(data.user.id)).data;
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <ApiKeyBoard integrations={integrations} />
    </div>
  );
}

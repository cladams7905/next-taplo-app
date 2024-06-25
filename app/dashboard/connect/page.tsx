import { getApiKeys } from "@/lib/actions/apiKeys";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import ApiKeyBoard from "./components/ApiKeyBoard";

export default async function ConnectPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  const apiKeys = (await getApiKeys(data.user.id)).data;
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-tr from-primary/50 to-violet-100 h-screen-minus-navbar w-full lg:px-12">
      <ApiKeyBoard apiKeys={apiKeys} />
    </div>
  );
}

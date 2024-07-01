import { getUserToasts } from "@/lib/actions/userToasts";
import ToastBoard from "./components/ToastBoard";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getIntegrations } from "@/lib/actions/integrations";
import { revalidatePath } from "next/cache";
import { getProducts } from "@/lib/actions/products";

export default async function CreatePopupPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  revalidatePath("/dashboard/create", "page");

  const userToasts = (await getUserToasts(data.user.id)).data;
  const integrations = (await getIntegrations(data.user.id)).data;
  const products = (await getProducts(data.user.id)).data;

  return (
    <ToastBoard
      userToasts={userToasts}
      integrations={integrations}
      products={products}
    />
  );
}

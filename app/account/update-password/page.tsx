import UpdatePasswordForm from "../components/UpdatePasswordForm";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function UpdatePassword() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <main className="bg-gradient-to-br from-slate-100 via-white to-cyan-100">
      <div className="navbar fixed lg:px-6 font-sans text-gray-500 ">
        <div className="navbar-start">
          {/* <Logo/> */}
          <div className="ml-2">TapInsight</div>
        </div>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <p className="font-bold text-4xl mb-4">Change password</p>
          <UpdatePasswordForm />
        </div>
      </div>
    </main>
  );
}

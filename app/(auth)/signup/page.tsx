import RegisterForm from "../_components/RegisterForm";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPathname } from "../_actions";
import Logo from "@/public/images/Taplo-logo (2).svg";
import Image from "next/image";
import Link from "next/link";

export default async function Signup() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect(await getRedirectPathname(data.user.id));
  }

  return (
    <main className="bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100">
      <div className="navbar lg:px-20 font-sans">
        <Link href={"/"}>
          <div className="navbar-start ml-8 w-full flex items-center">
            <Image width={36} height={36} alt="logo" src={Logo} />
            <div className="font-bold font-logo text-xl mx-2">Taplo</div>
          </div>
        </Link>
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-between sm:px-24 px-8 font-sans">
        <RegisterForm />
      </div>
    </main>
  );
}

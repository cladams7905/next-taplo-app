import RegisterForm from "../_components/RegisterForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPathname } from "../_actions";
import Logo from "@/public/images/TaploLogoDark.svg";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

export default async function Signup() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (!userError && userData?.user) {
    redirect(await getRedirectPathname(userData.user.id));
  }

  return (
    <main className="relative bg-slate-50">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] z-[0]"></div>
      <div className="relative navbar lg:px-20 font-sans">
        <Link href={"/"}>
          <div className="navbar-start ml-8 w-full flex items-center">
            <Image width={34} height={34} alt="logo" src={Logo} />
            <div className="font-bold font-logo text-xl mx-4">Taplo</div>
          </div>
        </Link>
      </div>
      <div className="relative flex w-full h-full min-h-[calc(100vh_-_64px)] flex-col items-center sm:px-24 px-8 font-sans">
        <RegisterForm user={userData.user as User} />
      </div>
    </main>
  );
}

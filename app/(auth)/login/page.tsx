import SignInForm from "../_components/SignInForm";
import OAuthForm from "../_components/OAuthForm";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Logo from "@/public/images/Taplo-logo (2).svg";
import Image from "next/image";
import { getRedirectPathname } from "../_actions";

export default async function Login() {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userError && userData?.user) {
    redirect(await getRedirectPathname(userData.user.id));
  }
  return (
    <main className="relative bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative navbar lg:px-20 font-sans">
        <Link href={"/"}>
          <div className="navbar-start ml-8 w-full flex items-center">
            <Image width={36} height={36} alt="logo" src={Logo} />
            <div className="font-bold font-logo text-xl mx-2">Taplo</div>
          </div>
        </Link>
      </div>
      <div className="relative flex w-full flex-col items-center justify-between sm:px-24 px-8 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 my-8">
          <p className="font-logo text-3xl mb-4 text-center">Welcome back</p>
          <p className="">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"}>
              <span className="link link-primary link-hover">Sign up</span>
            </Link>
          </p>
          <SignInForm />
          <OAuthForm />
          <p className="mt-6 text-sm">
            By continuing, you agree to our{" "}
            <Link href={"/legal/terms-of-service"} target="_blank">
              <span className="link">Terms of Service</span>
            </Link>{" "}
            and{" "}
            <Link href={"/legal/privacy-policy"} target="_blank">
              {" "}
              <span className="link">Privacy Policy</span>
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

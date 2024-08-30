import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/images/Taplo-logo (2).svg";

export default async function EmailConfirmationError() {
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
      <div className="flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <p className="font-logo text-3xl mb-4">Email Confirmation error.</p>
          <p>
            Please try sending an email again in a while. We apologize for the
            inconvenience. If this issue persists, please reach out at
            help@taplo.io.
          </p>
        </div>
      </div>
    </main>
  );
}

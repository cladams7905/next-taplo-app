import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/images/TaploLogoDark.svg";

export default async function AuthCodeError() {
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
      <div className="relative flex min-h-screen w-full flex-col items-center justify-between p-24 font-sans">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <p className="font-logo text-3xl mb-4">Authorization error.</p>
          <div>
            Please try logging in or registering again in a while. We apologize
            for the inconvenience. If this issue persists, please reach out at
            <Link
              href={`mailto:team@taplo.io?subject=Authorization%20error`}
              target="_blank"
              className="link link-primary"
            >
              team@taplo.io
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}

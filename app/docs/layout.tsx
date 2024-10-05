import Image from "next/image";
import React from "react";
import Logo from "@/public/images/Taplo-logo (1).svg";
import Link from "next/link";

export default async function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="h-screen w-screen flex flex-col bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100 font-sans md:px-24">
        <div className="relative flex h-screen flex-col gap-6 px-6 overflow-y-scroll bg-white border-x border-gray-300 pb-6">
          <Link href="/docs">
            <div className="flex flex-col my-4">
              <div className="flex items-center">
                <Image width={36} height={36} alt="logo" src={Logo} />
                <div className="ml-2 font-bold font-logo text-xl mr-2">
                  Taplo
                </div>
                <div className="text-sm text-primary font-extrabold font-logo mt-[5px] uppercase">
                  docs
                </div>
              </div>
              <div className="font-sans text-gray-500 text-xs ml-[46px]">
                Last updated: 10/05/2024
              </div>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </main>
  );
}

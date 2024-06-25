import React from "react";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <main>
      <Navbar user={data.user} />
      <div className="flex flex-col h-screen-minus-navbar bg-white dark:bg-base-100 relative">
        <div className="flex flex-col w-full h-full font-sans relative">
          {children}
        </div>
      </div>
    </main>
  );
}

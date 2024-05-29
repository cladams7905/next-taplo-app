import React, { Suspense } from "react";
import Navbar from "./DashboardNavbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Footer from "./DashboardFooter";

export default async function RootLayout({
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
      <Suspense fallback="...">
        <Navbar user={data.user} />
      </Suspense>
      {children}
      <Footer />
    </main>
  );
}

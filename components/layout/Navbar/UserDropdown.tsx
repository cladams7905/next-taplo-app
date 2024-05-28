"use client";

import { LogOut, Settings, User2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/auth/actions";
import { toast } from "@/components/shared/use-toast";
import Image from "next/image";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import LoadingDots from "@/components/shared/LoadingDots";

export default function UserDropdown(data: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const email = data.user?.email;
  const username = email?.substring(0, email.indexOf("@"));
  const { avatar_url, name } = data?.user?.user_metadata || {};

  if (!email) return null;

  async function handleSignOut() {
    startTransition(async () => {
      const { error } = JSON.parse(await signOut());
      if (error) {
        toast({
          variant: "destructive",
          description: (
            <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
              <p>{`Error ${error.status}: ` + error.name}</p>
            </pre>
          ),
        });
      } else {
        redirect("/");
      }
    });
  }

  return (
    <div className="dropdown dropdown-end z-50 relative inline-block text-left">
      <button className="flex items-center justify-center overflow-hidden rounded-full">
        <div className="transition-all duration-75 active:scale-95">
          {avatar_url ? (
            <Image
              src={avatar_url}
              alt="user"
              width="36"
              height="36"
              className="mr-2 rounded-full border border-gray-300"
            ></Image>
          ) : (
            <User2
              height={36}
              width={36}
              className="mr-2 rounded-full border border-gray-300"
            />
          )}
        </div>
      </button>
      <div
        className="dropdown-content w-full mt-2 rounded-md bg-white p-2 sm:w-56 border border-gray-100"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 4px 0px",
        }}
      >
        <div className="p-2">
          {data?.user && (
            <>
              <p className="truncate text-sm font-medium text-gray-900">
                {name ? name : username}
              </p>
              <p className="truncate text-sm font-medium text-gray-400">
                {email}
              </p>
            </>
          )}
        </div>
        <button
          className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
          disabled
        >
          <Settings className="h-4 w-4" />
          <p className="text-sm">Settings</p>
        </button>
        <button
          className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
          onClick={() => handleSignOut()}
        >
          <LogOut className="h-4 w-4" />
          <p className="text-sm">
            {isPending ? <LoadingDots color="oklch(var(--pc))" /> : "Logout"}
          </p>
        </button>
      </div>
    </div>
  );
}

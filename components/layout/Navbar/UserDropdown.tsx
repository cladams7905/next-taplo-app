"use client";

import { LogOut, Settings } from "lucide-react";
import { Session } from '@supabase/supabase-js';
import { signOut } from "@/app/auth-server-action/actions";
import { toast } from "@/components/shared/use-toast";
import Image from "next/image";

export default function UserDropdown({ session }: { session: Session }) {
  const email = session?.user?.email;
  const username = email?.substring(0, email.indexOf("@"))
  const {avatar_url, name} = session?.user?.user_metadata || {};
  
  if (!email) return null;

  return (
    <div className="dropdown dropdown-end z-50 relative inline-block text-left">
       <button className="flex items-center justify-center overflow-hidden rounded-full">
          <div className="transition-all duration-75 active:scale-95">
            {avatar_url ? (
              <Image  
                src={avatar_url}
                alt="user"
                width="30"
                height="30"
                className="mr-2 rounded-full"
                ></Image>) : ( 
              <></>
            )}
          </div>
        </button>
          <div className="dropdown-content w-full mt-2 rounded-md bg-white p-2 sm:w-56 border border-gray-100"
          style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 4px 0px'}}>
            <div className="p-2">
              {session?.user && (
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
              onClick={() => {
                signOut()
                .catch((err) => {
                  toast({
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-red-400">
                          {`Error: ` + err.message}
                        </code>
                      </pre>
                    ),
                  });
                });
              }}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
    </div>
  );
}
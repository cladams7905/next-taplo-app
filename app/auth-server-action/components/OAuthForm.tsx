"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import LoadingDots from "@/components/shared/LoadingDots";
import Google from "@/components/shared/icons/google";
import { GET } from "../callback/route";

export default function OAuthForm() {
	const [signInClicked, setSignInClicked] = useState(false);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	const logInWithGoogle = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
				access_type: 'offline',
				prompt: 'consent',
				},
			redirectTo: `${location.origin}/auth-server-action/callback`
			},
		})
	}
	
	return (
	<>
		<div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`
			${signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
			  logInWithGoogle();
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
				<>
					<Google className="h-5 w-5" />
					<p>Sign In with Google</p>
				</>
            )}
          </button>
        </div>
	</>
	);
}

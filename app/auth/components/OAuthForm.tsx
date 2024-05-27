"use client";

import { useState } from "react";
import LoadingDots from "@/components/shared/LoadingDots";
import Google from "@/components/shared/icons/google";
import { createClient } from "@/utils/supabase/client";

export default function OAuthForm() {
  const [signInClicked, setSignInClicked] = useState(false);

  const supabase = createClient();

  const logInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-4 w-full font-sans">
        <div className="flex flex-row  justify-center items-center w-full my-2">
          <hr className="w-full" />
          <p className="text-sm px-4 min-w-fit">Or continue with</p>
          <hr className="w-full" />
        </div>
        <button
          disabled={signInClicked}
          className={`btn
			${signInClicked ? "cursor-not-allowed btn-disabled" : "btn-neutral"}`}
          onClick={() => {
            setSignInClicked(true);
            logInWithGoogle();
          }}
        >
          {signInClicked ? (
            <LoadingDots />
          ) : (
            <>
              <Google className="h-5 w-5" />
              <p>Google</p>
            </>
          )}
        </button>
      </div>
    </>
  );
}

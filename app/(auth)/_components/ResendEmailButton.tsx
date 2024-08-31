"use client";

import React from "react";
import { useTransition } from "react";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { createClient } from "@/supabase/client";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { getURL } from "@/lib/actions";

export default function ResendEmailButton({ email }: { email?: string }) {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const resendEmail = async (data: { email: string }) => {
    const result = await supabase.auth.resend({
      type: "signup",
      email: data.email,
      options: {
        emailRedirectTo: getURL() + "/dashboard/create-project",
      },
    });
    return JSON.stringify(result);
  };

  async function onSubmit() {
    startTransition(async () => {
      if (!email) {
        showToastError(`Please provide an email.`);
        return;
      }

      const { data, error } = JSON.parse(await resendEmail({ email: email }));
      if (error) {
        showToastError(
          error,
          error.code == 429
            ? `Please wait at least 60 seconds between requesting new email links.`
            : ``
        );
      } else {
        showToast(`An email has been sent. Please check ${email} to confirm your
                  registration.`);
      }
    });
  }
  return (
    <div
      onClick={() => onSubmit()}
      className="w-full btn btn-primary text-white"
      style={{ marginTop: "2.5rem" }}
    >
      {isPending ? <LoadingDots color="#FFFFFF" /> : "Resend Link"}
    </div>
  );
}

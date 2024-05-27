"use client";

import React from "react";
import { toast } from "@/components/shared/use-toast";
import { useTransition } from "react";
import LoadingDots from "@/components/shared/LoadingDots";
import { createClient } from "@/utils/supabase/client";

export default function ResendEmailButton({ email }: { email?: string }) {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const resendEmail = async (data: { email: string }) => {
    const result = await supabase.auth.resend({
      type: "signup",
      email: data.email,
      options: {
        emailRedirectTo: `${location.origin}/projects`,
      },
    });
    return JSON.stringify(result);
  };

  async function onSubmit() {
    startTransition(async () => {
      if (email) {
        const { data, error } = JSON.parse(await resendEmail({ email: email }));
        if (error) {
          toast({
            variant: "destructive",
            description: (
              <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
                <p>
                  {error.status == "429"
                    ? `Error: Please wait at least 60 seconds between requesting new email links.`
                    : `Error ${error.status}: ` + error.name}
                </p>
              </pre>
            ),
          });
        } else {
          toast({
            description: (
              <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
                <p>
                  An email has been sent. Please check{" "}
                  <span className="font-bold">{email}</span> to confirm your
                  registration.
                </p>
              </pre>
            ),
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: (
            <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
              <p>Error: no email sent</p>
            </pre>
          ),
        });
      }
    });
  }
  return (
    <div
      onClick={() => onSubmit()}
      className="w-full btn btn-neutral"
      style={{ marginTop: "2.5rem" }}
    >
      {isPending ? <LoadingDots color="#FFFFFF" /> : "Resend Link"}
    </div>
  );
}

import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { getRedirectPathname } from "../_actions";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(
          `${origin}${await getRedirectPathname(data.user.id)}`
        );
      } else if (forwardedHost) {
        return NextResponse.redirect(
          `https://${forwardedHost}${await getRedirectPathname(data.user.id)}`
        );
      } else {
        return NextResponse.redirect(
          `${origin}${await getRedirectPathname(data.user.id)}`
        );
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth-code-error`);
}

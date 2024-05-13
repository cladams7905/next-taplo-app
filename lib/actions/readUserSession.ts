"use server"

import createSupabaseServerClient from "../../supabase/server"

export default async function readUserSession() {
    return createSupabaseServerClient().then((res) => {
        return res.auth.getSession();
    });
}
import { User } from "@supabase/supabase-js";
import { getURL } from "..";

export const fetchToken = async (user: User) => {
  try {
    const res = await fetch(getURL() + "/api/v1/featuresvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch token:", res.statusText);
      return;
    }

    const responseData = await res.json();
    return responseData.token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

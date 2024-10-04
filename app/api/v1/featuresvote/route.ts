import { NextRequest, NextResponse } from "next/server";

// Call this API when your users load the FeaturesVote board.
export async function POST(request: NextRequest) {
  const { user } = await request.json();

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      apiSecretKey: process.env.FEATURES_VOTE_SECRET,
      slug: "taplo",
      user_data: {
        user_email: user.email,
        app_user_id: user.id,
        user_name: user.user_metadata.user_name || undefined,
        img_url: user.user_metadata.avatar_url || undefined,
      },
    }),
  };

  try {
    const response = await fetch(
      "https://features.vote/api/public/user-token",
      requestOptions
    );

    const data = await response.json();

    return NextResponse.json({
      token: data.token,
    }); // returns: { token: "your_jwt_token"}
  } catch (error: any) {
    console.error("error", error);
    return Response.json({
      error: `Features Vote Error: ${error?.message}`,
      status: 500,
    });
  }
}

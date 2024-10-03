import { getSubscription } from "@/stripe/actions";
import { stripe } from "@/stripe/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the user_id from the query params
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({
      data: null,
      status: 400,
      error: "User id is required",
    });
  }

  try {
    const { data: subscription, error } = await getSubscription(user_id);

    if (error) {
      throw new Error(error.message);
    } else {
      return NextResponse.json({
        data: subscription,
        error: null,
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: `Get Subscriptions Error: ${error?.message}`,
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      subscriptionId,
      customerId,
      priceId,
      comment,
      feedback,
      cancelAtPeriodEnd,
      isRenewalPeriod,
    } = await request.json();

    let subscription;
    if (isRenewalPeriod) {
      subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: cancelAtPeriodEnd,
        cancellation_details: {
          comment: comment,
          feedback: feedback,
        },
      });
    } else {
      // Create a new subscription
      subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
      });
    }
    return NextResponse.json(subscription, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      error: `Create Subscription Error: ${error?.message}`,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json();
    const deletedSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );
    return NextResponse.json(deletedSubscription);
  } catch (error: any) {
    return NextResponse.json({
      error: `Delete Subscription Error: ${error?.message}`,
      status: 500,
    });
  }
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}

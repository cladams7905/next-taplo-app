import { stripe } from "@/stripe/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const subscriptions = await stripe.subscriptions.list();
    return NextResponse.json(subscriptions);
  } catch (error: any) {
    return NextResponse.json({
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

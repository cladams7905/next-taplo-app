"use client";

import { getStripe } from "@/stripe/client";
import { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { calculateBillingCycle } from "@/lib/actions";

const stripe = getStripe();

export default function CheckoutSession({
  priceId,
  email,
  startTransition,
}: {
  priceId: string;
  email: string | undefined;
  startTransition: (callback: () => void) => void;
}) {
  const fetchClientSecret = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      startTransition(async () => {
        try {
          const res = await fetch("/api/v1/stripe/checkout_session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price_id: priceId,
              email: email,
              billing_cycle: calculateBillingCycle(),
            }),
          });

          const data = await res.json();
          resolve(data.clientSecret);
        } catch (error) {
          reject(error);
        }
      });
    });
  }, [priceId, email, startTransition]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="w-full rounded-lg">
      <EmbeddedCheckoutProvider stripe={stripe} options={options} key={priceId}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

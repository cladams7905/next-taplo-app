"use client";

import { getStripe } from "@/stripe/client";
import { Dispatch, SetStateAction, useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  calculateBillingCycle,
  convertDateTime,
  toDateTime,
} from "@/lib/actions";
import { showToast } from "@/app/_components/shared/showToast";

const stripe = getStripe();

export default function CheckoutSession({
  priceId,
  email,
  setRenewalDate,
  setCheckoutComplete,
  startTransition,
}: {
  priceId: string;
  email: string | undefined;
  setRenewalDate: Dispatch<SetStateAction<string | null>>;
  setCheckoutComplete: Dispatch<SetStateAction<boolean>>;
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

  const onComplete = () => {
    const date = toDateTime(calculateBillingCycle()).toUTCString();
    setRenewalDate(date);
    setCheckoutComplete(true);
    showToast(
      `All set! Your free trial will end on ${convertDateTime(
        date
      )}. If you want to 
        change your subscription preferences, you may do so from your "Account" page.`
    );
  };

  const options = {
    fetchClientSecret,
    onComplete,
  };

  return (
    <div id="checkout" className="w-full rounded-lg">
      <EmbeddedCheckoutProvider stripe={stripe} options={options} key={priceId}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

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
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { updateStripeUser } from "@/stripe/actions";
import { User } from "@supabase/supabase-js";
import { Json } from "@/supabase/types";

const stripe = getStripe();

export default function CheckoutSession({
  user,
  priceId,
  email,
  setRenewalDate,
  setCheckoutComplete,
  startTransition,
}: {
  user: User;
  priceId: string;
  email: string | undefined;
  setRenewalDate: Dispatch<SetStateAction<string | null>>;
  setCheckoutComplete: Dispatch<SetStateAction<boolean>>;
  startTransition: (callback: () => void) => void;
}) {
  const renewalDate = toDateTime(calculateBillingCycle()).toUTCString();
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

          //send client secret initiate checkout session
          resolve(data.clientSecret);

          //update stripe user details
          const { error } = await updateStripeUser({
            user_id: user.id,
            email: data.email,
            payment_method: data.payment_method,
            payment_status: data.payment_status,
          });
          if (error) {
            showToastError(error);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }, [priceId, email, startTransition]);

  const onComplete = useCallback(async () => {
    setRenewalDate(renewalDate);
    setCheckoutComplete(true);

    //update renewal date on completion of checkout session.
    const { error } = await updateStripeUser({
      user_id: user.id,
      renewal_date: renewalDate,
    });
    if (error) {
      showToastError(error);
    } else {
      showToast(
        `All set! Your free trial will end on ${convertDateTime(
          renewalDate
        )}. If you want to 
        change your subscription preferences, you may do so from your "Account" page.`
      );
    }
  }, [setRenewalDate, setCheckoutComplete]);

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

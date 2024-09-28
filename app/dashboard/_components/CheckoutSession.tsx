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
import { createOrRetrieveCustomer, updateStripeUser } from "@/stripe/actions";
import { User } from "@supabase/supabase-js";

const stripe = getStripe();

export default function CheckoutSession({
  user,
  priceId,
  productId,
  email,
  setRenewalDate,
  setCheckoutComplete,
  selectReferralSource,
}: {
  user: User;
  priceId: string;
  productId: string;
  email: string | undefined;
  setRenewalDate: Dispatch<SetStateAction<string | null>>;
  setCheckoutComplete: Dispatch<SetStateAction<boolean>>;
  selectReferralSource: () => Promise<void>;
}) {
  const renewalDate = toDateTime(calculateBillingCycle()).toUTCString();
  const fetchClientSecret = useCallback(async () => {
    const customerId = await createOrRetrieveCustomer({
      email: email,
      uuid: user.id,
    });
    return new Promise<string>(async (resolve, reject) => {
      try {
        const res = await fetch("/api/v1/stripe/checkout_session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price_id: priceId,
            product_id: productId,
            customer: customerId ? customerId : undefined,
            email: customerId ? email : undefined,
            display_name: user.user_metadata.name,
          }),
        });
        const data = await res.json();

        //send client secret initiate checkout session
        resolve(data.clientSecret);

        //update stripe user details
        const { error } = await updateStripeUser({
          user_id: user.id,
          email: email,
          payment_method: data.payment_method,
          payment_status: data.payment_status,
        });
        if (error) {
          console.log(error);
          showToastError(error);
        } else {
          selectReferralSource();
        }
      } catch (error) {
        reject(error);
      }
    });
  }, [priceId, productId, email, selectReferralSource, user]);

  const onComplete = useCallback(async () => {
    setRenewalDate(renewalDate);
    setCheckoutComplete(true);

    //update renewal date on completion of checkout session.
    const { error } = await updateStripeUser({
      user_id: user.id,
      renewal_date: renewalDate,
    });
    if (error) {
      console.log(error);
      showToastError(error);
    } else {
      showToast(
        `All set! Your free trial will end on ${convertDateTime(
          renewalDate
        )}. If you want to 
        change your subscription preferences, you may do so from your "Account" page.`
      );
    }
  }, [setRenewalDate, setCheckoutComplete, renewalDate, user.id]);

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

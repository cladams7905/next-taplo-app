"use client";

import { getStripe } from "@/lib/stripe/client";
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
import {
  createOrRetrieveCustomer,
  updateStripeUser,
} from "@/lib/stripe/actions";
import { User } from "@supabase/supabase-js";

const stripe = getStripe();

export default function CheckoutSession({
  user,
  priceId,
  productId,
  email,
  setFreeTrialDate,
  setCheckoutComplete,
  selectReferralSource,
}: {
  user: User;
  priceId: string;
  productId: string;
  email: string | undefined;
  setFreeTrialDate: Dispatch<SetStateAction<string | null>>;
  setCheckoutComplete: Dispatch<SetStateAction<boolean>>;
  selectReferralSource: () => Promise<void>;
}) {
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
    const freeTrialDate = toDateTime(calculateBillingCycle()).toUTCString();
    setFreeTrialDate(freeTrialDate);
    setCheckoutComplete(true);

    //update free trial date on completion of checkout session.
    const { error } = await updateStripeUser({
      user_id: user.id,
      free_trial_start_date: freeTrialDate,
    });
    if (error) {
      console.log(error);
      showToastError(error);
    } else {
      //send welcome email
      sendWelcomeEmail(freeTrialDate);

      showToast(
        `All set! Your free trial will end on ${convertDateTime(
          freeTrialDate
        )}. If you want to 
        change your subscription preferences, you may do so from your "Account" page.`
      );
    }
  }, [setFreeTrialDate, setCheckoutComplete, user.id]);

  const sendWelcomeEmail = async (freeTrialDate: string) => {
    const res = await fetch("/api/v1/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Taplo",
        to: user?.email,
        subject: "Welcome to Taplo!",
        template: "welcome email",
        mailgun_variables: {
          firstname: user?.user_metadata.name || "new Taplo user",
          free_trial_end_date: convertDateTime(freeTrialDate),
        },
      }),
    });
    const data = await res.json();
    console.log(data);
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

"use client";

import CheckoutSession from "@/app/checkout/_components/CheckoutSession";
import {
  calculateBillingCycle,
  convertDateTime,
  toDateTime,
} from "@/lib/actions";
import { Tables } from "@/stripe/types";
import { User } from "@supabase/supabase-js";
import { Lock } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Logo from "@/public/images/Taplo-logo (2).svg";
import Stripe from "stripe";
import { PaymentPlans } from "@/lib/enums";
import { updateStripeUser } from "@/stripe/actions";
import { showToastError } from "@/app/_components/shared/showToast";

export default function PaymentModal({
  stripeUser,
  user,
  products,
  renewalDate,
  setRenewalDate,
}: {
  stripeUser: Tables<"users">;
  user: User;
  products: {
    id: string;
    name: string;
    payment_plan: PaymentPlans;
    price: Stripe.Price;
  }[];
  renewalDate: string | null;
  setRenewalDate: Dispatch<SetStateAction<string | null>>;
}) {
  const paymentModalRef = useRef<HTMLDialogElement>(null);
  const [isReferralLoading, startReferralTransition] = useTransition();
  const [isPaymentLoading, startPaymentTransition] = useTransition();

  const [isCheckoutComplete, setCheckoutComplete] = useState(false);
  const formattedBillingDate = convertDateTime(
    toDateTime(calculateBillingCycle()).toUTCString()
  );
  const [paymentPlan, setPaymentPlan] = useState<string | null>(
    products[2]?.payment_plan || null
  );
  const [checkoutPriceId, setCheckoutPriceId] = useState<string>(
    products[2].price.id || ""
  );

  const [referralSource, setReferralSource] = useState(
    stripeUser?.referral_source || ""
  );

  // Handle changes in the payment plan selection
  const handleSelectPaymentPlan = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setPaymentPlan(selectedValue);
  };

  // Handle changes in referral source selection
  const handleSelectReferralSource = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    startReferralTransition(async () => {
      const selectedValue = event.target.value;
      const { error } = await updateStripeUser({
        user_id: user.id,
        referral_source: selectedValue,
      });
      if (error) {
        console.log(error);
        showToastError(error);
      } else {
        setReferralSource(selectedValue);
      }
    });
  };

  // Open payment modal if renewal date is not set
  useEffect(() => {
    if (isCheckoutComplete) {
      paymentModalRef.current?.classList.remove("modal-open");
    } else {
      if (!renewalDate) paymentModalRef.current?.classList.add("modal-open");
    }
  }, [renewalDate, isCheckoutComplete]);

  // Update the checkoutPriceId based on the selected payment plan
  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.payment_plan === paymentPlan
    );
    const newCheckoutPriceId = selectedProduct?.price.id ?? "";
    setCheckoutPriceId(newCheckoutPriceId);
  }, [paymentPlan, products]);

  return (
    <dialog id="payment_modal" className="modal" ref={paymentModalRef}>
      <div className="modal-box flex md:flex-row flex-col items-center gap-4 max-w-screen-lg min-h-[95vh] bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100 font-sans">
        <div className="flex flex-col items-center w-full h-full gap-6 lg:px-12">
          <Image width={48} height={48} alt="logo" src={Logo} />
          <p className="font-logo text-3xl">Start your 14-day free trial.</p>
          <p className="text-sm">
            <Lock
              width={16}
              height={16}
              strokeWidth={2.5}
              className="inline-block -mt-1 mr-1"
            />{" "}
            Secure payment with Stripe
          </p>
          <p className="text-sm">
            No payment will be processed until{" "}
            <span className="font-bold">{formattedBillingDate}</span>. If you
            decide you want to cancel or change your subscription, you may do so
            from your Account page.
          </p>
          <div className="flex flex-col items-center w-full gap-1 lg:mb-0 mb-6">
            <label className="form-control w-full">
              <div className="flex items-center gap-3">
                <div className="label">
                  <span className="label-text">Payment plan</span>
                </div>
                {isPaymentLoading && (
                  <span className="loading loading-spinner loading-sm bg-base-content"></span>
                )}
              </div>
              <select
                className="select select-bordered select-primary"
                value={paymentPlan || "default"}
                onChange={handleSelectPaymentPlan}
              >
                <option disabled value="default">
                  Select your payment plan
                </option>
                {products.map((product, i) => (
                  <option key={i} value={product.payment_plan}>
                    {product.name} -{" "}
                    {formatCentsToDollars(product.price.unit_amount)}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="flex items-center gap-3">
                <div className="label">
                  <span className="label-text">How did you find us?</span>
                </div>
                {isReferralLoading && (
                  <span className="loading loading-spinner loading-sm bg-base-content"></span>
                )}
              </div>
              <select
                className="select select-bordered select-primary"
                value={referralSource || "default"}
                onChange={handleSelectReferralSource}
              >
                <option disabled value="default">
                  Select an option
                </option>
                <option value="Web search">Web search</option>
                <option value="Word of mouth">Word of mouth</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="X (Twitter)">X (Twitter)</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Competitor">Competitor</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center w-full max-h-[90vh] rounded-lg md:overflow-y-scroll">
          {" "}
          <CheckoutSession
            user={user}
            priceId={checkoutPriceId}
            email={user?.email}
            setRenewalDate={setRenewalDate}
            setCheckoutComplete={setCheckoutComplete}
            startTransition={startPaymentTransition}
          />
        </div>
      </div>
    </dialog>
  );
}

function formatCentsToDollars(cents: number | null) {
  if (cents !== null) {
    const dollars = (cents / 100).toFixed(2);
    return `$${dollars}`;
  }
  return "";
}

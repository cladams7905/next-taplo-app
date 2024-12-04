"use client";

import { ArrowRight, Check, Lock, X } from "lucide-react";
import LaunchOfferBadge from "./LaunchOfferBadge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PaymentPlans } from "@/lib/enums";

export default function Pricing() {
  const enum PricingType {
    Monthly,
    Yearly,
  }
  const [pricingType, setPricingType] = useState<PricingType>(
    PricingType.Monthly
  );
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  useEffect(() => {
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 1000);
  }, [pricingType]);
  return (
    <div className="w-full min-h-[120vh] px-8 py-12 z-10 bg-white/70 rounded-lg shadow-lg">
      {" "}
      <div className="flex flex-col items-center w-full gap-12 font-sans lg:px-32">
        <p id="pricing" className="uppercase font-logo text-lg">
          Pricing
        </p>
        <div className="flex flex-col w-full items-center gap-6">
          {" "}
          <p className="text-3xl font-logo text-center">
            Start boosting your conversions with Taplo.
          </p>
          <div className="px-2 md:text-md text-sm w-fit rounded-lg text-center inline-block bg-accent text-white justify-center items-center lg:px-4 py-1 font-sans">
            <span className="mx-1 font-semibold">🚀 Launch offer:</span>
            <span className="text-pink-200 mx-1">50% off Pro</span>for the next
            <span className="text-pink-200 mx-1">75</span>customers.
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-3 md:ml-16 ml-12">
          <p>Monthly</p>
          <input
            type="radio"
            name="radio-2"
            className="radio radio-primary"
            checked={pricingType === PricingType.Monthly}
            onChange={() => setPricingType(PricingType.Monthly)}
          />
          <input
            type="radio"
            name="radio-2"
            className="radio radio-primary"
            checked={pricingType === PricingType.Yearly}
            onChange={() => setPricingType(PricingType.Yearly)}
          />
          <p>Yearly (save 25-30%)</p>
        </div>
        <div
          className={`lg:columns-2 md:columns-2 flex md:flex-row md:gap-6 flex-col items-center justify-center w-full mt-6 ${
            isAnimate ? "animate-twSlideInBottom" : ""
          }`}
        >
          <div className="flex flex-col w-full min-h-[80vh] items-center max-w-[475px]">
            <div className="relative flex flex-col gap-6 items-center shadow-lg bg-white/60 backdrop-blur-lg rounded-lg p-6 w-full h-full">
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {pricingType === PricingType.Monthly
                    ? ""
                    : pricingType === PricingType.Yearly
                    ? "$96"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$7.99"
                      : pricingType === PricingType.Yearly
                      ? "$69.99"
                      : ""}
                  </p>
                  <p>
                    {" "}
                    {pricingType === PricingType.Monthly
                      ? "/month"
                      : pricingType === PricingType.Yearly
                      ? "/year"
                      : ""}
                  </p>
                </div>
                <div className="-mt-2 font-bold text-md text-primary">USD</div>
              </div>
              <div className="text-xl font-logo text-left w-full">
                Starter Plan{" "}
                {pricingType === PricingType.Monthly
                  ? ""
                  : pricingType === PricingType.Yearly
                  ? "(save $26)"
                  : ""}
              </div>
              <p>
                Perfect for startups and marketers with only a single website.
              </p>
              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>1 website</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Unlimited integrations</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Customizable popups</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Simple analytics</p>
                </div>
                <div className="flex items-center gap-3">
                  <X color="#f87171" width={24} height={24} strokeWidth={4} />
                  <p>API access</p>
                </div>
                <div className="flex items-center gap-3">
                  <X color="#f87171" width={24} height={24} strokeWidth={4} />
                  <p>Inline style</p>
                </div>
              </div>
              <Link href={`/signup`}>
                <div className="btn btn-lg btn-primary text-white max-w-fit">
                  Start my free trial
                  <ArrowRight />
                </div>
              </Link>
              <p className="text-sm">
                <Lock
                  width={16}
                  height={16}
                  strokeWidth={2.5}
                  className="inline-block -mt-1 mr-1"
                />{" "}
                Secure payment with Stripe
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full min-h-[80vh] items-center max-w-[475px]">
            <div className="relative flex flex-col gap-6 items-center shadow-lg bg-white/60 backdrop-blur-md border-2 border-primary rounded-lg p-6 w-full h-full">
              <div className="absolute badge badge-lg badge-primary text-white -top-3">
                Most Popular
              </div>
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {" "}
                  {pricingType === PricingType.Monthly
                    ? "$18"
                    : pricingType === PricingType.Yearly
                    ? "$216"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$8.99"
                      : pricingType === PricingType.Yearly
                      ? "$107.99"
                      : ""}
                  </p>
                  <p>
                    {" "}
                    {pricingType === PricingType.Monthly
                      ? "/month"
                      : pricingType === PricingType.Yearly
                      ? "/year"
                      : ""}
                  </p>
                </div>
                <div className="-mt-2 font-bold text-md text-primary">USD</div>
              </div>
              <div className="text-xl font-logo text-left w-full">
                Pro Plan{" "}
                {pricingType === PricingType.Monthly
                  ? ""
                  : pricingType === PricingType.Yearly
                  ? "(save $108)"
                  : ""}
              </div>
              <p>
                Perfect for businesses with multiple websites or needing more
                fine-grained control.
              </p>
              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Unlimited websites</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Unlimited integrations</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Customizable popups</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>In-depth analytics</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>API access</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Inline style</p>
                </div>
              </div>
              <Link href={`/signup`}>
                <div className="btn btn-lg btn-primary text-white">
                  Start my free trial
                  <ArrowRight />
                </div>
              </Link>
              <p className="text-sm">
                <Lock
                  width={16}
                  height={16}
                  strokeWidth={2.5}
                  className="inline-block -mt-1 mr-1"
                />{" "}
                Secure payment with Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

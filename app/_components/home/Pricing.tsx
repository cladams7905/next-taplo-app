"use client";

import { ArrowRight, Check, Lock, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pricing() {
  const enum PricingType {
    Monthly,
    Yearly,
  }
  const [pricingType, setPricingType] = useState<PricingType>(
    PricingType.Yearly
  );
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  useEffect(() => {
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 1000);
  }, [pricingType]);
  return (
    <div className="w-full min-h-[120vh] xl:px-32 lg:px-24 sm:px-8 px-4 py-12 z-10 bg-white/70 rounded-lg shadow-lg">
      {" "}
      <div className="flex flex-col items-center w-full gap-12 font-sans">
        <p id="pricing" className="uppercase font-logo text-lg">
          Pricing
        </p>
        <div className="flex flex-col w-full items-center gap-6">
          {" "}
          <p className="text-3xl font-logo text-center">
            Start boosting your conversions with Taplo.
          </p>
        </div>
        <div className="w-full bg-white/60 rounded-lg p-1 shadow-lg max-w-[400px]">
          <div className="relative flex sm:min-w-[320px] sm:w-fit w-full items-center justify-center">
            {/* Sliding background */}
            <div
              className={`absolute left-0 top-0 h-full w-1/2 bg-primary rounded-lg transition-transform duration-300 ${
                pricingType === PricingType.Yearly
                  ? "translate-x-full"
                  : "translate-x-0"
              }`}
            ></div>

            {/* Options */}
            <div
              className={`relative z-10 flex-1 p-2 text-center cursor-pointer font-semibold text-sm ${
                pricingType === PricingType.Monthly
                  ? "text-white"
                  : "text-base-content"
              }`}
              onClick={() => setPricingType(PricingType.Monthly)}
            >
              Monthly
            </div>
            <div
              className={`relative z-10 flex-1 p-2 w-fit text-center cursor-pointer whitespace-nowrap font-semibold text-sm ${
                pricingType === PricingType.Yearly
                  ? "text-white"
                  : "text-base-content"
              }`}
              onClick={() => setPricingType(PricingType.Yearly)}
            >
              Yearly🔥 (save 33%)
            </div>
          </div>
        </div>
        <div
          className={`lg:columns-2 md:columns-2 flex lg:flex-row md:gap-6 flex-col lg:!items-start lg:!justify-start !justify-center !items-center w-full ${
            isAnimate ? "animate-twSlideInBottom" : ""
          }`}
        >
          <div className="flex flex-col w-full h-full max-w-[475px] md:mb-0 mb-8">
            <div className="relative flex flex-col gap-6 items-center shadow-lg bg-white/60 backdrop-blur-lg rounded-lg p-6 w-full h-full min-h-[620px]">
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {pricingType === PricingType.Monthly
                    ? ""
                    : pricingType === PricingType.Yearly
                    ? "$60"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$5"
                      : pricingType === PricingType.Yearly
                      ? "$40"
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
                  ? "(save $20)"
                  : ""}
              </div>
              <p>
                Perfect for startups and marketers with only a single website.
              </p>
              <div className="flex flex-col justify-center gap-3 mb-10">
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
                  <p>Unlimited popups</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Simple analytics*</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <X color="#f87171" width={24} height={24} strokeWidth={4} />
                  <p>API access*</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <X color="#f87171" width={24} height={24} strokeWidth={4} />
                  <p>Inline style*</p>
                </div>
              </div>
              <Link href={`/signup`}>
                <div className="btn md:!btn-lg rounded-lg btn-md btn-primary sm:w-fit text-white">
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
          <div className="flex flex-col w-full min-h-[80vh] max-w-[475px]">
            <div className="relative flex flex-col gap-6 items-center shadow-lg bg-white/60 backdrop-blur-md border-2 border-primary rounded-lg p-6 w-full h-full">
              <div className="absolute badge badge-lg badge-primary text-white -top-3">
                Most Popular
              </div>
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {" "}
                  {pricingType === PricingType.Monthly
                    ? "$16"
                    : pricingType === PricingType.Yearly
                    ? "$96"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$8"
                      : pricingType === PricingType.Yearly
                      ? "$48"
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
                  ? "(save $48)"
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
                  <p>Unlimited popups</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Full customization</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>In-depth analytics*</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>API access*</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <Check
                    color="#4ade80"
                    width={24}
                    height={24}
                    strokeWidth={4}
                  />
                  <p>Inline style*</p>
                </div>
              </div>
              <Link href={`/signup`}>
                <div className="btn md:!btn-lg rounded-lg btn-md btn-primary sm:w-fit text-white">
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
        <p className="text-center">
          *These features are still under development.
        </p>
      </div>
    </div>
  );
}

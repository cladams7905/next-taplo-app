"use client";

import { ArrowRight, Check, Lock, X } from "lucide-react";
import LaunchOfferBadge from "./LaunchOfferBadge";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div className="w-full min-h-[140vh] px-8">
      {" "}
      <div className="flex flex-col items-center pb-12 w-full gap-12 font-sans lg:px-32">
        <p id="pricing" className="uppercase font-logo text-lg">
          Pricing
        </p>
        <div className="flex flex-col w-full items-center gap-6">
          {" "}
          <p className="text-3xl font-logo text-center">
            Start boosting your conversions with Taplo.
          </p>
          <LaunchOfferBadge />
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
          <p>Yearly (save 30%)</p>
        </div>
        <div
          className={`lg:columns-2 md:columns-2 flex md:flex-row md:gap-6 flex-col items-center justify-center w-full mt-6 ${
            isAnimate ? "animate-slideInBottom" : ""
          }`}
        >
          <div className="flex flex-col w-full min-h-[80vh] items-center max-w-[475px]">
            <div className="relative flex flex-col gap-6 items-center shadow-md border border-gray-300 rounded-lg p-6 w-full h-full mb-12">
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {pricingType === PricingType.Monthly
                    ? ""
                    : pricingType === PricingType.Yearly
                    ? "$180"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$15"
                      : pricingType === PricingType.Yearly
                      ? "$120"
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
                  ? "(save $60)"
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
              <Link href={"/signup"}>
                <div className="btn btn-lg btn-primary text-white max-w-fit">
                  Start free trial
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
          <div className="flex flex-col w-full min-h-[80vh] items-center max-w-[475px] mb-12">
            <div className="relative flex flex-col gap-6 items-center shadow-md border-2 border-primary rounded-lg p-6 w-full h-full">
              <div className="absolute badge badge-lg badge-primary text-white -top-3">
                Most Popular
              </div>
              <div className="flex w-full items-center justify-center gap-3">
                <div className="line-through font-bold text-xl -mt-10">
                  {" "}
                  {pricingType === PricingType.Monthly
                    ? "$50"
                    : pricingType === PricingType.Yearly
                    ? "$600"
                    : ""}
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <p className="text-[40px] text-primary font-logo">
                    {pricingType === PricingType.Monthly
                      ? "$25"
                      : pricingType === PricingType.Yearly
                      ? "$250"
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
                  ? "(save $25)"
                  : pricingType === PricingType.Yearly
                  ? "(save $350)"
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
              <Link href={"/signup"}>
                <div className="btn btn-lg btn-primary text-white">
                  Start free trial
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

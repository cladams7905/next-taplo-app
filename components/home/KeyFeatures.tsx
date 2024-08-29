"use client";

import {
  ArrowRight,
  BarChartBig,
  CodeXml,
  Paintbrush,
  Proportions,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function KeyFeatures() {
  enum Features {
    CustomStyling,
    Embed,
    Integrations,
    PopupInline,
    DataAnalytics,
  }
  const [activeFeature, setActiveFeature] = useState<Features>(
    Features.CustomStyling
  );
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  useEffect(() => {
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 100);
  }, [activeFeature]);
  return (
    <div className="flex flex-col items-center pt-6 w-full min-h-[100vh] gap-12 font-sans lg:px-32 px-8">
      <p id="key-features" className="uppercase font-logo text-lg">
        Key Features
      </p>
      <div className="flex overflow-x-scroll lg:justify-center w-full md:gap-12 gap-0 items-center">
        <div
          className={`flex flex-col h-fit items-center justify-center min-w-[150px] gap-3 mb-4 p-4 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.CustomStyling
              ? "bg-gradient-to-tr from-primary/40 to-purple-100 text-primary animate-fadeInLeftToRight"
              : ""
          }`}
          style={{
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            if (activeFeature !== Features.CustomStyling)
              setActiveFeature(Features.CustomStyling);
          }}
        >
          <Paintbrush width={40} height={40} />
          <p className="font-bold text-center">Custom styling</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center min-w-[150px] gap-3 mb-4 p-4 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.Embed
              ? "bg-gradient-to-tr from-primary/40 to-purple-100 text-primary animate-fadeInLeftToRight"
              : ""
          }`}
          style={{
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            if (activeFeature !== Features.Embed)
              setActiveFeature(Features.Embed);
          }}
        >
          <CodeXml width={40} height={40} />
          <p className="font-bold text-center">Single-line embed</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center min-w-[150px] gap-3 mb-4 p-4 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.Integrations
              ? "bg-gradient-to-tr from-primary/40 to-purple-100 text-primary animate-fadeInLeftToRight"
              : ""
          }`}
          style={{
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            if (activeFeature !== Features.Integrations)
              setActiveFeature(Features.Integrations);
          }}
        >
          <Share2 width={40} height={40} />
          <p className="font-bold text-center">4+ integrations</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center min-w-[150px] gap-3 mb-4 p-4 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.PopupInline
              ? "bg-gradient-to-tr from-primary/40 to-purple-100 text-primary animate-fadeInLeftToRight"
              : ""
          }`}
          style={{
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            if (activeFeature !== Features.PopupInline)
              setActiveFeature(Features.PopupInline);
          }}
        >
          <Proportions width={40} height={40} />
          <p className="font-bold text-center">Popup & inline</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center min-w-[150px] gap-3 mb-4 p-4 rounded-lg hover:-translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.DataAnalytics
              ? "bg-gradient-to-tr from-primary/40 to-purple-100 text-primary animate-fadeInLeftToRight"
              : ""
          }`}
          style={{
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => {
            if (activeFeature !== Features.DataAnalytics)
              setActiveFeature(Features.DataAnalytics);
          }}
        >
          <BarChartBig width={40} height={40} />
          <p className="font-bold text-center">Data analytics</p>
        </div>
      </div>
      <div className="md:columns-2 md:gap-8 flex md:flex-row items-center flex-col w-full min-h-[50vh] lg:px-12">
        {activeFeature === Features.CustomStyling && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-slideInBottom">
              <p className="font-logo text-3xl">Styling to match your brand</p>
              <p className="text-lg">
                Choose from 8 different popup templates, select custom colors,
                change text content, and create a feel to match your own
                personal brand.
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center w-full md:mb-0 mb-12 justify-center animate-slideInBottom">
              <div className="w-full h-[40vh] bg-gradient-to-tr from-primary/60 to-purple-100 rounded-lg"></div>
            </div>
          </>
        )}
        {activeFeature === Features.Embed && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-slideInBottom">
              <p className="font-logo text-3xl">5-minute, no-code setup</p>
              <p className="text-lg">
                Simply copy the embed script and paste it on the pages you want
                to display your Taplo notifications. No sweat!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center md:mb-0 mb-12 w-full justify-center animate-slideInBottom">
              <div className="w-full h-[40vh] bg-gradient-to-tr from-primary/60 to-purple-100 rounded-lg"></div>
            </div>
          </>
        )}
        {activeFeature === Features.Integrations && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-slideInBottom">
              <p className="font-logo text-3xl">
                Integrate with your favorite services
              </p>
              <p className="text-lg">
                Taplo can integrate with Stripe, Shopify, LemonSqueezy, and
                Google Analytics. More integrations will be coming soon!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center md:mb-0 mb-12 w-full justify-center animate-slideInBottom">
              <div className="w-full h-[40vh] bg-gradient-to-tr from-primary/60 to-purple-100 rounded-lg"></div>
            </div>
          </>
        )}
        {activeFeature === Features.PopupInline && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-slideInBottom">
              <div className="rounded-xl w-fit px-4 py-1 bg-gradient-to-tr from-primary/40 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <p className="font-logo text-3xl">Choose your display method</p>
              <p className="text-lg">
                Taplo notifications can either appear as a popup or as inline
                text directly on the page. Choose whichever works best with your
                project!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center md:mb-0 mb-12 w-full justify-center animate-slideInBottom">
              <div className="w-full h-[40vh] bg-gradient-to-tr from-primary/60 to-purple-100 rounded-lg"></div>
            </div>
          </>
        )}
        {activeFeature === Features.DataAnalytics && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-slideInBottom">
              <div className="rounded-xl w-fit px-4 py-1 bg-gradient-to-tr from-primary/40 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <p className="font-logo text-3xl">
                Collect data, understand your users
              </p>
              <p className="text-lg">
                View insights to understand how your visitors are interacting
                with the Taplo notifications on your page.
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center md:mb-0 mb-12 w-full justify-center animate-slideInBottom">
              <div className="w-full h-[40vh] bg-gradient-to-tr from-primary/60 to-purple-100 rounded-lg"></div>
            </div>
          </>
        )}
      </div>
      <Link href={"/signup"}>
        <div
          className={`btn btn-lg btn-primary mb-12 text-white max-w-fit ${
            isAnimate ? "animate-slideInBottom" : ""
          }`}
        >
          Get started for free
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

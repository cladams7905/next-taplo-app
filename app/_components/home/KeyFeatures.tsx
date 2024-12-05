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
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";

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

  //Example data for linechart
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const clicks = [50, 100, 150, 200, 250, 300, 400];
  const impressions = [300, 400, 450, 500, 600, 650, 700];

  return (
    <div className="flex flex-col items-center py-12 w-full min-h-[100vh] gap-12 font-sans lg:px-32 sm:px-8 px-4 z-10 bg-white/60 shadow-lg rounded-lg">
      <p id="key-features" className="uppercase font-logo text-lg">
        Key Features
      </p>
      <div className="flex overflow-x-scroll lg:justify-center w-full md:gap-12 gap-0 items-center !font-sans">
        <div
          className={`flex flex-col h-fit items-center justify-center w-fit min-w-[120px] sm:text-md text-sm gap-3 mb-4 p-4 !pl-0 rounded-lg hover:translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.CustomStyling
              ? "text-primary animate-fadeInLeftToRight"
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
          <p className="text-center">Custom styling</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center w-fit min-w-[120px] sm:text-md text-sm gap-3 mb-4 p-4 rounded-lg hover:translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.Embed
              ? "text-primary animate-fadeInLeftToRight"
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
          <p className="text-center">Single-line embed</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center w-fit min-w-[120px] sm:text-md text-sm gap-3 mb-4 p-4 rounded-lg hover:translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.Integrations
              ? "text-primary animate-fadeInLeftToRight"
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
          <p className="text-center">2+ integrations</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center w-fit min-w-[120px] sm:text-md text-sm gap-3 mb-4 p-4 rounded-lg hover:translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.PopupInline
              ? "text-primary animate-fadeInLeftToRight"
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
          <p className="text-center">8 Popup Templates</p>
        </div>
        <div
          className={`flex flex-col h-fit items-center justify-center w-fit min-w-[120px] sm:text-md text-sm gap-3 mb-4 p-4 rounded-lg hover:translate-y-1 transition-transform cursor-pointer ${
            activeFeature === Features.DataAnalytics
              ? "text-primary animate-fadeInLeftToRight"
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
          <p className="text-center">Data analytics</p>
        </div>
      </div>
      <div className="md:columns-2 md:gap-8 flex md:flex-row items-center flex-col w-full min-h-[50vh] lg:px-12">
        {activeFeature === Features.CustomStyling && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-twSlideInBottom">
              <p className="font-logo md:text-3xl text-2xl">
                Styling to match your brand
              </p>
              <p className="md:text-lg text-md">
                Adjust popup sizing, select custom colors, change text content,
                and create a feel to match your own personal brand.
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center w-full md:mb-0 mb-12 justify-center animate-twSlideInBottom shadow-lg rounded-lg">
              <video
                width="600"
                controls
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg"
              >
                <source src="/videos/AdjustStyling.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
        {activeFeature === Features.Embed && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-twSlideInBottom">
              <p className="font-logo md:text-3xl text-2xl">
                5-minute, no-code setup
              </p>
              <p className="md:text-lg text-md">
                Simply copy the embed script and paste it on the pages you want
                to display your Taplo notifications. No sweat!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center w-full md:mb-0 mb-12 justify-center animate-twSlideInBottom shadow-lg rounded-lg">
              <video
                width="600"
                controls
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg"
              >
                <source src="/videos/PreviewEmbed.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
        {activeFeature === Features.Integrations && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-twSlideInBottom">
              <p className="font-logo md:text-3xl text-2xl">
                Integrate with your favorite services
              </p>
              <p className="md:text-lg text-md">
                Taplo can currently integrate with Stripe and Google Analytics.
                More integrations will be coming soon!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center w-full md:mb-0 mb-12 justify-center animate-twSlideInBottom shadow-lg rounded-lg">
              <video
                width="600"
                controls
                autoPlay
                loop
                muted
                playsInline
                onLoadedMetadata={(e) => {
                  const videoElement = e.target as HTMLVideoElement;
                  setTimeout(() => {
                    videoElement.currentTime = 14; // Set the start time to 14 seconds
                  }, 2000); // Delay of 50 milliseconds
                }}
                className="rounded-lg"
              >
                <source src="/videos/AddIntegration.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
        {activeFeature === Features.PopupInline && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-twSlideInBottom">
              <p className="font-logo md:text-3xl text-2xl">
                Choose your display method
              </p>
              <p className="md:text-lg text-md">
                Choose from one of 8 different popup templates to determine how
                your popup appears on the page. Inline styles are also coming
                soon!
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center w-full md:mb-0 mb-12 justify-center animate-twSlideInBottom shadow-lg rounded-lg">
              <video
                width="600"
                controls
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg"
              >
                <source src="/videos/SelectTemplate.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
        {activeFeature === Features.DataAnalytics && (
          <>
            {" "}
            <div className="flex flex-col order-2 lg:min-h-[50vh] w-full justify-center gap-6 animate-twSlideInBottom">
              <div className="badge badge-primary badge-outline bg-transparent rounded-xl w-fit px-4 py-1 text-sm">
                Coming soon!
              </div>
              <p className="font-logo md:text-3xl text-2xl">
                Collect data, understand your users
              </p>
              <p className="md:text-lg text-md">
                View insights to understand how your visitors are interacting
                with the Taplo notifications on your page.
              </p>
            </div>
            <div className="flex flex-col max-w-[450px] order-1 items-center md:mb-0 mb-12 w-full justify-center animate-twSlideInBottom shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <LineChart
                labels={labels}
                clicks={clicks}
                impressions={impressions}
              />
            </div>
          </>
        )}
      </div>
      <Link href={"/signup"}>
        <div
          className={`btn md:!btn-lg rounded-lg btn-md btn-primary sm:w-fit text-white ${
            isAnimate ? "animate-twSlideInBottom" : ""
          }`}
        >
          Get started for free
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/_components/home/Footer";
import Navbar from "@/app/_components/home/Navbar";
import KeyFeatures from "@/app/_components/home/KeyFeatures";
import Integrations from "@/app/_components/home/Integrations";
import Pricing from "@/app/_components/home/Pricing";
import FAQs from "@/app/_components/home/FAQs";
import Image from "next/image";
import { getURL } from "@/lib/actions";
import Script from "next/script";
import StripeLogo from "@/public/images/providers/stripe-big.png";
import GoogleAnalyticsLogo from "@/public/images/providers/ga-big.png";

export default function Home() {
  return (
    <main>
      <div id="taplo-widget-container" data-project-id="160"></div>
      <Script
        src={`${getURL()}/scripts/main.bundle.js`}
        strategy="lazyOnload"
      />
      <div className="drawer flex flex-col overflow-x-clip">
        <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Suspense fallback="...">
            <Navbar />
          </Suspense>
          <div className="relative flex h-fit w-full flex-col items-center justify-between px-6 sm:!px-12 md:px-24 overflow-x-clip font-sans bg-gradient-to-tr from-primary to-pink-100 space-y-12 gap-8 pb-24">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="z-[2] relative flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
              <div className="flex flex-1 flex-col justify-center items-center gap-12 xl:px-44 lg:w-1/2 w-full min-h-[80vh]">
                <div className="flex flex-col gap-10 relative md:pt-48 pt-24">
                  {" "}
                  <h1 className="font-bold font-logo md:!text-5xl sm:!text-4xl !text-3xl text-center !leading-tight">
                    <span className="relative">
                      {" "}
                      Boost conversions
                      <div className="w-full sm:h-4 h-3 rounded-lg bg-primary/60 absolute md:top-10 sm:top-7 top-6 left-0 -z-10" />
                    </span>{" "}
                    &{" "}
                    <span className="relative">
                      credibility
                      <div className="w-full sm:h-4 h-3 rounded-lg bg-primary/60 absolute left-0 md:top-10  sm:top-7 top-6 -z-10" />
                    </span>{" "}
                    with the #1 social proof plugin.
                  </h1>
                  <p className="md:text-xl lg:px-32 text-md pr-4 text-center">
                    Add Taplo&apos;s plugin to your site to show off real-time
                    data to your users&mdash;no coding skills required.
                  </p>
                </div>
                <div className="flex lg:flex-row md:flex-row w-full flex-col items-center justify-center mb-2 lg:gap-16 md:gap-16 gap-8 mt-4">
                  <div className="flex flex-col gap-2 w-full md:w-fit items-center">
                    <Link href={"/signup"}>
                      <div className="btn md:!btn-lg rounded-lg btn-md btn-primary sm:w-fit text-white">
                        Get started for free
                        <ArrowRight />
                      </div>
                    </Link>
                    <p className="italic mt-2 sm:text-md text-sm">
                      <span className="font-bold">25</span> marketers love using
                      Taplo
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <p className="text-sm font-bold text-base-content/60">
                    Integrates with
                  </p>
                  <div className="flex w-full items-center justify-center gap-20">
                    <Image
                      src={StripeLogo}
                      alt="stripe"
                      width={75}
                      height={50}
                    />
                    <Image
                      src={GoogleAnalyticsLogo}
                      alt="google-analytics"
                      width={75}
                      height={50}
                    />
                  </div>
                </div>
              </div>
            </div>
            <KeyFeatures />
            <Integrations />
            <Pricing />
            <FAQs />
            <div className="relative flex bg-white/70 rounded-lg shadow-lg lg:h-[65vh] h-[100vh] w-full flex-col items-center justify-center px-8 gap-8 overflow-x-clip font-sans">
              <div className="relative z-[4] flex flex-col items-center justify-center w-full h-full gap-6">
                {" "}
                <p className="text-3xl font-logo text-center">
                  Boost your conversion rate overnight with Taplo.
                </p>
                <p className="md:text-xl text-lg text-center md:px-24">
                  Just create an account, add a new Taplo project, customize
                  your notifications, and embed your script. It only takes 5
                  minutes!
                </p>
                <Link href={"/signup"}>
                  <div className="btn lg:btn-lg rounded-lg btn-md btn-primary w-full sm:w-fit text-white">
                    Get started for free
                    <ArrowRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div className="drawer-side z-[99]">
          <label
            htmlFor="drawer-menu"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-lg min-h-full w-80 p-4 font-sans">
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"#key-features"}>Features</Link>
            </li>
            <li>
              <Link href={"#pricing"}>Pricing</Link>
            </li>
            <li>
              <Link href={"#faqs"}>FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

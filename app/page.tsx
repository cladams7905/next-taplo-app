import { Suspense } from "react";
import { ArrowRight, Dot, Star } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/_components/home/Footer";
import Navbar from "@/app/_components/home/Navbar";
import KeyFeatures from "@/app/_components/home/KeyFeatures";
import Integrations from "@/app/_components/home/Integrations";
import LaunchOfferBadge from "@/app/_components/home/LaunchOfferBadge";
import Pricing from "@/app/_components/home/Pricing";
import FAQs from "@/app/_components/home/FAQs";
import Image from "next/image";
import Logo from "@/public/images/Taplo-logo (3).svg";
import { getURL } from "@/lib/actions";
import Script from "next/script";

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
          <div className="relative flex lg:h-[400vh] h-fit w-full flex-col items-center justify-between px-8 md:px-24 lg:px-24 pt-20 overflow-x-clip font-sans bg-gradient-to-tr from-pink-100 via-primary/50 to-pink-100">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="z-[2] relative flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
              <div className="flex flex-1 flex-col justify-center items-center gap-12 md:gap-16 lg:gap-20 lg:px-64 lg:w-1/2 w-full min-h-[80vh]">
                <div className="flex flex-col gap-10">
                  {" "}
                  <h1 className="font-bold font-logo text-6xl text-center">
                    Social proof, made easy.
                  </h1>
                  <p className="lg:text-xl text-lg pr-4 text-center">
                    Keep your users in the loop with real-time insights that
                    boost your site&apos;s credibility and improve your
                    conversion rate.
                  </p>
                </div>
                <div className="flex lg:flex-row md:flex-row w-full flex-col items-center justify-center mb-2 lg:gap-16 md:gap-16 gap-8">
                  <div className="flex flex-col gap-2 w-full md:w-fit items-center">
                    <Link href={"/signup"} className="w-full">
                      <div className="btn lg:btn-lg rounded-lg btn-md btn-primary w-full md:w-fit lg:w-fit text-white">
                        Get started for free
                        <ArrowRight />
                      </div>
                    </Link>
                    <p className="text-sm lg:ml-6">
                      5-minute setup + free trial!
                    </p>
                  </div>
                  {/* <div className="flex flex-col items-center text-sm gap-2">
                    <div className="flex flex-row gap-1 items-center">
                      {" "}
                      <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                      <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                      <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                      <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                      <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                    </div>
                    <p>
                      Join <span className="font-bold">25</span> others using
                      Taplo
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div
              className="absolute md:block hidden flex-wrap gap-3 h-full top-0 bg-white/20 w-[110vw]"
              style={{
                clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
              }}
            ></div> */}
          </div>
          <div className="relative flex z-[5] flex-col items-center justify-center w-full min-h-[55vh] bg-base-content lg:px-80 md:px-24 py-12 md:pt-6 pt-12 px-8 mb-12 gap-12 overflow-x-clip">
            <div className="flex flex-col items-center gap-4">
              {" "}
              <p className="text-white uppercase font-logo text-lg">
                Why Taplo?
              </p>
              <div className="flex flex-row items-center gap-1">
                {" "}
                <Dot color="oklch(var(--s))" width={40} height={40} />
                <Dot color="oklch(var(--s))" width={40} height={40} />
                <Image
                  width={36}
                  height={36}
                  src={Logo}
                  alt="Logo"
                  className="rounded-full"
                />
                <Dot color="oklch(var(--s))" width={40} height={40} />
                <Dot color="oklch(var(--s))" width={40} height={40} />
              </div>
            </div>
            <p className="md:text-xl text-lg text-white font-sans">
              The fastest way to get more conversions on your site is by using
              social proof. With Taplo, vistors get to see personalized social
              proof notifications at a fraction of the cost of similar
              platforms.
            </p>
            <p className="md:text-xl text-lg text-white font-sans">
              With Taplo,{" "}
              <span className="font-bold">
                every new customer on your site is working to boost your
                conversions.
              </span>
            </p>
          </div>
          <KeyFeatures />
          <Integrations />
          <Pricing />
          <FAQs />
          <div
            className="relative flex lg:h-[65vh] h-[100vh] w-full flex-col items-center justify-center lg:p-64 lg:px-[370px] px-8 gap-8 overflow-x-clip
      bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100 font-sans"
          >
            <div className="relative z-[4] flex flex-col items-center justify-center w-full h-full gap-6">
              {" "}
              <p className="text-3xl font-logo text-center">
                Boost your conversion rate overnight with Taplo.
              </p>
              <p className="md:text-xl text-lg text-center">
                Just create an account, add a new Taplo project, customize your
                notifications, and embed your script. It only takes 5 minutes!
              </p>
              <Link href={"/signup"}>
                <div className="btn btn-lg btn-primary text-white max-w-fit mt-6">
                  Get started for free
                  <ArrowRight />
                </div>
              </Link>
            </div>
            <div
              className="absolute z-[0] flex flex-wrap gap-3 h-full top-0 bg-white/20 pt-32 w-[110vw]"
              style={{
                clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)",
              }}
            ></div>
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

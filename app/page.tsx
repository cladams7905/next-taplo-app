import { Suspense } from "react";
import { ArrowRight, Dot, Star } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import KeyFeatures from "@/components/home/KeyFeatures";
import Integrations from "@/components/home/Integrations";
import PopupDemo from "@/components/home/PopupDemo";
import LaunchOfferBadge from "@/components/home/LaunchOfferBadge";
import Pricing from "@/components/home/Pricing";
import FAQs from "@/components/home/FAQs";
import Image from "next/image";
import Logo from "@/public/images/Taplo-logo (3).svg";

export default function Home() {
  return (
    <main>
      <Suspense fallback="...">
        <Navbar />
      </Suspense>
      <div
        className="relative flex lg:h-[95vh] h-[100vh] w-full flex-col items-center justify-between p-24 overflow-x-clip
      bg-gradient-to-tr from-purple-200 via-primary/80 to-purple-100 font-sans"
      >
        <div className="z-[2] relative flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center items-center lg:px-64 lg:w-1/2 w-fit min-w-[330px] h-[80vh]">
            <LaunchOfferBadge />
            <h1 className="font-logo text-5xl my-12">
              Boost conversions & gain trust with real-time sales popups.
            </h1>
            <p className="text-xl mb-12 pr-4">
              Taplo's simple, automated social proof plugin allows you to
              effortlessly turn new visitors on your site into paying customers.
            </p>
            <div className="flex flex-row items-center mb-2 gap-16">
              <div className="flex flex-col gap-2">
                <Link href={"/signup"}>
                  <div className="btn btn-lg btn-primary text-white max-w-fit">
                    Get started for free
                    <ArrowRight />
                  </div>
                </Link>
                <p className="text-sm ml-6">2-minute setup + free plan!</p>
              </div>
              <div className="flex flex-col items-center text-sm gap-2">
                <div className="flex flex-row gap-1 items-center">
                  {" "}
                  <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                  <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                  <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                  <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                  <Star fill="oklch(var(--s))" color="oklch(var(--s))" />
                </div>
                <p>
                  Join <span className="font-bold">25</span> others using Taplo
                </p>
              </div>
            </div>
          </div>
        </div>
        <PopupDemo />
        <div
          className="absolute flex flex-wrap gap-3 h-[100vh] top-0 bg-white/30 w-[110vw]"
          style={{
            clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
          }}
        ></div>
      </div>
      <div className="relative flex z-[5] flex-col items-center justify-center w-full min-h-[55vh] bg-base-content lg:px-64 py-12 pt-6 mb-12 gap-12">
        <div className="flex flex-col items-center gap-4">
          {" "}
          <p className="text-white uppercase font-logo text-lg">Why Taplo?</p>
          <div className="flex flex-row items-center gap-1">
            {" "}
            <Dot color="oklch(var(--s))" width={40} height={40} />
            <Dot color="oklch(var(--s))" width={60} height={60} />
            <Image
              width={60}
              height={60}
              src={Logo}
              alt="Logo"
              className="rounded-full"
            />
            <Dot color="oklch(var(--s))" width={60} height={60} />
            <Dot color="oklch(var(--s))" width={40} height={40} />
          </div>
        </div>
        <p className="text-xl text-white font-sans">
          The fastest way to convert leads into sales on your site is by using
          social proof. With Taplo, vistors get to see personalized
          notifications at a fraction of the cost of other social proof
          platforms.
        </p>
        <p className="text-xl text-white font-sans">
          With Taplo,{" "}
          <span className="font-bold">
            every customer on your site is working to boost your conversions.
          </span>
        </p>
      </div>
      <KeyFeatures />
      <Integrations />
      <Pricing />
      <FAQs />
      <div
        className="relative flex lg:h-[65vh] h-[100vh] w-full flex-col items-center justify-center p-64 lg:px-96 gap-8 overflow-x-clip
      bg-gradient-to-tr from-purple-200 via-primary/60 to-purple-100 font-sans"
      >
        <div className="flex flex-col items-center justify-center w-full h-full gap-6 z-10">
          {" "}
          <p className="text-3xl font-logo">
            Boost your conversion rate instantly with Taplo.
          </p>
          <p className="text-xl text-center">
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
          className="absolute flex flex-wrap gap-3 h-full top-0 bg-white/30 pt-32 w-[110vw]"
          style={{
            clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 20% 100%)",
          }}
        ></div>
      </div>
      <Footer />
    </main>
  );
}

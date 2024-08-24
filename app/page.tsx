import Image from "next/image";
import { Suspense } from "react";
import {
  ArrowRight,
  BarChartBig,
  CodeXml,
  Dot,
  LoaderCircle,
  Paintbrush,
  Proportions,
  Share2,
  Star,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Suspense fallback="...">
        <Navbar />
      </Suspense>
      <div
        className="relative flex h-screen w-full flex-col items-center justify-between p-24
      bg-gradient-to-tr from-purple-200 via-primary/50 to-purple-100"
      >
        <div className="z-[2] relative flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center items-center lg:px-64 lg:w-1/2 w-fit min-w-[330px] h-[80vh]">
            <div className="rounded-xl px-4 py-1 bg-gradient-to-tr from-primary/40 to-purple-100 mb-12 shadow-md">
              <span className="font-bold mx-1">🚀 Launch offer:</span>
              <span className="font-bold text-primary mx-1">$50 off </span>for
              the next
              <span className="font-bold text-primary mx-1">90</span>customers.
            </div>
            <h1 className="font-logo text-5xl mb-12">
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
                  Join <span className="font-bold">10</span> others using Taplo
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-8 bottom-40 shadow-md z-[10] font-sans flex items-center p-3 bg-white/80 backdrop-blur-lg rounded-lg">
          <p>Get this on your own site with Taplo!</p>
        </div>
        <div
          className="absolute flex flex-wrap gap-3 h-full bg-white/80 top-0 pt-32 w-[80vw]"
          style={{
            clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
          }}
        ></div>
      </div>
      <div className="flex flex-col items-center w-full min-h-[50vh] bg-base-content lg:px-64 py-12 gap-12">
        <div className="flex flex-col items-center gap-4">
          {" "}
          <p className="text-white uppercase font-logo text-lg">Why Taplo?</p>
          <div className="flex flex-row items-center gap-1">
            {" "}
            <Dot color="oklch(var(--s))" width={40} height={40} />
            <Dot color="oklch(var(--s))" width={60} height={60} />
            <Dot color="oklch(var(--s))" width={40} height={40} />
            <Dot color="oklch(var(--s))" width={60} height={60} />
            <Dot color="oklch(var(--s))" width={40} height={40} />
            <Dot color="oklch(var(--s))" width={60} height={60} />
            <Dot color="oklch(var(--s))" width={40} height={40} />
          </div>
        </div>
        <p className="text-xl text-white font-sans">
          The fastest way to convert leads into sales on your site is by using
          social proof. With Taplo, vistors get to see real customer
          interactions at a fraction of the cost of other social proof
          platforms.
        </p>
        <p className="text-xl text-white font-sans">
          With Taplo,{" "}
          <span className="font-bold">
            every customer on your site is working to boost your sales.
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center py-12 w-full min-h-[100vh] gap-12 font-sans lg:px-32 bg-gradient-to-b from-white via-white to-primary/30">
        <p className="uppercase font-logo text-lg">Key Features</p>
        <div className="flex flex-wrap w-full gap-12 items-center justify-center">
          <div className="flex flex-col h-fit items-center justify-center gap-3 mb-4">
            <Paintbrush width={40} height={40} />
            <p className="font-bold">Custom styling</p>
          </div>
          <div className="flex flex-col h-fit items-center justify-center gap-3 mb-4">
            <CodeXml width={40} height={40} />
            <p className="font-bold">Single-line embed</p>
          </div>
          <div className="flex flex-col h-fit items-center justify-center gap-3 mb-4">
            <Share2 width={40} height={40} />
            <p className="font-bold">4+ integrations</p>
          </div>
          <div className="flex flex-col h-fit items-center justify-center gap-3 mb-4">
            <Proportions width={40} height={40} />
            <p className="font-bold">Popup & inline</p>
          </div>
          <div className="flex flex-col h-fit items-center justify-center gap-3 mb-4">
            <BarChartBig width={40} height={40} />
            <p className="font-bold">Data analytics</p>
          </div>
        </div>
        <div className="flex flex-col items-center h-[50vh] justify-center gap-6 lg:px-64">
          <p className="font-logo text-3xl">Styling to match your brand</p>
          <p className="text-lg">
            Choose from 8 different popup templates, select custom colors, and
            create a feel to match your own personal brand.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center bg-primary/30 py-12 w-full min-h-[100vh] gap-12 font-sans lg:px-32"></div>
      <Footer />
    </main>
  );
}

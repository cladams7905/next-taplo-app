import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
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
        className="flex min-h-screen w-full flex-col items-center justify-between p-24
      bg-gradient-to-br from-white via-white to-secondary/45"
      >
        <div className="flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center lg:w-1/2 w-fit min-w-[330px] h-[80vh]">
            <h1 className="font-bold text-5xl mb-12">
              Turn visitors into customers with real-time sales popups.
            </h1>
            <p className="text-xl mb-12 text-gray-500">
              Increase your customer conversion rate with fully-customizable,
              real-time toast notifications for each sale or subscription you
              make.
            </p>
            <div className="flex flex-row mb-2">
              <Link href={"/auth/signup"}>
                <div className="btn btn-lg btn-primary max-w-fit">
                  Get started for free
                  <ArrowRight />
                </div>
              </Link>
              <div className="btn btn-lg btn-outline max-w-fit ml-4">
                <PlayCircle /> Watch a demo
              </div>
            </div>
            <p className="text-gray-500 text-sm ml-6">
              2 minute setup + Free plan!
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center lg:w-1/2 w-full min-w-[400px] h-3/5 "></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

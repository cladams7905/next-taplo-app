import Image from "next/image";
import UsersightPopup from "@/components/shared/usersightPopup";
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
      bg-gradient-to-br from-slate-100 via-white to-cyan-100"
      >
        {/* <UsersightPopup/> */}
        <div className="flex flex-row flex-wrap font-sans lg:mb-32 md:mb-16 sm:mb-12 lg:gap-12 md:gap-8 sm:gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col justify-center lg:w-1/2 w-fit min-w-[330px] h-[80vh]">
            <h1 className="font-bold text-7xl mb-12">
              Add One-Tap Surveys To Your Website.
            </h1>
            <p className="text-xl mb-12 text-gray-500">
              Build simple and intuitive one-tap surveys, embed them on your
              website, and collect valuable insights from your users.
            </p>
            <div className="flex flex-row mb-2">
              <Link href={"/auth/signup"}>
                <div className="btn btn-lg btn-primary max-w-fit">
                  Make a survey
                  <ArrowRight />
                </div>
              </Link>
              <div className="btn btn-lg btn-outline max-w-fit ml-4">
                <PlayCircle /> Watch a demo
              </div>
            </div>
            <p className="text-gray-400 text-sm ml-6">
              No credit card required
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center lg:w-1/2 w-full min-w-[400px] h-3/5 "></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

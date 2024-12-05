"use client";

import {
  ArrowRight,
  Eye,
  Mail,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Integrations() {
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsMediumScreen(window.matchMedia("(min-width: 768px)").matches);
    };

    updateMedia(); // Initial check
    window.addEventListener("resize", updateMedia);

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className="flex flex-col items-center py-12 w-full min-h-[100vh] gap-12 font-sans lg:px-32 sm:px-8 px-4 z-10 bg-white/60 shadow-lg rounded-lg">
      <div className="flex flex-col items-center w-full gap-12 font-sans">
        <p className="uppercase font-logo text-lg">Popup Events</p>
        <p className="md:text-lg text-md">
          Taplo supports a variety of different events to display real-time data
          to your users. Below is a list of the currently supported events you
          can activate with your plugin.
        </p>
        <div className="md:columns-2 md:gap-4 md:max-w-full max-w-[450px] flex md:flex-row flex-col w-full">
          <div className="flex flex-col w-full justify-center gap-6">
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <ShoppingBag width={48} height={48} />
              <p className="font-logo text-xl">Purchase</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Let visitors know exactly which products customers are buying,
                when they buy them.
              </p>
              <p className="text-sm !text-base-content">Stripe</p>
            </div>
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <Eye width={48} height={48} />
              <p className="font-logo text-xl">Someone Is Viewing</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Expose which products visitors are currently viewing on your
                site.
              </p>
              <p className="text-sm !text-base-content">Google Analytics</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <div className="absolute right-3 top-3 badge badge-primary badge-outline bg-transparent z-10 md:text-sm text-xs">
                Coming soon!
              </div>
              <Mail width={48} height={48} />
              <p className="font-logo text-xl">Email Signups</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Show off new subscribers to your mailing lists.
              </p>
              <p className="text-sm !text-base-content">Mailchimp, Drip</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <div className="absolute right-3 top-3 badge badge-primary badge-outline bg-transparent z-10 md:text-sm text-xs">
                Coming soon!
              </div>
              <Timer width={48} height={48} />
              <p className="font-logo text-xl">Countdown timer</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Create a sense of urgency to buy your product with a countdown
                timer.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center gap-6 lg:!mt-24 mt-6">
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <UsersRound width={48} height={48} />
              <p className="font-logo text-xl">Active Users</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Reveal how many users are currently browsing on your site.
              </p>
              <p className="text-sm !text-base-content">Google Analytics</p>
            </div>
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <ShoppingCart width={48} height={48} />
              <p className="font-logo text-xl">Checkout Sessions</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Show which products visitors are checking out with.
              </p>
              <p className="text-sm !text-base-content">Stripe</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <div className="absolute right-3 top-3 badge badge-primary badge-outline bg-transparent z-10 md:text-sm text-xs">
                Coming soon!
              </div>
              <Star width={48} height={48} />
              <p className="font-logo text-xl">Product Reviews</p>
              <p className="text-center !text-base-conten md:text-md text-smt">
                Showcase positive reviews about your products or service.
              </p>
              <p className="text-sm !text-base-content">Google Reviews</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-2 transition-transform justify-center hover:outline hover:outline-primary hover:text-primary shadow-md bg-white/60 backdrop-blur-lg p-4 rounded-lg">
              <div className="absolute right-3 top-3 badge badge-primary badge-outline bg-transparent z-10 md:text-sm text-xs">
                Coming soon!
              </div>
              <Sparkles width={48} height={48} />
              <p className="font-logo text-xl">Create Your Own!</p>
              <p className="text-center !text-base-content md:text-md text-sm">
                Want more in-depth control? Connect your own API or webhook to
                listen for events.
              </p>
              <p className="text-sm !text-base-content">Zapier, webhooks</p>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/signup"}>
        <div
          className={`btn md:!btn-lg rounded-lg btn-md btn-primary sm:w-fit text-white`}
        >
          Get started for free
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

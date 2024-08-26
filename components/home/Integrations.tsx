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

export default function Integrations() {
  return (
    <div
      className="flex flex-col items-center bg-gradient-to-tr from-primary/80 to-purple-100 py-12 w-full min-h-[100vh] gap-12 font-sans lg:px-32"
      style={{
        clipPath: "polygon(0 10%, 100% 0%, 100% 100%, 0% 90%)",
      }}
    >
      <div className="flex flex-col items-center py-12 w-full gap-12 font-sans mt-12 lg:px-32">
        <p className="uppercase font-logo text-lg">Cool integrations</p>
        <div className="columns-2 w-full lg:px-16">
          <div className="flex flex-col w-full justify-center gap-6">
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-cyan-50 via-white to-white shadow-md p-4 rounded-lg">
              <ShoppingBag width={48} height={48} />
              <p className="font-logo text-xl">Purchase</p>
              <p className="text-center">
                Let visitors know exactly which products customers are buying,
                when they buy them.
              </p>
              <p className="text-sm">Stripe, Shopify</p>
            </div>
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-orange-50 via-white to-white shadow-md p-4 rounded-lg">
              <Eye width={48} height={48} />
              <p className="font-logo text-xl">Someone Is Viewing</p>
              <p className="text-center">
                Expose which products visitors are currently viewing on your
                site.
              </p>
              <p className="text-sm">Google Analytics</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-purple-100 via-white to-white shadow-md p-4 rounded-lg">
              <div className="absolute right-3 top-3 rounded-xl w-fit px-4 py-1 bg-primary/30 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <Mail width={48} height={48} />
              <p className="font-logo text-xl">Email Signups</p>
              <p className="text-center">
                Show off new subscribers to your mailing lists.
              </p>
              <p className="text-sm">Mailchimp, Drip</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-cyan-50 via-white to-white shadow-md p-4 rounded-lg">
              <div className="absolute right-3 top-3 rounded-xl w-fit px-4 py-1 bg-primary/30 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <Timer width={48} height={48} />
              <p className="font-logo text-xl">Countdown timer</p>
              <p className="text-center">
                Create a sense of urgency to buy your product with a countdown
                timer.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center gap-6">
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] mt-16 hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-purple-100 via-white to-white shadow-md p-4 rounded-lg">
              <UsersRound width={48} height={48} />
              <p className="font-logo text-xl">Active Visitors</p>
              <p className="text-center">
                Reveal how many visitors are currently browsing on your site.
              </p>
              <p className="text-sm">Google Analytics</p>
            </div>
            <div className="flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-cyan-50 via-white to-white shadow-md p-4 rounded-lg">
              <ShoppingCart width={48} height={48} />
              <p className="font-logo text-xl">Added to Cart</p>
              <p className="text-center">
                Show which products visitors have in their cart.
              </p>
              <p className="text-sm">Stripe, Shopify</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-orange-50 via-white to-white shadow-md p-4 rounded-lg">
              <div className="absolute right-3 top-3 rounded-xl w-fit px-4 py-1 bg-primary/30 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <Star width={48} height={48} />
              <p className="font-logo text-xl">Product Reviews</p>
              <p className="text-center">
                Showcase positive reviews about your products or service.
              </p>
              <p className="text-sm">Google Reviews</p>
            </div>
            <div className="relative flex flex-col w-full h-fit items-center gap-3 min-h-[212px] hover:-translate-y-1 transition-transform justify-center bg-gradient-to-tl from-purple-100 via-white to-white shadow-md p-4 rounded-lg">
              <div className="absolute right-3 top-3 rounded-xl w-fit px-4 py-1 bg-primary/30 font-bold to-purple-100 shadow-md">
                Coming soon!
              </div>
              <Sparkles width={48} height={48} />
              <p className="font-logo text-xl">Create Your Own!</p>
              <p className="text-center">
                Want more in-depth control? Connect your own API or webhook to
                listen for events.
              </p>
              <p className="text-sm">Zapier, webhooks</p>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/signup"}>
        <div className="btn btn-lg btn-accent text-white max-w-fit mb-32">
          Get started for free
          <ArrowRight />
        </div>
      </Link>
    </div>
  );
}

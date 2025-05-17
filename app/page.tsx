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
import { getTotalStripeUsers } from "@/lib/stripe/actions";
import SectionDecoration from "./_components/home/SectionDecoration";

export default async function Home() {
  const { data: totalStripeUsers } = await getTotalStripeUsers();
  const totalUsers = totalStripeUsers?.length ?? 0;

  return (
    <main className="overflow-hidden">
      <div id="taplo-widget-container" data-project-id="160"></div>
      <Script
        src={`${getURL()}/scripts/main.bundle.js`}
        strategy="lazyOnload"
      />
      <div className="drawer flex flex-col">
        <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Suspense
            fallback={
              <div className="h-20 w-full bg-slate-50 animate-pulse"></div>
            }
          >
            <Navbar totalUsers={totalUsers} />
          </Suspense>

          {/* Main content */}
          <div className="relative w-full mt-20 bg-slate-50 overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100"></div>

            {/* Hero section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-24 pt-16 md:pt-24 pb-24 md:pb-32">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* Product Hunt badge */}
                  <a
                    href="https://www.producthunt.com/posts/taplo?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-taplo"
                    target="_blank"
                    className="mb-8 transform hover:scale-105 transition-transform duration-300"
                    rel="noreferrer"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=745836&theme=neutral&period=daily&t=1736880960304"
                      alt="Taplo - Customizable social proof widget for SaaS founders | Product Hunt"
                      width="250"
                      height="54"
                      className="shadow-sm rounded"
                    />
                  </a>

                  {/* Headline */}
                  <h1 className="font-bold font-logo text-4xl md:text-6xl leading-tight mb-6">
                    <span className="relative inline-block">
                      Boost conversions
                      <div className="w-full h-3 sm:h-4 rounded-lg bg-primary/60 absolute md:top-12 top-7 left-0 -z-10 transform -rotate-1" />
                    </span>{" "}
                    &{" "}
                    <span className="relative inline-block">
                      credibility
                      <div className="w-full h-3 sm:h-4 rounded-lg bg-primary/60 absolute left-0 md:top-12 top-7 -z-10 transform rotate-1" />
                    </span>{" "}
                    <span className="block mt-2">with social proof</span>
                  </h1>

                  {/* Subheadline */}
                  <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-slate-700">
                    Add Taplo&apos;s plugin to your site to show off real-time
                    data to your users&mdash;no coding skills required.
                  </p>

                  {/* CTA */}
                  <div className="flex flex-col items-center mb-16">
                    <Link href="/signup">
                      <button className="btn btn-primary md:btn-lg rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                        Get started for free
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    <p className="italic mt-3 text-sm text-slate-600">
                      Try it free for 30 days, and then only $4/month.
                    </p>
                  </div>

                  {/* Integration logos */}
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-slate-500 mb-4">
                      Integrates with
                    </p>
                    <div className="flex items-center justify-center gap-16 md:gap-20">
                      <div className="relative group">
                        <Image
                          src={StripeLogo || "/placeholder.svg"}
                          alt="stripe"
                          width={75}
                          height={50}
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute -inset-2 rounded-lg bg-slate-100 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                      </div>
                      <div className="relative group">
                        <Image
                          src={GoogleAnalyticsLogo || "/placeholder.svg"}
                          alt="google-analytics"
                          width={75}
                          height={50}
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute -inset-2 rounded-lg bg-slate-100 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-24 py-16">
              <div className="max-w-6xl mx-auto">
                <KeyFeatures />
              </div>
            </section>

            {/* Integrations section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-24 py-16">
              <div className="max-w-6xl mx-auto">
                <Integrations />
              </div>
            </section>

            {/* Pricing section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-24 py-16">
              <div className="max-w-6xl mx-auto">
                <Pricing />
              </div>
            </section>

            {/* FAQs section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-20 py-16">
              <div className="max-w-6xl mx-auto">
                <FAQs />
              </div>
            </section>

            {/* Final CTA section */}
            <section className="relative z-10 px-6 sm:px-12 md:px-24 py-16 mb-16">
              <div className="max-w-6xl mx-auto">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 overflow-hidden">
                  {/* Background decoration */}
                  <SectionDecoration />

                  <div className="relative z-10 flex flex-col items-center text-center my-6">
                    <h2 className="text-3xl md:text-4xl font-logo mb-6">
                      Boost your conversion rate overnight with Taplo.
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mb-10 text-slate-700">
                      Just create an account, add a new Taplo project, customize
                      your notifications, and embed your script. It only takes 5
                      minutes!
                    </p>
                    <Link href="/signup">
                      <button className="btn btn-primary md:btn-lg rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                        Get started for free
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>

        {/* Mobile drawer */}
        <div className="drawer-side z-[99]">
          <label
            htmlFor="drawer-menu"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white min-h-full w-80 p-6 font-sans shadow-2xl">
            <div className="mb-8 pb-4 border-b">
              <Link href="/" className="text-xl font-logo">
                Taplo
              </Link>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/login"
                  className="flex items-center py-2 hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="#key-features"
                  className="flex items-center py-2 hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="flex items-center py-2 hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faqs"
                  className="flex items-center py-2 hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

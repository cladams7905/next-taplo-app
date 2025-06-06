"use client";

import Link from "next/link";
import SectionDecoration from "./SectionDecoration";

export default function FAQs() {
  return (
    <div className="relative flex flex-col w-full overflow-hidden bg-white/70 rounded-2xl shadow-lg z-10 pt-12 pb-20 gap-8 lg:px-64 sm:px-8 px-4 font-sans">
      {/* Background decoration */}
      <SectionDecoration />
      <div className="flex flex-col items-center gap-4">
        {" "}
        <p id="faqs" className="uppercase font-logo text-lg">
          FAQs
        </p>
      </div>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title md:text-xl text-lg font-medium">
            Who would benefit from using Taplo?
          </div>
          <div className="collapse-content">
            <p>
              Any saas or ecommerce business who wishes to boost their sales or
              conversions would greatly benefit from using Taplo! Since its
              launch, Taplo is quickly gaining the trust of entreprenuers,
              marketers, and many others.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            How much of a conversion boost should I expect?
          </div>
          <div className="collapse-content">
            <p>
              While each Taplo user has varying success rates, users on average
              experience a 5%-10% boost in their conversions after installing
              Taplo&apos;s plugin on their website.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            What integrations does Taplo support?
          </div>
          <div className="collapse-content">
            <p>
              Currently, Taplo supports integrating with Stripe and Google
              Analytics. However, you can expect many more integrations to come
              out in the future!
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            How does Taplo handle privacy?
          </div>
          <div className="collapse-content">
            <p>
              Taplo only stores data related to visitor interactions on a page.
              We do not store visitor&apos;s personal information in our
              database, and we do not sell data to any 3rd parties.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            Can I get a refund?
          </div>
          <div className="collapse-content">
            <div>
              Refunds are accepted if they are requested within 7 days of the
              initial payment. To request a refund, please email{" "}
              <Link
                href={`mailto:team@taplo.io?subject=Refund%20request`}
                target="_blank"
                className="link"
              >
                team@taplo.io
              </Link>
              . Should you wish to cancel your subscription, you can do so at
              any time from your &quot;Account&quot; page.
            </div>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            Can I hide notifications older than X days?
          </div>
          <div className="collapse-content">
            <p>
              Yes! You can choose how many days you wish to display
              notifications before they expire. All of this can be adjusted from
              the settings on the &quot;Create&quot; page.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent rounded-none border-b border-base-content">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title md:text-xl text-lg font-medium">
            How can I get in contact?
          </div>
          <div className="collapse-content">
            Should you wish to get in contact with a business inquiry or other
            question, you can email me at{" "}
            <Link
              href={`mailto:team@taplo.io?subject=Business%20inquiry`}
              target="_blank"
              className="link link-primary"
            >
              team@taplo.io
            </Link>
            . You can typically expect a response within 24 hours.
          </div>
        </div>
      </div>
    </div>
  );
}

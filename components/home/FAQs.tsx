"use client";

import { Dot } from "lucide-react";
import Logo from "@/public/images/Taplo-logo (3).svg";
import Image from "next/image";

export default function FAQs() {
  return (
    <div className="flex flex-col w-full bg-accent pt-12 pb-20 gap-8 lg:px-64 font-sans">
      <div className="flex flex-col items-center gap-4">
        {" "}
        <p className="text-white uppercase font-logo text-lg">FAQs</p>
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
      <div className="flex flex-col w-full items-center gap-4">
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Who would benefit from using Taplo?
          </div>
          <div className="collapse-content">
            <p>
              Any saas or ecommerce business who wishes to boost their sales or
              conversions would greatly benefit from using Taplo! Since its
              launch, Taplo is quickly gaining the trust of entreprenuers,
              marketers, and many other users.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How much of a conversion boost should I expect?
          </div>
          <div className="collapse-content">
            <p>
              While each Taplo user has varying success rates, users on average
              experience a 10%-15% boost in their conversions after installing
              Taplo&apos;s plugin on their website.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            What integrations does Taplo support?
          </div>
          <div className="collapse-content">
            <p>
              Currently, Taplo supports integrating with Stripe, LemonSqueezy,
              Shopify, and Google Analytics. However, you can expect many more
              integrations to come out in the future!
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How does Taplo handle privacy?
          </div>
          <div className="collapse-content">
            <p>
              Taplo only stores data related to visitor interactions on a page.
              We do not store visitor&apos;s personal information, and we do not
              sell data to any 3rd parties.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I get a refund?
          </div>
          <div className="collapse-content">
            <p>
              Refunds are accepted if they are requested within 7 days of the
              initial payment. To request a refund, please email *EMAIL*. Should
              you wish to cancel your subscription, you can do so at any time
              from your &quot;Account&quot; page.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
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
        <div className="collapse collapse-plus bg-transparent text-white rounded-none border-b border-white/40">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How can I get in contact?
          </div>
          <div className="collapse-content">
            <p>
              Should you wish to get in contact with a business inquiry or other
              question, you can email me at *EMAIL*. You can typically expect a
              response within 24 hours Monday thru Friday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

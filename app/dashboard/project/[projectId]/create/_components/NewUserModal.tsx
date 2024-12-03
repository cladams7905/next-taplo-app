"use client";

import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { updateUserMetadata } from "@/lib/actions/users";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { RefObject, useState } from "react";

export default function NewUserModal({
  user,
  userGuideRef,
  hasViewedNewUserGuide,
}: {
  user: User;
  userGuideRef: RefObject<HTMLDialogElement>;
  hasViewedNewUserGuide: boolean;
}) {
  const [activeSlide, setActiveSlide] = useState(1);

  const navigateToSlide = (slideNumber: number) => {
    setActiveSlide(slideNumber);
  };

  const closeNewUserGuide = async () => {
    userGuideRef.current?.close();
    setActiveSlide(1);
    if (!hasViewedNewUserGuide) {
      const { data, error } = await updateUserMetadata({
        hasViewedNewUserGuide: true,
      });
      if (error) {
        showToastError(error);
      } else {
        user.user_metadata.hasViewedNewUserGuide = true;
        showToast(
          'Click on the Help menu in the top-right hand corner to view the "Getting Started Guide" again.'
        );
      }
    }
  };
  return (
    <dialog
      id="new_user_modal"
      className="modal modal-top !bg-inherit min-h-[350px]"
      ref={userGuideRef}
    >
      <div className="modal-box !max-w-[375px] !left-4 !top-4 absolute">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
            onClick={closeNewUserGuide}
          >
            ✕
          </button>
        </form>
        <div className="carousel mt-4 w-full flex gap-4">
          <div
            className={`carousel-item ${
              activeSlide === 1 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <p className="text-lg font-logo">Getting Started Guide</p>
            <p className="text-sm text-gray-500 text-center">
              Not sure where to get started with your new project? This guide
              will show you how to:{" "}
            </p>
            <ol
              type="1"
              className="list-decimal list-inside noflex-list text-primary space-y-3"
            >
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(2)}
              >
                Create an Event
              </li>
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(3)}
              >
                Add an Integration
              </li>
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(4)}
              >
                Add Products
              </li>
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(5)}
              >
                Select a Template
              </li>
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(6)}
              >
                Adjust Styling
              </li>
              <li
                className="link link-primary"
                onClick={() => navigateToSlide(7)}
              >
                Preview and Embed
              </li>
            </ol>
            <div className="w-full">
              <div
                className="btn btn-primary max-w-[290px] w-full"
                onClick={() => navigateToSlide(2)}
              >
                Get started!
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 2 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">1. Create an Event</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/Create_Events.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="ml-4 text-gray-500 text-sm">
              To get started configuring your social proof plugin, first create
              an event. Events allow you to specify what types of information
              you can display to your users. You can show off recent purchases,
              top products, and more!
            </p>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(1)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(3)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 3 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">2. Add an Integration</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/AddIntegration.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-6 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Events require an integration to display real data to your
                site&apos;s visitors. Follow the walkthrough guide for each
                integration to learn how to connect different services to
                Taplo&apos;s platform. You can also create new integrations from
                the <span className="font-bold">Connect</span> page.
              </p>
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(2)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(4)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 4 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">3. Add Products</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/AddProducts.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-4 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Taplo allows you to showcase your products within your popup
                notifications. Simply sync your products from Stripe and add
                them to your Taplo project! You can also create products
                manually, if needed.
              </p>
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(3)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(5)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 5 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">4. Select a Template</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/SelectTemplate.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-4 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Choose from one of 4 different popup templates. Each template is
                fully customizable!
              </p>
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(4)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(6)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 6 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">5. Adjust Styling</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/AdjustStyling.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-6 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Adjust colors, screen alignment, and more from the sidebar to
                match your website&apos;s own style and branding.
              </p>
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(5)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(7)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 7 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <div className="text-xl font-logo">6. Preview and Embed</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg"
            >
              <source src="/videos/PreviewEmbed.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-6 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Once you are happy with your project configuration, you can
                preview your popup notifications and copy the code to embed your
                project from the toolbar.
              </p>
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(6)}
              >
                ❮
              </div>
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(8)}
              >
                ❯
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${
              activeSlide === 8 ? "block" : "hidden"
            } relative w-full flex flex-col items-center gap-6 font-sans`}
          >
            <p className="text-lg font-logo">You&apos;re ready to go!</p>
            <div className="text-sm text-gray-500 text-center inline-block">
              If you have any additional questions, be sure to check out the{" "}
              <span className="font-bold">Help</span> menu to view the Taplo
              docs, or send your questions to{" "}
              <Link
                href={`mailto:help@taplo.io`}
                target="_blank"
                className="link link-primary inline"
              >
                help@taplo.io
              </Link>{" "}
              .
            </div>
            <div className="flex gap-4 justify-between">
              <div
                className="btn btn-circle"
                onClick={() => navigateToSlide(7)}
              >
                ❮
              </div>
              <div
                className="btn btn-primary w-[215px]"
                onClick={closeNewUserGuide}
              >
                Finish
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

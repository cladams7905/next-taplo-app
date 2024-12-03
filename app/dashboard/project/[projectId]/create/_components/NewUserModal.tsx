"use client";

import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { updateUserMetadata } from "@/lib/actions/users";
import Link from "next/link";
import React, { RefObject, useEffect, useRef } from "react";

export default function NewUserModal({
  userGuideRef,
  hasViewedNewUserGuide,
}: {
  userGuideRef: RefObject<HTMLDialogElement>;
  hasViewedNewUserGuide: boolean;
}) {
  const closeNewUserGuide = async () => {
    userGuideRef.current?.close();

    // Remove the # anchor from the URL
    const currentUrl = window.location.href;
    const newUrl = currentUrl.split("#")[0];
    window.history.replaceState({}, document.title, newUrl);

    if (!hasViewedNewUserGuide) {
      const { data, error } = await updateUserMetadata({
        hasViewedNewUserGuide: true,
      });
      if (error) {
        showToastError(error);
      } else {
        showToast(
          'Click on the Help menu in the top-right hand corner to view the "Getting Started Guide" again.'
        );
      }
    }
  };
  return (
    <dialog
      id="new_user_modal"
      className="modal modal-top pt-4 pl-4 absolute pr-4 !bg-inherit"
      ref={userGuideRef}
    >
      <div className="modal-box max-w-[375px] max-sc">
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
            id="slide1"
            className="carousel-item relative w-full flex flex-col items-center gap-6 font-sans"
          >
            <p className="text-lg font-logo">Getting Started Guide</p>
            <p className="text-sm text-gray-500 text-center">
              Not sure where to get started with your new project? This guide
              will show you how to:{" "}
            </p>
            <ol
              type="1"
              className="list-decimal text-primary flex flex-col gap-3"
            >
              <li>
                <a className="link" href="#slide2">
                  Create an Event
                </a>
              </li>
              <li>
                <a className="link" href="#slide3">
                  Add an Integration
                </a>
              </li>
              <li>
                <a className="link" href="#slide4">
                  Add Products
                </a>
              </li>
              <li>
                <a className="link" href="#slide5">
                  Select a Template
                </a>
              </li>
              <li>
                <a className="link" href="#slide6">
                  Adjust Styling
                </a>
              </li>
              <li>
                <a className="link" href="#slide7">
                  Preview and Embed
                </a>
              </li>
            </ol>
            <div className="absolute bottom-0 left-2 w-full">
              <div className="btn btn-primary w-[280px]">
                <a href="#slide2" className="w-full">
                  Get started!
                </a>
              </div>
            </div>
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">1. Create an Event</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              className="rounded-lg"
            >
              <source src="/videos/Create_Events.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="ml-4 text-gray-500 text-sm mb-16">
              To get started configuring your social proof plugin, first create
              an event. Events allow you to specify what types of information
              you can display to your users. You can show off recent purchases,
              top products, and more!
            </p>
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide3"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">2. Add an Integration</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              className="rounded-lg"
            >
              <source src="/videos/AddIntegration.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-6 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm mb-16">
                Events require an integration to display real data to your
                site&apos;s visitors. Follow the walkthrough guide for each
                integration to learn how to connect different services to
                Taplo&apos;s platform. You can also create new integrations from
                the <span className="font-bold">Connect</span> page.
              </p>
            </div>
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide4"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">3. Add Products</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
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
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide5" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide5"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">4. Select a Template</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
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
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide6" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide6"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">5. Adjust Styling</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
              className="rounded-lg"
            >
              <source src="/videos/AdjustStyling.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="ml-10 flex flex-col gap-2">
              {" "}
              <p className="text-gray-500 text-sm">
                Adjust colors, screen alignment, and more from the sidebar to
                match your website&apos;s own style and branding.
              </p>
            </div>
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide5" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide7" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide7"
            className="carousel-item relative w-full flex flex-col items-center gap-4 font-sans"
          >
            <div className="text-xl font-logo">6. Preview and Embed</div>
            <video
              width="600"
              controls
              autoPlay
              loop
              muted
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
            <div className="flex absolute bottom-0 gap-4 justify-between">
              <a href="#slide6" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide8" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide8"
            className="carousel-item relative w-full flex flex-col justify-center -mt-16 items-center gap-4 font-sans"
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
            <div className="absolute bottom-0 left-2 w-full flex gap-4">
              <a href="#slide7" className="btn btn-circle">
                ❮
              </a>
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

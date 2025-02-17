import Image from "next/image";
import Link from "next/link";
import React from "react";
import CreateProjectForm from "@/public/images/docs/CreateProjectForm.png";
import NewEventModal from "@/public/images/docs/NewEventModal.png";
import PopupView from "@/public/images/docs/PopupView.png";
import EventSettings from "@/public/images/docs/EventSettings.png";
import ProductSync from "@/public/images/docs/ProductSync.png";
import ProductPopup from "@/public/images/docs/ProductPopup.png";
import ProductSingle from "@/public/images/docs/ProductSingle.png";
import DarkModeExample from "@/public/images/docs/DarkModeExample.png";
import { Code2Icon, Fullscreen, Pencil, Settings } from "lucide-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function GettingStarted() {
  return (
    <div className="font-sans lg:px-48 md:px-24 flex flex-col gap-6">
      <div className="w-full mb-10 flex flex-col items-center gap-4">
        <p className="text-3xl font-semibold text-center">Getting Started</p>
        <p className="text-gray-500 italic text-center">
          Learn how to quickly get up and running with Taplo&apos;s social proof
          plugin.
        </p>
      </div>
      <p>
        Hi there! My name is Carter, the founder of Taplo. I&apos;ll be walking
        you through how to get started with Taplo&apos;s platform, including
        creating a new project, creating notification events, and adding custom
        styling.
      </p>
      <p className="text-xl font-semibold mt-10">1. Creating a New Project</p>
      <div>
        When you first log in, you will be asked to fill in your credit card
        information to start your free trial. You will not be charged until your
        trial is over, and you can cancel at any time from your{" "}
        <Link href={"/account"} className="link link-primary">
          Account
        </Link>{" "}
        page.
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={CreateProjectForm}
          alt="create-project-form"
          width={400}
          height={600}
        />
      </div>
      <div>
        On the{" "}
        <Link href={"/dashboard/create-project"} className="link link-primary">
          Create Project
        </Link>{" "}
        page, add a new project by entering the project name and URL, and then
        clicking &quot;Create Project&quot;. You can skip the url if you
        don&apos;t have one yet.
      </div>
      <p className="text-xl font-semibold mt-10">
        2. Creating event notifications
      </p>
      <div>
        Once you have created a project, you will be taken to the project
        dashboard. You will see a menu with a list of events you can choose from
        to display as notifications on your website. Select the event(s) you
        would like to create, and then click &quot;Create Event(s)&quot;.
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={NewEventModal}
          alt="new-event-modal"
          width={500}
          height={600}
        />
      </div>
      <div>
        <span className="font-bold">A note on events:</span> Events in Taplo
        represent actions that users take on your website, such as making a
        purchase, signing up for a newsletter, or leaving a review. Events are
        triggered by listening to services you link to Taplo (like Stripe or
        Google Analytics) and can be customized to display the information you
        want. When triggered, visitors to your site will see realtime events as
        they occur!
      </div>
      <p className="text-xl font-semibold mt-10">
        3. Customize your notifications
      </p>
      <div>
        After selecting the event(s) you would like to create, you can now begin
        customizing the style, timing, and content of your notifications.
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={PopupView}
          alt="popup-view-container"
          width={500}
          height={600}
        />
      </div>
      <div>
        In the center of your screen, you will see a preview of your popup
        notification, along with some other important options:
      </div>
      <table className="table-auto w-full text-left">
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <Code2Icon width={18} height={18} className="min-w-4" />
            </td>
            <td className="py-2">
              <span className="font-semibold mr-1">Embed: </span>The HTML code
              needed to add the popup to your website.
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <Fullscreen width={18} height={18} className="min-w-4" />
            </td>
            <td className="py-2">
              <span className="font-semibold mr-1">Preview: </span>View how your
              popup will look on your website.
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <Pencil width={16} height={16} className="min-w-4" />
            </td>
            <td className="py-2">
              <span className="font-semibold mr-1">Change Template: </span>
              Choose from 1 of 4 different customizable popup templates.
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <Settings width={16} height={16} className="min-w-4" />
            </td>
            <td className="py-2">
              <span className="font-semibold mr-1">Settings: </span>Access your
              project settings.
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-4">
              <QuestionMarkCircledIcon
                width={16}
                height={16}
                className="min-w-4"
              />
            </td>
            <td className="py-2">
              <span className="font-semibold mr-1">Help: </span>View
              documentation, provide feedback, or get in contact.
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        On the right side of your screen, you can adjust settings pertaining to
        events, products, style and popup duration.
      </div>
      <p className="text-lg font-semibold mt-6">3.1 Event settings</p>
      <div>
        In the Event Settings panel, you are able to configure the settings of
        each notification event.
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={EventSettings}
          alt="event-settings"
          width={500}
          height={600}
        />
      </div>
      <div>
        To link your notifications to another service, you must first create or
        select an integration from the dropdown menu.
        <span className="font-bold">
          {" "}
          Important: an integration must be selected for an event to trigger!
        </span>
      </div>
      <div>
        Make sure to check{" "}
        <Link href={"/docs/integrations"} className="link link-primary">
          the docs
        </Link>{" "}
        to learn how to correctly link other services to your Taplo project.
      </div>
      <div>
        If you would like to change the default text content, you may do so by
        clicking &quot;Edit&quot;, updating the text to your liking, and then
        clicking &quot;Save&quot; when you are done. Make sure to click
        &quot;Preview&quot; to check how your event notifications will appear on
        your website.
      </div>
      <p className="text-lg font-semibold mt-6">3.2 Product settings</p>
      <div>
        In the Product Settings panel, you can configure how products are
        displayed in your popup notifications.
      </div>
      <div>
        <span className="font-bold">What are products?</span> Products allow
        your Taplo notifications to display what specific items/services you are
        offering. Products can be synced directly from Stripe or created
        manually. However, manually creating products is not recommended, as
        products created first in Stripe can more easily be linked to exact
        purchases.
      </div>
      <div>
        To create a product from Stripe, simply click the &quot;+&quot; button
        in the right-hand corner and select your Stripe key from the dropdown
        menu. Your products will then be synced automatically from Stripe. (If
        this doesn&apos;t work, make sure that your Stripe products are active
        and that your Stripe integation is configured correctly).
      </div>
      <div className="flex w-full justify-center">
        <Image src={ProductSync} alt="product-sync" width={500} height={600} />
      </div>
      <div>
        Once you&apos;ve created your products, you can toggle between them to
        preview products in your popup window. You can also optionally attach a
        link to each product that will redirect users to the product&apos;s page
        on your website.
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={ProductSingle}
          alt="product-single"
          width={500}
          height={600}
        />
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={ProductPopup}
          alt="product-popup"
          width={500}
          height={600}
        />
      </div>
      <p className="text-lg font-semibold mt-6">3.3 Style & other settings</p>
      <div>
        Styling your popup in Taplo is pretty straightforward---just select a
        color you want to edit and use the color selection menu to make your
        changes. Here, I&apos;ve made a &quot;dark mode&quot; popup as an
        example:
      </div>
      <div className="flex w-full justify-center">
        <Image
          src={DarkModeExample}
          alt="dark-mode-example"
          width={500}
          height={600}
        />
      </div>
      <div>
        Should you wish to adjust the screen alignment of your popup, you may do
        so from this panel as well (the default alignment is in the bottom-left
        corner of the screen).
      </div>
      <div>
        Under the &quot;Additional Settings&quot; section, you will find options
        to edit how many days events should be displayed for before they expire,
        and the duration in milliseconds each popup notification is displayed on
        the screen.
      </div>
      <p className="text-xl font-semibold mt-10">
        4. Embedding your notifications
      </p>
      <div>
        Once you are satisfied with your notifications, you can embed them on
        your website by copying the HTML script found by clicking on the
        &quot;Embed&quot; button in the top-left corner of the page. Paste this
        script into the HTML of any page you wish to display your popup
        notifications on, and your notifications will begin to appear in
        real-time!
      </div>
      <p className="text-xl font-semibold mt-10">
        5. Additional resources & support
      </p>
      <div>
        If you have any questions or need help with anything, please don&apos;t
        hesitate to reach out to me at{" "}
        <Link
          href="mailto:team@taplo.io?subject=Help%20with%20Taplo%20Project%20Setup"
          target="_blank"
          className="link link-primary"
        >
          team@taplo.io
        </Link>
        . Hopefully this guide has been helpful in getting you started with your
        first Taplo project!
      </div>
      <div className="mb-8"></div>
    </div>
  );
}

import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col md:px-64 px-24 gap-6">
      <p className="text-2xl">Taplo Privacy Policy</p>
      <p>Last Updated: August 29th, 2024</p>
      <p>
        At Taplo, we are committed to protecting the privacy of our users and
        customers. This Privacy Policy explains how we collect, use, and
        disclose personal information when you use our website.
      </p>
      <p>1. Information Collection</p>
      <p>
        {" "}
        We collect information from you when you use our website or service,
        including:
      </p>
      <p>
        Device Information: When you visit our website, we collect information
        about your device, such as your IP address, browser type, and operating
        system. We also collect information about your browsing activity on our
        website, such as the pages you visit, the links you click, and the
        search terms you use.{" "}
      </p>
      <p>
        Log Data: We also collect log data when you access our website or
        service, which includes information about your device, browser, and
        internet service provider, as well as the date and time of your request.{" "}
      </p>
      <p>
        Cookies: We use cookies to improve your experience on our website and to
        remember your preferences. Cookies are small text files that are stored
        on your device when you visit a website.{" "}
      </p>
      <p>
        Google Analytics and Metrics: We use these services to track and analyze
        website traffic, usage, and behavior.
      </p>
      <p>
        Third-Party Services: We may also use third-party services such as
        Twitter for tracking and analyzing website traffic, usage, and behavior.
        These services may collect and share your personal information for their
        own uses and purposes. You can read more about Twitter&apos;s privacy
        policy here: https://twitter.com/en/privacy.
      </p>
      <p>2. Use of Personal Information</p>
      <p>
        We use the personal information we collect for the following purposes:
        To provide and improve our website and service; to process your orders
        and payments; to communicate with you about your account, orders, and
        other transactions; to screen for potential risk or fraud; to provide
        you with information or advertising relating to our products or
        services; to comply with applicable laws and regulations; to respond to
        a subpoena, search warrant or other lawful request, or to otherwise
        protect our rights.
      </p>
      <p>3. Disclosure of Personal Information</p>
      <p>
        We do not sell or share your personal information with third parties for
        their own marketing or commercial use. However, we may share your
        personal information with third parties for the following purposes:{" "}
      </p>
      <p>
        Service Providers: We may share your personal information with
        third-party service providers who assist us with various aspects of our
        business operations, such as website hosting, data analysis, payment
        processing, and customer service.{" "}
      </p>
      <p>
        Compliance with Laws and Law Enforcement: We may disclose your personal
        information to government authorities or law enforcement officials in
        order to comply with applicable laws, regulations, or legal process.
      </p>
      <p>
        Protection of Rights and Safety: We may disclose your personal
        information to protect the rights, property, or safety of , our users,
        or the public.
      </p>
      <p>4. Your Rights</p>
      <div>
        If you are a resident of certain countries, including those in the
        European Economic Area, you have certain rights in relation to your
        personal information, including the right to request access to, correct,
        update, or delete your personal information. If you would like to
        exercise any of these rights, please contact us at{" "}
        <Link
          href={`mailto:help@taplo.io?subject=Legal%20inquiry`}
          target="_blank"
          className="link link-primary"
        >
          help@taplo.io
        </Link>
        .
      </div>
      <p>5. Changes to This Privacy Policy</p>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or to comply with legal or regulatory requirements.{" "}
      </p>
      <p>6. Contact Us</p>
      <div>
        {" "}
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at{" "}
        <Link
          href={`mailto:help@taplo.io?subject=Legal%20inquiry`}
          target="_blank"
          className="link link-primary"
        >
          help@taplo.io
        </Link>
        . We will make every effort to respond to your inquiry and address any
        concerns you may have.
      </div>
    </div>
  );
}

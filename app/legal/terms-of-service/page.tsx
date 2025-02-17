import Link from "next/link";
import React from "react";

export default function TermsOfService() {
  return (
    <div className="flex flex-col md:px-64 px-24 gap-6">
      <p className="text-2xl">Taplo Terms of Service</p>
      <p>Last Updated: August 29th, 2024</p>
      <p>
        Welcome to Taplo! These Terms of Service (&quot;Terms&quot;) govern your
        use of the Taplo website at https://www.taplo.io (&quot;Website&quot;)
        and the services provided by Taplo. By using our Website and services,
        you agree to these Terms.
      </p>
      <p>1. Use of the Service</p>{" "}
      <p>
        The Service allows users to access the app. Users are granted a license
        to use the Service for personal or commercial use, including integrating
        the Service into their own customer service channels, provided that they
        comply with the terms and conditions of the Service.
      </p>
      <p>2. Modification and Discontinuation of Service</p>
      <p>
        Taplo Reserves the right to modify or discontinue the Service, or any
        portion thereof, at any time without notice. We will not be liable to
        you or any third party for any modification, suspension, or
        discontinuation of the Service.
      </p>
      <p>3. Ownership and Usage Rights </p>
      <p>
        When you purchase a package from Taplo, you gain the right to download
        and use the code provided for creating applications. You own the code
        you create but do not have the right to resell it. We offer a full
        refund within 7 days of purchase, as specified in our refund policy.
      </p>
      <p>4. Limitation of Liability</p>
      <p>
        Taplo will not be liable for any damages arising out of or in connection
        with your use of the Service, including but not limited to direct,
        indirect, incidental, special, consequential or punitive damages,
        regardless of the form of action or the basis of the claim, even if has
        been advised of the possibility of such damages. Some jurisdictions do
        not allow the exclusion or limitation of incidental or consequential
        damages, so this limitation and exclusion may not apply to you.
      </p>
      <p>5. Warranty Disclaimer</p>
      <p>
        {" "}
        The Service is provided &quot;as is&quot; and makes no warranties,
        express or implied, including but not limited to implied warranties of
        merchantability and fitness for a particular purpose. Taplo does not
        warrant that the Service will be uninterrupted or error-free, and will
        not be liable for any interruptions or errors. Taplo does not endorse,
        warrant, or guarantee any third-party content or service that may be
        accessed through the Service.
      </p>
      <p>6. Indemnification </p>
      <p>
        You agree to indemnify and hold , its directors, officers, employees,
        agents, and assigns, harmless from any claims, losses, damages,
        liabilities, and expenses (including reasonable attorneys&apos; fees)
        arising out of or in connection with your use of the Service, or any
        violation of these Terms of Use.
      </p>
      <p>7. Governing Law</p>
      <p>
        These Terms of Use shall be governed by the laws of the United States
        without giving effect to any principles of conflicts of law. Any
        disputes arising out of or in connection with these Terms of Use will be
        resolved in the courts of the United States.{" "}
      </p>
      <p>8. Severability</p>
      <p>
        {" "}
        If any provision of these Terms of Use is found to be invalid or
        unenforceable, the remaining provisions will remain in full force and
        effect.
      </p>
      <p>9. Entire Agreement</p>
      <p>
        {" "}
        These Terms of Use constitute the entire agreement between you and
        regarding the use of the Service.
      </p>
      <p>10. Contact Us</p>
      <div>
        For any questions or concerns regarding the Service or these Terms of
        Use, please contact us at{" "}
        <Link
          href={`mailto:team@taplo.io?subject=Legal%20inquiry`}
          target="_blank"
          className="link link-primary"
        >
          team@taplo.io
        </Link>{" "}
        or any other communication means we put at the customer&apos;s
        disposition.
      </div>
    </div>
  );
}

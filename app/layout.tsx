import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/app/_components/shared/toaster";
import { Gayathri, Georama, Noto_Sans } from "next/font/google";
import cx from "classnames";
import "./globals.css";
import ProgressBarProvider from "@/app/_components/shared/progressbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const openSans = Noto_Sans({
  variable: "--font-openSans",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});
const changaOne = Gayathri({
  variable: "--font-changaOne",
  weight: "700",
  subsets: ["latin"],
});

const geograma = Georama({
  variable: "--font-georama",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taplo",
  description: "Attention-grabbing popups that increase your conversion rate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5Z76W2XH');`,
        }}
      ></script>
      {/* End Google Tag Manager */}
      <body
        className={`${cx(
          openSans.variable,
          changaOne.variable,
          geograma.variable
        )}`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z76W2XH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

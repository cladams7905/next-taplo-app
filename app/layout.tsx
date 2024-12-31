import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/app/_components/shared/toaster";
import { Gayathri, Georama, Noto_Sans } from "next/font/google";
import cx from "classnames";
import "./globals.css";
import ProgressBarProvider from "@/app/_components/shared/progressbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";

const openSans = Noto_Sans({
  variable: "--font-openSans",
  weight: ["300", "400", "500", "600", "700"],
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
  description:
    "Boost conversions and credibility with popup notifications that display real-time user data. Try it free for 14 days, and then pay only $5 a month.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      <body
        className={`${cx(
          openSans.variable,
          changaOne.variable,
          geograma.variable
        )}`}
      >
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId={process.env.GTM_ID!} />
    </html>
  );
}

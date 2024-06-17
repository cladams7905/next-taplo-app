import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/shared/toaster";
import { Open_Sans, Changa_One, Nunito_Sans } from "next/font/google";
import cx from "classnames";
import "./globals.css";
import ProgressBarProvider from "@/components/shared/progressbar";

const openSans = Nunito_Sans({
  variable: "--font-openSans",
  weight: ["300", "400", "600", "800"],
  subsets: ["latin"],
});
const changaOne = Changa_One({
  variable: "--font-changaOne",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToastJam",
  description: "Real-time sales notifications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      <body className={`${cx(openSans.variable, changaOne.variable)}`}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

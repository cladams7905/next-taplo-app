"use client";

import Image from "next/image";
import ProfilePic from "@/public/images/Profile_LightGray.png";
import Logo from "@/public/images/TaploLogoWhite.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-12 bg-base-content text-white p-10 font-sans z-20">
      <footer className="footer">
        <aside>
          <div className="flex items-center gap-2 mb-3">
            <Image width={34} height={34} alt="logo" src={Logo} />
            <p className="mx-2 text-2xl font-logo">Taplo</p>
          </div>
          <p className="text-md">
            Attention-grabbing popups to increase your conversion rate.
          </p>
          <p>Copyright © 2024 - All Rights Reserved.</p>
          <div className="mt-6">
            Question? Email me at{" "}
            <Link
              href={`mailto:help@taplo.io?subject=Business%20inquiry`}
              target="_blank"
              className="link"
            >
              help@taplo.io
            </Link>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Links</h6>
          <div className="grid grid-flow-row gap-4">
            <Link href={"/login"}>
              {" "}
              <p className="underline">Login</p>
            </Link>
            <Link href={"#pricing"}>
              <p className="underline">Pricing</p>
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <div className="grid grid-flow-row gap-4">
            <Link href={"/legal/terms-of-service"} target="_blank">
              {" "}
              <p className="underline">Terms of Service</p>
            </Link>
            <Link href={"legal/privacy-policy"} target="_blank">
              {" "}
              <p className="underline">Privacy Policy</p>
            </Link>
            <Link href={"legal/facebook-disclaimer"} target="_blank">
              {" "}
              <p className="underline">Facebook Disclaimer</p>
            </Link>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link href={"https://x.com/carteradaams"} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 462.799"
                width="24"
                height="24"
              >
                <path
                  fill="#fff"
                  d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                />
              </svg>
            </Link>
            <Link
              href={"https://www.linkedin.com/in/carteradams/"}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 512"
                width="24"
                height="24"
              >
                <path
                  fill="#fff"
                  d="M474.919 0H38.592C17.72 0 0 16.504 0 36.841V475.14C0 495.496 11.629 512 32.492 512h436.327C489.718 512 512 495.496 512 475.14V36.841C512 16.504 495.809 0 474.919 0zM195.043 195.043h68.928v35.136h.755c10.505-18.945 41.541-38.177 79.921-38.177 73.655 0 94.214 39.108 94.214 111.538v135.321h-73.148V316.883c0-32.427-12.947-60.883-43.227-60.883-36.768 0-54.295 24.889-54.295 65.758v117.103h-73.148V195.043zM73.139 438.861h73.148V195.043H73.139v243.818zm82.289-329.148c0 25.258-20.457 45.715-45.715 45.715-25.258 0-45.715-20.457-45.715-45.715 0-25.258 20.457-45.715 45.715-45.715 25.258 0 45.715 20.457 45.715 45.715z"
                />
              </svg>
            </Link>
          </div>
        </nav>
        <a
          href="https://www.producthunt.com/posts/taplo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-taplo"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=745836&theme=light"
            alt="Taplo - Embeddable Social Proof Plugin for SaaS founders | Product Hunt"
            width="200"
            height="54"
          />
        </a>
      </footer>
      <div className="flex items-center gap-6 mb-12">
        <Image
          width={40}
          height={40}
          src={ProfilePic}
          alt="Profile pic"
          className="rounded-full"
        />
        <div className="text-sm">
          Hey friend! 👋 I&apos;m Carter, the founder of Taplo. <br /> If you
          want to check out my other work, you can follow me on{" "}
          <span className="underline">
            <Link href={"https://x.com/carteradaams"} target="_blank">
              X
            </Link>
          </span>{" "}
          or{" "}
          <span className="underline">
            <Link
              href={"https://www.linkedin.com/in/carteradams/"}
              target="_blank"
            >
              LinkedIn
            </Link>
          </span>
          .
        </div>
      </div>
    </div>
  );
}

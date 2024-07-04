"use client";

import { Tables } from "@/supabase/types";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import "animate.css";
import { IColor } from "react-color-palette";
import confetti from "canvas-confetti";

export default function ToastPopup({
  activeToast,
  products,
  backgroundToastColor,
  textColor,
  accentColor,
  verifiedColor,
  borderColor,
  isShowProductsChecked,
}: {
  activeToast: Tables<"Toasts">;
  products: Tables<"Products">[];
  backgroundToastColor: IColor;
  textColor: IColor;
  accentColor: IColor;
  verifiedColor: IColor;
  borderColor: IColor;
  isShowProductsChecked: boolean;
}) {
  const [isFirstClicked, setIsFirstClicked] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Tables<"Products"> | null>(
    products.filter((product) => product.toast_id === activeToast?.id)[0]
  );

  useEffect(() => {
    if (products && activeToast) {
      setActiveProduct(
        products.filter((product) => product.toast_id === activeToast?.id)[0]
      );
    }
  }, [activeToast, products]);

  useEffect(() => {
    setIsFirstClicked(true);
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 60,
      ticks: 100,
      scalar: 0.25,
      origin: {
        x: 0.75,
        y: 0.35,
      },
    });
    setTimeout(() => {
      setIsFirstClicked(false);
    }, 1000);
  }, [activeToast]);

  return (
    <div
      style={{
        backgroundColor: backgroundToastColor.hex.toString(),
        borderColor: borderColor.hex.toString(),
      }}
      className={`relative w-full max-w-72 rounded-lg border shadow-xl p-2 pl-4 ${
        isFirstClicked && "animate__animated animate__bounceIn"
      }`}
    >
      <div
        style={{
          color: accentColor.hex.toString(),
        }}
        className="flex flex-row items-center gap-1 text-xs"
      >
        20 min ago |
        <BadgeCheck fill={verifiedColor.hex.toString()} color="#FFFFFF" />
        Verified Purchase
      </div>
      <button
        style={{
          color: accentColor.hex.toString(),
        }}
        className="btn btn-sm btn-circle btn-ghost !border-none !outline-none absolute right-1 top-1 text-base-content"
      >
        ✕
      </button>
      <p
        style={{
          color: textColor.hex.toString(),
        }}
        className="text-sm mt-1"
      >
        {activeProduct && isShowProductsChecked ? (
          <>
            {`Someone in USA just purchased `}
            <a
              className="link font-bold cursor-pointer"
              href={activeProduct.link || ""}
              target="_blank"
            >
              {activeProduct.name || "My Product"} ($
              {activeProduct.price || "0.00"})
            </a>
            {`.`}
          </>
        ) : (
          activeToast.content
        )}
      </p>
    </div>
  );
}

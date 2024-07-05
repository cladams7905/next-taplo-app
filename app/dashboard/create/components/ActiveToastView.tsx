"use client";

import { Tables } from "@/supabase/types";
import ToastTabList from "./toastview/ToastTabList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToastPopup from "./toastview/ToastPopup";
import { RenameToastButton } from "./toastview/RenameToastButton";
import { DeleteToastButton } from "./toastview/DeleteToastButton";
import { ToastEventTab } from "./toastview/ToastEventTab";
import { NoToastView } from "./toastview/NoToastView";
import { ToastStyleTab } from "./toastview/ToastStyleTab";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import { ToastContentTab } from "./toastview/ToastContentTab";

export default function ActiveToastView({
  activeToast,
  setActiveToast,
  setCurrentToasts,
  integrations,
  products,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  setCurrentToasts: Dispatch<SetStateAction<Tables<"Toasts">[]>>;
  integrations: Tables<"Integrations">[];
  products: Tables<"Products">[];
}) {
  const [currentTab, setCurrentTab] = useState(0);

  /* Toast style state variables */
  const [backgroundToastColor, setBackgroundToastColor] = useColor(
    activeToast?.bg_color ? activeToast.bg_color : "#FFFFFF"
  );
  const [textColor, setTextColor] = useColor(
    activeToast?.text_color ? activeToast.text_color : "#172554"
  );
  const [accentColor, setAccentColor] = useColor(
    activeToast?.accent_color ? activeToast.accent_color : "#6b7280"
  );
  const [borderColor, setBorderColor] = useColor(
    activeToast?.border_color ? activeToast.border_color : "#D1D3D7"
  );
  const [verifiedColor, setVerifiedColor] = useColor(
    activeToast?.verified_color ? activeToast.verified_color : "#4ade80"
  );

  /* Product state variables */
  const [isShowProductsChecked, setShowProductsChecked] = useState(
    activeToast?.show_products || false
  );
  const [currentProducts, setCurrentProducts] = useState<Tables<"Products">[]>(
    products.filter((product) => product.toast_id === activeToast?.id)
  );
  const [activeProduct, setActiveProduct] = useState<Tables<"Products"> | null>(
    currentProducts[0] || null
  );
  const [productImageSrc, setProductImageSrc] = useState<string>(
    activeProduct?.image_url ? activeProduct.image_url : ""
  );

  useEffect(() => {
    if (products && activeToast) {
      setShowProductsChecked(activeToast.show_products);
      const filteredProducts = products.filter(
        (product) => product.toast_id === activeToast?.id
      );
      setCurrentProducts(filteredProducts);
      setActiveProduct(filteredProducts[0] || null);
      setProductImageSrc(
        activeProduct?.image_url ? activeProduct.image_url : ""
      );
    }
  }, [activeToast, products, activeProduct, setShowProductsChecked]);

  return activeToast !== undefined ? (
    <div className="flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-purple-100 h-full shadow-lg z-[1]">
      <div className="w-full lg:h-1/3 h-1/2 p-4">
        <div className="flex justify-between items-center">
          <RenameToastButton
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            setCurrentToasts={setCurrentToasts}
          />
          <DeleteToastButton
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            setCurrentToasts={setCurrentToasts}
          />
        </div>
        <div className="flex h-full w-full lg:items-start items-center justify-center -mt-8 lg:mt-4">
          <ToastPopup
            activeToast={activeToast}
            products={products}
            backgroundToastColor={backgroundToastColor}
            textColor={textColor}
            accentColor={accentColor}
            verifiedColor={verifiedColor}
            borderColor={borderColor}
            isShowProductsChecked={isShowProductsChecked}
            productImageSrc={productImageSrc}
          />
        </div>
      </div>
      <ToastTabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex flex-col w-full items-center h-2/3 overflow-y-auto bg-white dark:bg-base-100 rounded-br-lg p-6 gap-6 relative">
        {currentTab === 0 && (
          <ToastEventTab
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            integrations={integrations}
          />
        )}
        {currentTab === 1 && (
          <ToastContentTab
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            products={currentProducts}
            setProducts={setCurrentProducts}
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
            isShowProductsChecked={isShowProductsChecked}
            setShowProductsChecked={setShowProductsChecked}
            productImageSrc={productImageSrc}
            setProductImageSrc={setProductImageSrc}
          />
        )}
        {currentTab === 2 && (
          <ToastStyleTab
            activeToast={activeToast}
            setActiveToast={setActiveToast}
            backgroundToastColor={backgroundToastColor}
            setBackgroundToastColor={setBackgroundToastColor}
            textColor={textColor}
            setTextColor={setTextColor}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            verifiedColor={verifiedColor}
            setVerifiedColor={setVerifiedColor}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
          />
        )}
      </div>
    </div>
  ) : (
    <NoToastView />
  );
}

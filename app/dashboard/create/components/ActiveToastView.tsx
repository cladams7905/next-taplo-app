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

export default function ActiveProjectView({
  activeProject,
  setActiveProject,
  integrations,
  products,
}: {
  activeProject: Tables<"Projects"> | undefined;
  setActiveProject: Dispatch<SetStateAction<Tables<"Projects">>>;
  integrations: Tables<"Integrations">[];
  products: Tables<"Products">[];
}) {
  const [currentTab, setCurrentTab] = useState(0);

  /* Toast style state variables */
  const [backgroundToastColor, setBackgroundToastColor] = useColor(
    activeProject?.bg_color ? activeProject.bg_color : "#FFFFFF"
  );
  const [textColor, setTextColor] = useColor(
    activeProject?.text_color ? activeProject.text_color : "#172554"
  );
  const [accentColor, setAccentColor] = useColor(
    activeProject?.accent_color ? activeProject.accent_color : "#6b7280"
  );
  const [borderColor, setBorderColor] = useColor(
    activeProject?.border_color ? activeProject.border_color : "#D1D3D7"
  );
  const [verifiedColor, setVerifiedColor] = useColor(
    activeProject?.verified_color ? activeProject.verified_color : "#4ade80"
  );

  /* Product state variables */
  const [isShowProductsChecked, setShowProductsChecked] = useState(
    activeProject?.show_products || false
  );
  const [currentProducts, setCurrentProducts] = useState<Tables<"Products">[]>(
    products.filter((product) => product.toast_id === activeProject?.id)
  );
  const [activeProduct, setActiveProduct] = useState<Tables<"Products"> | null>(
    currentProducts[0] || null
  );
  const [productImageSrc, setProductImageSrc] = useState<string>(
    activeProduct?.image_url ? activeProduct.image_url : ""
  );

  useEffect(() => {
    if (products && activeProject) {
      setShowProductsChecked(activeProject.show_products);
      const filteredProducts = products.filter(
        (product) => product.toast_id === activeProject?.id
      );
      setCurrentProducts(filteredProducts);
      setActiveProduct(filteredProducts[0] || null);
      setProductImageSrc(
        activeProduct?.image_url ? activeProduct.image_url : ""
      );
    }
  }, [activeProject, products, activeProduct, setShowProductsChecked]);

  return activeProject !== undefined ? (
    <div className="flex flex-col !rounded-none bg-gradient-to-tr from-primary/50 to-purple-100 h-full shadow-lg z-[1]">
      <div className="w-full lg:h-1/3 h-1/2 p-4">
        <div className="flex justify-between items-center">
          {/* <RenameToastButton
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            setCurrentProjects={setCurrentProjects}
          />
          <DeleteToastButton
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            setCurrentProjects={setCurrentProjects}
          /> */}
        </div>
        <div className="flex items-center justify-center">
          <ToastPopup
            activeProject={activeProject}
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
    </div>
  ) : (
    <NoToastView />
  );
}

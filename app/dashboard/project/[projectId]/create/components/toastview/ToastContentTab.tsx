"use client";

import { ToastType } from "@/lib/enums";
import { Tables } from "@/supabase/types";
import { Dispatch, SetStateAction, useTransition } from "react";
import ProductList from "./ProductList";

export const ToastContentTab = ({
  activeToast,
  setActiveToast,
  products,
  setProducts,
  activeProduct,
  setActiveProduct,
  isShowProductsChecked,
  setShowProductsChecked,
  productImageSrc,
  setProductImageSrc,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  products: Tables<"Products">[];
  setProducts: Dispatch<SetStateAction<Tables<"Products">[]>>;
  activeProduct: Tables<"Products"> | null;
  setActiveProduct: Dispatch<SetStateAction<Tables<"Products"> | null>>;
  isShowProductsChecked: boolean;
  setShowProductsChecked: Dispatch<SetStateAction<boolean>>;
  productImageSrc: string;
  setProductImageSrc: Dispatch<SetStateAction<string>>;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col w-2/3 gap-8">
      {activeToast?.event_type === ToastType.PaymentComplete && (
        <ProductList
          activeToast={activeToast}
          setActiveToast={setActiveToast}
          isShowProductsChecked={isShowProductsChecked}
          setShowProductsChecked={setShowProductsChecked}
          products={products}
          setProducts={setProducts}
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
          productImageSrc={productImageSrc}
          setProductImageSrc={setProductImageSrc}
        />
      )}
    </div>
  );
};

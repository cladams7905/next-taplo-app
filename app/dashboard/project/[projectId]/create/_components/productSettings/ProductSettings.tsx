"use client";

import useScroll from "@/lib/hooks/use-scroll";
import React, { RefObject, useRef, useTransition } from "react";
import ProductList from "./ProductList";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { CirclePlus } from "lucide-react";
import NewProductModal from "./NewProductModal";

export default function ProductSettings({
  scrollRef,
  productsHeaderRef,
  eventHeaderHeight,
  isPreviewMode,
}: {
  scrollRef: RefObject<HTMLDivElement>;
  productsHeaderRef: RefObject<HTMLDivElement>;
  eventHeaderHeight: number | undefined;
  isPreviewMode: boolean;
}) {
  const { events, products, activeProduct } = useProjectContext();
  const scrolled = useScroll(eventHeaderHeight, scrollRef);
  const [isProductPending, startProductTransition] = useTransition();
  const productModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div
      ref={productsHeaderRef}
      className={`flex relative border-t border-gray-300 ${
        isPreviewMode && "z-[0]"
      } flex-col w-full h-fit`}
    >
      <div
        className={`sticky top-0 w-full min-h-[65px] p-4 bg-white flex items-center justify-between z-[2] ${
          scrolled ? "border-b border-gray-300 -mb-[1px]" : ""
        }`}
      >
        <div className="flex flex-row items-center sticky top-[-1px] ml-2 gap-2 bg-white">
          <div className="flex flex-col gap-[6px]">
            {" "}
            <div className="font-semibold text-md flex flex-row gap-3">
              <p>Products ({products.length})</p>
              {isProductPending && (
                <span className="loading loading-spinner loading-xs bg-base-content"></span>
              )}
            </div>
            {products.length > 0 && activeProduct && (
              <div className="text-xs font-normal">
                Viewing:{" "}
                {activeProduct?.name ? activeProduct.name : `Unnamed Product`}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {events.length > 0 && (
            <>
              <div
                className="btn btn-sm bg-white border !border-gray-300 shadow-sm hover:!bg-link-hover w-auto text-xs tooltip tooltip-left tooltip-info flex items-center font-normal"
                data-tip="Create Product"
                onClick={() => productModalRef.current?.showModal()}
              >
                <CirclePlus height={18} width={18} />
              </div>
              <NewProductModal
                productModalRef={productModalRef}
                isProductPending={isProductPending}
                startProductLoadingTransition={startProductTransition}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 gap-6">
        {products.length > 0 ? (
          <div className="flex flex-col w-full gap-3 mb-4">
            <ProductList startLoadTransition={startProductTransition} />
          </div>
        ) : events.length > 0 ? (
          <div className="px-4 text-[12px] text-gray-400 w-full text-center mb-6">
            You haven&apos;t created any events yet. Click &quot;+&quot; to
            create a new one!
          </div>
        ) : (
          <div className="px-4 text-[12px] text-gray-400 w-full text-center mb-6">
            To enable products, toggle the &quot;Show Products&quot; option.
          </div>
        )}
      </div>
    </div>
  );
}

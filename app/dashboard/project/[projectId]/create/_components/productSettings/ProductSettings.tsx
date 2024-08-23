"use client";

import useScroll from "@/lib/hooks/use-scroll";
import { RefObject, useTransition } from "react";
import ProductList from "./ProductList";
import { useProjectContext } from "../ProjectBoard";
import { updateProject } from "@/lib/actions/projects";
import { showToastError } from "@/components/shared/showToast";
import { CirclePlus, EyeIcon } from "lucide-react";
import { TablesInsert } from "@/supabase/types";
import { createProduct } from "@/lib/actions/products";

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
  const { activeProject, events, products, setProducts, activeProduct } =
    useProjectContext();
  const scrolled = useScroll(eventHeaderHeight, scrollRef);
  const [isProductPending, startProductTransition] = useTransition();

  const handleCreateProduct = () => {
    startProductTransition(async () => {
      const product: TablesInsert<"Products"> = {
        project_id: activeProject.id,
        user_id: activeProject.user_id,
      };
      const { data, error } = await createProduct(product);
      if (error) {
        showToastError(error);
      } else {
        setProducts((prevProducts) => [...prevProducts, data]);
      }
    });
  };
  return (
    <div
      ref={productsHeaderRef}
      className={`flex relative border-t border-gray-300 ${
        isPreviewMode && "z-[0]"
      } flex-col w-full h-fit`}
    >
      <div
        className={`sticky top-0 w-full min-h-[65px] p-4 bg-white flex items-center justify-between ${
          scrolled ? "border-b border-gray-300 -mb-[1px] shadow-sm" : ""
        } ${isPreviewMode ? "z-[1]" : "z-[2]"}`}
      >
        <div className="flex items-center sticky top-[-1px] gap-2 bg-white">
          <div className="font-semibold ml-2">Products ({products.length})</div>
          {products.length > 0 && (
            <div className="flex items-center font-semibold gap-1 text-xs ml-2 bg-primary/20 rounded-lg p-1 px-3">
              <EyeIcon width={18} height={18} />
              {activeProduct?.name
                ? activeProduct.name
                : `Unnamed Product (${
                    products.indexOf(activeProduct!) + 1
                  })`}{" "}
            </div>
          )}
          {isProductPending && (
            <span className="loading loading-spinner loading-xs bg-base-content"></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {events.length > 0 && (
            <div
              className="btn btn-sm w-auto btn-primary text-white text-xs"
              onClick={() => handleCreateProduct()}
            >
              New Product
              <CirclePlus height={18} width={18} />
            </div>
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

"use client";

import useScroll from "@/lib/hooks/use-scroll";
import { RefObject, useTransition } from "react";
import ProductList from "./ProductList";
import { useProjectContext } from "../ProjectBoard";
import { updateProject } from "@/lib/actions/projects";
import { showToastError } from "@/components/shared/showToast";
import { CirclePlus } from "lucide-react";
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
  const {
    activeProject,
    setActiveProject,
    events,
    products,
    setProducts,
    isShowProductsChecked,
    setShowProductsChecked,
  } = useProjectContext();
  const scrolled = useScroll(eventHeaderHeight, scrollRef);
  const [isProductPending, startProductTransition] = useTransition();

  const handleShowProductsToggle = () => {
    startProductTransition(async () => {
      setShowProductsChecked(!isShowProductsChecked);
      const updateResult = await updateProject(activeProject.id, {
        show_products: !isShowProductsChecked,
      });

      if (updateResult.error) {
        showToastError(updateResult.error);
      } else {
        setActiveProject({
          ...activeProject,
          show_products: !isShowProductsChecked,
        });
      }
    });
  };

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
        <div className="flex items-center sticky top-[-1px] text-xs gap-2 bg-white">
          <div className="font-semibold text-gray-400 ml-2">
            Products ({products.length})
          </div>
          {isProductPending && (
            <span className="loading loading-spinner loading-xs bg-base-content"></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="text-xs">Show products?</div>
          <input
            type="checkbox"
            checked={isShowProductsChecked}
            className="toggle toggle-primary toggle-md"
            onChange={handleShowProductsToggle}
          /> */}
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
        {isShowProductsChecked ? (
          <div className="flex flex-col w-full gap-3 mb-4">
            <ProductList startLoadTransition={startProductTransition} />
          </div>
        ) : (
          <div className="px-4 text-[12px] text-gray-400 w-full text-center">
            To enable products, toggle the &quot;Show Products&quot; option.
          </div>
        )}
      </div>
    </div>
  );
}

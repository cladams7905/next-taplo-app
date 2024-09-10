"use client";

import { showToastError } from "@/app/_components/shared/showToast";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { createProduct } from "@/lib/actions/products";
import { Tables, TablesInsert } from "@/supabase/types";
import {
  RefObject,
  TransitionStartFunction,
  useState,
  useTransition,
} from "react";
import IntegrationSelect from "../eventSettings/IntegrationSelect";
import { RotateCcw, TriangleAlert } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";

export default function NewProductModal({
  productModalRef,
  startProductLoadingTransition,
}: {
  productModalRef: RefObject<HTMLDialogElement>;
  startProductLoadingTransition: TransitionStartFunction;
}) {
  const { activeProject, setProducts, setActiveProduct } = useProjectContext();
  const [isFetchProducts, startFetchProductsTransition] = useTransition();
  const [selectedIntegration, setSelectedIntegration] = useState<
    Tables<"Integrations"> | undefined
  >(undefined);
  const [productsToSelect, setProductsToSelect] = useState<
    Tables<"Products">[]
  >([]);
  const [isFetchError, setFetchError] = useState(false);

  const handleCreateProduct = () => {
    startProductLoadingTransition(async () => {
      const product: TablesInsert<"Products"> = {
        project_id: activeProject.id,
        user_id: activeProject.user_id,
      };
      const { data, error } = await createProduct(product);
      if (error) {
        showToastError(error);
      } else {
        setProducts((prevProducts) => [...prevProducts, data]);
        setActiveProduct(data);
      }
    });
  };

  /**
   * Fetches products from a stripe api key
   * @param integration the integration
   * @returns the product array, or an error if fetch fails
   */
  const fetchProductsFromStripe = async (
    integration: Tables<"Integrations">
  ) => {
    setFetchError(false);
    let products;
    const res = await fetch("/api/v1/stripe/fetch_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripe_api_key: integration.api_key,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setFetchError(true);
      return;
    } else {
      products = data.products;
      return products;
    }
  };

  return (
    <dialog className="modal" ref={productModalRef}>
      <div className="modal-box relative !py-0 max-w-screen-md min-h-[60vh] h-[60vh] text-base-content dark:border dark:border-gray-600">
        <div className="flex flex-col w-full h-full gap-6">
          <div className="flex flex-col w-full pt-8 sticky top-0 bg-white">
            <form method="dialog" className="modal-backdrop">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute -right-2 top-2 text-base-content !outline-none"
                onClick={() => {
                  productModalRef?.current?.close();
                }}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-semibold text-lg">Create products</h3>
            </div>
            <div className="join join-horizontal flex items-center mt-4">
              <IntegrationSelect
                startLoadingTransition={startFetchProductsTransition}
                selectedIntegration={selectedIntegration}
                setSelectedIntegration={setSelectedIntegration}
                setProductsToSelect={setProductsToSelect}
                fetchProductsFromStripe={fetchProductsFromStripe}
              />
              <div
                className="join-item btn btn-primary text-white"
                onClick={() =>
                  selectedIntegration &&
                  startFetchProductsTransition(async () => {
                    await fetchProductsFromStripe(selectedIntegration);
                  })
                }
              >
                Refetch products <RotateCcw width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 w-full overflow-y-scroll h-full py-3">
            {isFetchProducts ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : productsToSelect.length > 0 ? (
              <>{productsToSelect.toLocaleString()}</>
            ) : isFetchError ? (
              <div className="flex flex-col gap-3 items-center text-sm justify-center w-full h-full rounded-lg border border-error text-error md:px-12 px-4 text-center">
                <TriangleAlert />
                There was an error while attempting to fetch products. Make sure
                that you have the correct permissions enabled on your restricted
                API key for product fetching to work.
              </div>
            ) : (
              <div className="flex items-center text-sm justify-center w-full h-full rounded-lg bg-gray-50 border border-gray-200 md:px-12 px-4 text-center">
                Products can be synced automatically from Stripe or Shopify! To
                do so, please select an integration from the above dropdown
                menu.
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center sticky bottom-0 bg-white pb-6">
            <div className="border-t border-gray-300 w-full"></div>
            <div className="flex items-center rounded-lg bg-white px-4 -mt-[10px] text-sm text-gray-500">
              or
            </div>
            <div
              className="btn btn-ghost mt-2"
              onClick={() => {
                handleCreateProduct();
                productModalRef.current?.close();
              }}
            >
              Create product manually
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

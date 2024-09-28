"use client";

import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";
import { createProduct } from "@/lib/actions/products";
import { Tables, TablesInsert } from "@/supabase/types";
import {
  RefObject,
  TransitionStartFunction,
  useRef,
  useState,
  useTransition,
} from "react";
import IntegrationSelect from "../eventSettings/IntegrationSelect";
import { BoxIcon, CheckIcon, RotateCcw, TriangleAlert } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import { formatPrice } from "@/lib/actions";
import Image from "next/image";
import LoadingDots from "@/app/_components/shared/loadingdots";
import Stripe from "stripe";

export default function NewProductModal({
  productModalRef,
  isProductPending,
  startProductLoadingTransition,
}: {
  productModalRef: RefObject<HTMLDialogElement>;
  isProductPending: boolean;
  startProductLoadingTransition: TransitionStartFunction;
}) {
  const { activeProject, setProducts, setActiveProduct } = useProjectContext();
  const [isFetchProducts, startFetchProductsTransition] = useTransition();
  const [selectedIntegration, setSelectedIntegration] = useState<
    Tables<"Integrations"> | undefined
  >(undefined);
  const [productsToSelect, setProductsToSelect] = useState<
    TablesInsert<"Products">[]
  >([]);
  const [isFetchError, setFetchError] = useState(false);
  const [productsToCreate, setProductsToCreate] = useState<
    TablesInsert<"Products">[]
  >([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [isSelectAll, setSelectAll] = useState(false);

  const addProductToCreate = (product: TablesInsert<"Products">) => {
    setProductsToCreate((prevProductsToCreate) => {
      return [...prevProductsToCreate, product];
    });
  };

  const removeProductToCreate = (product: TablesInsert<"Products">) => {
    setProductsToCreate((prevProductsToCreate) => {
      return prevProductsToCreate.filter(
        (p) => p.name !== product.name || p.price !== product.price
      );
    });
  };

  const handleCreateProduct = (product?: TablesInsert<"Products">) => {
    startProductLoadingTransition(async () => {
      const newProduct: TablesInsert<"Products"> = {
        project_id: activeProject.id,
        user_id: activeProject.user_id,
      };
      const { data, error } = await createProduct(
        product ? product : newProduct
      );
      if (error) {
        showToastError(error);
      } else {
        setProducts((prevProducts) => [...prevProducts, data]);
        setActiveProduct(data);
      }
    });
  };

  const createSelectedProducts = () => {
    productsToCreate.forEach((product) => {
      handleCreateProduct(product);
    });
    setTimeout(() => {
      showToast(`${productsToCreate.length} new products were created.`);
      setProductsToCreate([]);
      setSelectAll(false);
      productModalRef.current?.close();
    }, 1500);
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
    let products: Stripe.Product[];
    const res = await fetch(
      `/api/v1/stripe/products?integration_id=${integration.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      <div className="modal-box relative !py-0 max-w-screen-md text-base-content dark:border dark:border-gray-600">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex flex-col w-full pt-8 sticky z-[2] top-0 bg-white">
            <form method="dialog" className="modal-backdrop">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute -right-2 top-2 text-base-content !outline-none"
                onClick={() => {
                  setProductsToCreate([]);
                  setSelectAll(false);
                  !selectAllCheckboxRef.current?.checked;
                  productModalRef?.current?.close();
                }}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-semibold text-lg">Create product(s)</h3>
            </div>
            <div className="join join-horizontal flex items-center mt-4 mb-2">
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
                    setProductsToCreate([]);
                    setSelectAll(false);
                    await fetchProductsFromStripe(selectedIntegration);
                  })
                }
              >
                <RotateCcw width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow gap-4 px-1">
            {isFetchProducts ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : (
              <>
                {productsToSelect.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <p>Select all</p>
                      <input
                        ref={selectAllCheckboxRef}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={isSelectAll}
                        onChange={(e) => {
                          setSelectAll(e.target.checked);
                          if (e.target.checked) {
                            setProductsToCreate(productsToSelect);
                          } else {
                            setProductsToCreate([]);
                          }
                        }}
                      />
                    </div>
                    {productsToSelect.map((product, i) => (
                      <div
                        key={i}
                        className={`flex relative sm:text-md text-sm border border-gray-200 shadow-sm rounded-lg gap-4 w-full px-6 py-4 cursor-pointer hover:outline hover:outline-[1px] hover:outline-primary hover:-translate-y-1 transition-transform ${
                          productsToCreate.includes(product) &&
                          "outline outline-[1px] outline-primary"
                        }`}
                        onClick={() => {
                          if (!productsToCreate.includes(product)) {
                            addProductToCreate(product);
                          } else {
                            removeProductToCreate(product);
                          }
                        }}
                      >
                        {productsToCreate.includes(product) && (
                          <div className="flex items-center justify-center absolute top-0 right-0 aspect-square w-6 h-6 rounded-bl-lg rounded-tr-lg bg-primary text-white outline outline-[1px] outline-primary">
                            <CheckIcon width={16} height={16} strokeWidth={4} />
                          </div>
                        )}
                        {product.image_url ? (
                          <Image
                            height={56}
                            width={56}
                            className="rounded-lg"
                            alt="product-image"
                            src={product.image_url}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-14 aspect-square rounded-lg bg-primary/20">
                            <BoxIcon />
                          </div>
                        )}
                        <div className="flex flex-col w-full justify-center">
                          <p className="font-bold">{product.name}</p>
                          <p>{formatPrice(product.price as number)}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : isFetchError ? (
                  <div className="flex flex-col gap-3 items-center text-sm justify-center min-h-[35vh] w-full h-full rounded-lg border border-error text-error md:px-12 px-4 text-center">
                    <TriangleAlert />
                    There was an error while attempting to fetch products. Make
                    sure that you have the correct permissions enabled on your
                    restricted API key for product fetching to work.
                  </div>
                ) : (
                  <div className="flex items-center text-sm justify-center w-full h-full min-h-[35vh] rounded-lg bg-gray-50 border border-gray-200 md:px-12 px-4 text-center">
                    Products can be synced automatically from Stripe! To do so,
                    please select an integration from the above dropdown menu.
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className={`flex flex-col items-center justify-center sticky bottom-0 bg-white pb-6 z-[2]`}
          >
            <div className="border-t border-gray-300 w-full"></div>
            {productsToCreate.length > 0 ? (
              <div
                className="btn btn-primary mt-4 text-white min-w-[160px]"
                onClick={() => createSelectedProducts()}
              >
                {isProductPending ? (
                  <LoadingDots color="#FFFFFF" />
                ) : (
                  `Create ${productsToCreate.length} product(s)`
                )}
              </div>
            ) : (
              <div
                className="btn btn-primary text-white mt-4"
                onClick={() => {
                  handleCreateProduct();
                  showToast("New product created.");
                  productModalRef.current?.close();
                }}
              >
                Create product manually
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

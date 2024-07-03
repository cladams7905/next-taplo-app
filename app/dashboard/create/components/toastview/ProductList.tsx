"use client";

import { Tables, TablesInsert } from "@/supabase/types";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/actions/products";
import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/userToasts";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

export default function ProductList({
  activeToast,
  setActiveToast,
  products,
}: {
  activeToast: Tables<"Toasts">;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  products: Tables<"Products">[];
}) {
  interface ProductRefs {
    [key: number]: {
      name: HTMLInputElement | null;
      price: HTMLInputElement | null;
      link: HTMLInputElement | null;
    };
  }
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const productRefs = useRef<ProductRefs>({});

  const [currentProducts, setCurrentProducts] = useState<Tables<"Products">[]>(
    products.filter((product) => product.toast_id === activeToast?.id)
  );
  const [activeProduct, setActiveProduct] = useState<Tables<"Products"> | null>(
    currentProducts[0] || null
  );
  const [isShowProductsChecked, setShowProductsChecked] = useState(
    activeToast?.show_products || false
  );

  useEffect(() => {
    if (products && activeToast) {
      setShowProductsChecked(activeToast.show_products);
      const filteredProducts = products.filter(
        (product) => product.toast_id === activeToast?.id
      );
      setCurrentProducts(filteredProducts);
      setActiveProduct(filteredProducts[0] || null);
    }
  }, [activeToast, products]);

  const handleShowProductsToggle = () => {
    startTransition(async () => {
      if (activeToast) {
        const updatedToast = {
          ...activeToast,
          show_products: !isShowProductsChecked,
        };
        const { error } = await updateUserToast(activeToast.id, updatedToast);
        if (error) {
          showToastError(error);
        } else {
          setActiveToast(updatedToast);
          setShowProductsChecked(!isShowProductsChecked);
        }
      }
    });
  };

  const handleCreateProduct = () => {
    startTransition(async () => {
      if (activeToast) {
        const product: TablesInsert<"Products"> = { toast_id: activeToast.id };
        const { data, error } = await createProduct(product);
        if (error) {
          showToastError(error);
        } else {
          setCurrentProducts((prevProducts) => [...prevProducts, data]);
          router.refresh();
        }
      }
    });
  };

  const handleDeleteProduct = (productId: number) => {
    startTransition(async () => {
      if (activeToast) {
        const { data, error } = await deleteProduct(productId);
        if (error) {
          showToastError(error);
        } else {
          setCurrentProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== data.id)
          );
          router.refresh();
        }
      }
    });
  };

  useEffect(() => {
    const handleUpdateProduct = (event: MouseEvent) => {
      startTransition(() => {
        if (activeToast && activeProduct) {
          const productRef = productRefs.current[activeProduct.id];
          const currentProduct = currentProducts.find(
            (product) => product.id === activeProduct.id
          );
          if (!currentProduct || !productRef) return;

          let updatedProduct = { ...currentProduct };
          let shouldUpdate = false;

          if (
            productRef.name &&
            productRef.name.value !== "" &&
            productRef.name.value !== currentProduct.name
          ) {
            updatedProduct = {
              ...updatedProduct,
              name: productRef.name.value,
            };
            shouldUpdate = true;
          }
          if (
            productRef.price &&
            productRef.price.value !== "" &&
            productRef.price.value !== currentProduct.price?.toString()
          ) {
            updatedProduct = {
              ...updatedProduct,
              price: parseFloat(productRef.price.value),
            };
            shouldUpdate = true;
          }
          if (
            productRef.link &&
            productRef.link.value !== "" &&
            productRef.link.value !== currentProduct.link
          ) {
            updatedProduct = {
              ...updatedProduct,
              link: productRef.link.value,
            };
            shouldUpdate = true;
          }

          if (shouldUpdate) {
            setActiveProduct(updatedProduct);
            updateProduct(activeProduct.id, updatedProduct);
            router.refresh();
          }
        }
      });
    };

    document.addEventListener("mousedown", handleUpdateProduct);
    return () => {
      document.removeEventListener("mousedown", handleUpdateProduct);
    };
  }, [activeProduct, activeToast, currentProducts, router]);

  const assignRef = (
    el: HTMLInputElement | null,
    productId: number,
    refType: keyof ProductRefs[number]
  ) => {
    if (el) {
      if (!productRefs.current[productId]) {
        productRefs.current[productId] = {
          name: null,
          price: null,
          link: null,
        };
      }
      productRefs.current[productId][refType] = el;
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row items-center gap-2">
          Show Products
          <input
            type="checkbox"
            checked={isShowProductsChecked}
            className="toggle toggle-primary toggle-sm"
            onChange={handleShowProductsToggle}
          />
          {isPending && (
            <span className="loading loading-spinner loading-sm bg-base-content ml-4" />
          )}
        </div>
        {isShowProductsChecked && (
          <div
            className="btn btn-ghost btn-sm mt-2 max-w-fit"
            onClick={handleCreateProduct}
          >
            <Plus width={18} height={18} />
            Add New Product
          </div>
        )}
      </div>
      {isShowProductsChecked &&
        (!currentProducts || currentProducts.length === 0 ? (
          <div className="text-gray-500 text-sm">
            You haven&apos;t created any products yet.
          </div>
        ) : (
          currentProducts.map((product, i) => (
            <div
              key={product.id}
              className="flex flex-row w-full items-center gap-2 mb-4"
            >
              <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <p className="text-sm mt-4">Product Name</p>
                    <input
                      type="text"
                      ref={(el) => assignRef(el, product.id, "name")}
                      onMouseDown={() => setActiveProduct(product)}
                      placeholder="Ex: Tennis Shoes"
                      defaultValue={product.name || ""}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm mt-4">Price</p>
                    <input
                      type="text"
                      ref={(el) => assignRef(el, product.id, "price")}
                      onMouseDown={() => setActiveProduct(product)}
                      placeholder="0.00"
                      defaultValue={product.price || ""}
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <p className="text-sm">Link (optional)</p>
                  <input
                    type="url"
                    ref={(el) => assignRef(el, product.id, "link")}
                    onMouseDown={() => setActiveProduct(product)}
                    placeholder="https://www.my-site.com/my-awesome-product"
                    defaultValue={product.link || ""}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div
                className="hover:bg-link-hover p-2 rounded-lg cursor-pointer -mt-10"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Trash2 width={18} height={18} />
              </div>
            </div>
          ))
        ))}
    </div>
  );
}

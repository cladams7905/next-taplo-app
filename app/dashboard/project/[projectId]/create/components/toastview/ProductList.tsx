"use client";

import { Tables, TablesInsert } from "@/supabase/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useTransition,
} from "react";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/actions/products";
import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";
import { Camera, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import Image from "next/image";

export default function ProductList({
  activeToast,
  setActiveToast,
  isShowProductsChecked,
  setShowProductsChecked,
  products,
  setProducts,
  activeProduct,
  setActiveProduct,
  productImageSrc,
  setProductImageSrc,
}: {
  activeToast: Tables<"Toasts">;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  isShowProductsChecked: boolean;
  setShowProductsChecked: Dispatch<SetStateAction<boolean>>;
  products: Tables<"Products">[];
  setProducts: Dispatch<SetStateAction<Tables<"Products">[]>>;
  activeProduct: Tables<"Products"> | null;
  setActiveProduct: Dispatch<SetStateAction<Tables<"Products"> | null>>;
  productImageSrc: string;
  setProductImageSrc: Dispatch<SetStateAction<string>>;
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

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    startTransition(async () => {
      const supabase = createClient();
      let file;
      if (e.target.files) {
        file = e.target.files[0];
        const filename = `${activeToast.user_id}/${file?.name}`;
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(filename, file, {
            upsert: true,
          })
          .then();
        if (error) {
          showToastError(error);
        } else {
          const newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;
          setProductImageSrc(newImageUrl);
          const { error } = await updateProduct(productId, {
            image_url: newImageUrl,
          });
          if (error) {
            showToastError(error);
          } else {
            router.refresh();
          }
        }
      }
    });
  };

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
          setProducts((prevProducts) => [...prevProducts, data]);
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
          setProducts((prevProducts) =>
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
          const currentProduct = products.find(
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
  }, [activeProduct, setActiveProduct, activeToast, products, router]);

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
        <div className="flex flex-row items-center gap-3">
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
            className="btn text-white btn-primary btn-sm mt-2 max-w-fit"
            onClick={handleCreateProduct}
          >
            <Plus width={18} height={18} />
            Add New Product
          </div>
        )}
      </div>
      {isShowProductsChecked &&
        (!products || products.length === 0 ? (
          <div className="text-gray-500 text-sm">
            You haven&apos;t created any products yet.
          </div>
        ) : (
          products.map((product, i) => (
            <div
              key={product.id}
              className="flex flex-row w-full items-center gap-4 mb-4"
            >
              <div className="flex w-fit items-center">
                <label
                  htmlFor="product-image-file-input"
                  className={`flex justify-center cursor-pointer items-center min-w-[48px] max-h-[48px] aspect-square rounded-lg ${
                    !product.image_url || product.image_url === ""
                      ? "bg-primary/35"
                      : "bg-white"
                  } relative`}
                >
                  <input
                    type="file"
                    name="image"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="product-image-file-input"
                    onChange={(e) => handleFileUpload(e, product.id)}
                  />
                  {product.image_url && product.image_url !== "" ? (
                    <Image
                      width={48}
                      height={48}
                      alt="product-img"
                      src={product.image_url}
                      className="rounded-lg"
                    />
                  ) : (
                    <Camera
                      width={20}
                      height={20}
                      color="oklch(var(--p)"
                      className="!z-[1]"
                    />
                  )}
                </label>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <p className="text-xs mt-4">Product Name</p>
                    <input
                      type="text"
                      ref={(el) => assignRef(el, product.id, "name")}
                      onMouseDown={() => setActiveProduct(product)}
                      placeholder="Ex: Tennis Shoes"
                      defaultValue={product.name || ""}
                      className="input input-bordered input-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs mt-4">Price</p>
                    <input
                      type="text"
                      ref={(el) => assignRef(el, product.id, "price")}
                      onMouseDown={() => setActiveProduct(product)}
                      placeholder="0.00"
                      defaultValue={product.price || ""}
                      className="input input-bordered input-sm max-w-[120px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <p className="text-xs">Link (optional)</p>
                  <input
                    type="url"
                    ref={(el) => assignRef(el, product.id, "link")}
                    onMouseDown={() => setActiveProduct(product)}
                    placeholder="https://www.my-site.com/my-awesome-product"
                    defaultValue={product.link || ""}
                    className="input input-bordered input-sm w-full"
                  />
                </div>
              </div>
              <div
                className="hover:bg-link-hover p-2 rounded-lg cursor-pointer -mt-6"
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

"use client";

import { Tables } from "@/supabase/types";
import { ChangeEvent, TransitionStartFunction, useTransition } from "react";
import { deleteProduct, updateProduct } from "@/lib/actions/products";
import { showToastError } from "@/app/_components/shared/showToast";
import { Camera, Trash2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useProjectContext } from "@/app/dashboard/_components/ProjectContext";

const ProductList = ({
  startLoadTransition,
}: {
  startLoadTransition: TransitionStartFunction;
}) => {
  const {
    activeProject,
    products,
    setProducts,
    activeProduct,
    setActiveProduct,
  } = useProjectContext();

  const [isProductListPending, startProductTransition] = useTransition();

  const handleToggleActiveProduct = (currentProduct: Tables<"Products">) => {
    if (!activeProduct || activeProduct.id !== currentProduct.id) {
      setActiveProduct(currentProduct);
    }
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const supabase = createClient();

    const file = e.target.files?.[0];
    if (!file) return;

    startLoadTransition(async () => {
      const filename = `${activeProject.user_id}/${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filename, file, { upsert: true });

      if (uploadError) {
        showToastError(uploadError);
      } else {
        const newImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;
        const { error: updateError } = await updateProduct(productId, {
          image_url: newImageUrl,
        });

        if (updateError) {
          showToastError(updateError);
        } else {
          setActiveProduct({
            ...activeProduct!,
            image_url: newImageUrl,
          });
        }
      }
    });
  };

  const handleDeleteProduct = (productId: number) => {
    startLoadTransition(async () => {
      const { data, error } = await deleteProduct(productId);
      if (error) {
        showToastError(error);
      } else {
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (product) => product.id !== data.id
          );
          setActiveProduct(
            updatedProducts.length > 0 ? updatedProducts[0] : undefined
          );
          return updatedProducts;
        });
      }
    });
  };

  const handleUpdateProduct = (
    event: React.FocusEvent<HTMLInputElement>,
    product: Tables<"Products">
  ) => {
    const { name, value } = event.target;
    let updatedProduct = { ...product };
    let shouldUpdate = false;

    if (name === "name" && value !== product.name) {
      updatedProduct = { ...updatedProduct, name: value };
      shouldUpdate = true;
    }

    if (name === "price" && parseFloat(value) !== product.price) {
      updatedProduct = { ...updatedProduct, price: parseFloat(value) };
      shouldUpdate = true;
    }

    if (name === "link" && value !== product.link) {
      updatedProduct = { ...updatedProduct, link: value };
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      startLoadTransition(() => {
        updateProduct(product.id, updatedProduct);
        setActiveProduct({
          ...activeProduct,
          ...updatedProduct,
        });
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {!products || products.length === 0 ? (
        <div className="px-4 text-xs text-center text-gray-400">
          To enable products, first create a new event.
        </div>
      ) : !isProductListPending ? (
        products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleToggleActiveProduct(product)}
            className="relative flex flex-row w-full items-center mb-4 rounded-lg bg-white border border-gray-200 py-5 pr-2 pl-5"
          >
            <div
              className={`absolute left-0 rounded-l-lg w-[8px] h-full ${
                activeProduct && activeProduct.id === product.id
                  ? "block bg-primary"
                  : "hidden"
              }`}
            />
            <div className="flex w-fit items-center">
              <label
                htmlFor="product-image-file-input"
                className={`flex justify-center mr-3 -mt-5 cursor-pointer items-center min-w-[48px] max-h-[48px] aspect-square rounded-lg ${
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
                    className="rounded-lg aspect-square object-cover"
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
                  <p className="text-xs">Product Name</p>
                  <input
                    type="text"
                    name="name"
                    onBlur={(e) => handleUpdateProduct(e, product)}
                    placeholder="Ex: Tennis Shoes"
                    defaultValue={product.name || ""}
                    className="input input-bordered input-sm w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs">Price</p>
                  <input
                    type="text"
                    name="price"
                    onBlur={(e) => handleUpdateProduct(e, product)}
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
                  name="link"
                  onBlur={(e) => handleUpdateProduct(e, product)}
                  placeholder="https://www.my-site.com/my-awesome-product"
                  defaultValue={product.link || ""}
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>
            <div
              className="hover:bg-link-hover p-2 ml-1 rounded-lg cursor-pointer -mt-10"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <Trash2 width={18} height={18} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-row w-full items-center mt-4 mb-4">
          <div className="flex w-fit items-center">
            <div className="skeleton bg-primary/20 mr-3 items-center min-w-[48px] max-h-[48px] aspect-square rounded-lg"></div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <div className="skeleton rounded-lg h-6 w-full bg-primary/20" />
            <div className="skeleton rounded-lg h-6 w-[80%] bg-primary/20" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

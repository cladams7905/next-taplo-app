"use client";

import NewIntegrationModal from "@/app/dashboard/connect/components/NewIntegrationModal";
import { showToastError } from "@/components/shared/showToast";
import { updateUserToast } from "@/lib/actions/userToasts";
import { ToastType } from "@/lib/enums";
import { Tables, TablesInsert } from "@/supabase/types";
import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { CirclePlus, Plus, Router } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { setToastContent } from "../TemplateModal";
import { createProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

export const ToastEventTab = ({
  activeToast,
  setActiveToast,
  integrations,
  products,
}: {
  activeToast: Tables<"Toasts"> | undefined;
  setActiveToast: Dispatch<SetStateAction<Tables<"Toasts"> | undefined>>;
  integrations: Tables<"Integrations">[];
  products: Tables<"Products">[];
}) => {
  const router = useRouter();
  const toastTypes = Object.values(ToastType);
  const newIntegrationModalRef = useRef<HTMLDialogElement>(null);
  const [currentIntegrations, setCurrentIntegrations] =
    useState<Tables<"Integrations">[]>(integrations);
  const [isPending, startTransition] = useTransition();
  const [currentProducts, setCurrentProducts] =
    useState<Tables<"Products">[]>(products);
  const [isShowProductsChecked, setShowProductsChecked] = useState(
    activeToast?.show_products || false
  );

  useEffect(() => {
    if (products && activeToast) {
      setShowProductsChecked(activeToast.show_products);
      setCurrentProducts(
        products.filter((product) => product.toast_id === activeToast?.id)
      );
    }
  }, [activeToast, products]);

  const handleTypeSelect = async (toastType: ToastType) => {
    if (activeToast && toastType) {
      const updatedToast = {
        ...activeToast,
        event_type: toastType.toString() !== "default" ? toastType : "",
        content: setToastContent(toastType),
      };
      setActiveToast(updatedToast);
      const { error } = await updateUserToast(activeToast.id, updatedToast);
      if (error) {
        showToastError(error);
      }
    }
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

  const handleIntegrationSelect = async (integration: string) => {
    const integrationId = integrations.find((x) => x.name === integration)?.id;
    if (activeToast && integrationId) {
      const updatedToast = { ...activeToast, integration_id: integrationId };
      setActiveToast(updatedToast);
      const { error } = await updateUserToast(activeToast.id, updatedToast);
      if (error) {
        showToastError(error);
      }
    }
  };

  const handleCreateProduct = () => {
    startTransition(async () => {
      if (activeToast) {
        const product: TablesInsert<"Products"> = { toast_id: activeToast.id };
        const { data, error } = await createProduct(product);
        if (error) {
          showToastError(error);
        } else {
          setCurrentProducts((prevProducts) => [
            ...prevProducts.filter(
              (product) => product.toast_id === activeToast?.id
            ),
            data,
          ]);
          router.refresh();
        }
      }
    });
  };

  return (
    <div className="flex flex-col w-2/3 gap-6">
      <p className="text-xl font-bold text-left">Toast Event</p>
      <div className="flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p>Event Type</p>
            {!activeToast?.event_type && (
              <div className="flex items-center gap-1">
                <p className="text-sm text-error">Required</p>
                <ExclamationTriangleIcon color="oklch(var(--er))" />
              </div>
            )}
          </div>
          <select
            className="select select-bordered border-neutral w-full"
            value={activeToast?.event_type || "default"}
            onChange={(e) => handleTypeSelect(e.target.value as ToastType)}
          >
            <option value={"default"}>Select</option>
            {toastTypes.map((toastType, i) => (
              <option key={i} value={toastType}>
                {toastType}
              </option>
            ))}
          </select>
        </div>
        {activeToast?.event_type === ToastType.PaymentComplete && (
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-row items-center gap-2">
                Show Products
                <input
                  type="checkbox"
                  checked={isShowProductsChecked}
                  className="toggle toggle-sm"
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
            {isShowProductsChecked && (
              <ProductList
                products={currentProducts}
                setCurrentProducts={setCurrentProducts}
              />
            )}
          </div>
        )}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              Integration{" "}
              <div
                className="tooltip tooltip-info"
                data-tip="Integrations enable your toast to listen to notifications from a
              payment/subscription provider."
              >
                <QuestionMarkCircledIcon />
              </div>
            </div>
            {!activeToast?.integration_id && (
              <div className="flex items-center gap-1">
                <p className="text-sm text-error">Required</p>
                <ExclamationTriangleIcon color="oklch(var(--er))" />
              </div>
            )}
          </div>
          <div className="lg:flex gap-2">
            <select
              className="select select-bordered border-neutral w-full"
              value={
                integrations.find((x) => x.id === activeToast?.integration_id)
                  ?.name || "default"
              }
              onChange={(e) => handleIntegrationSelect(e.target.value)}
            >
              <option value={"default"}>Select</option>
              {integrations.map((integration, i) => (
                <option
                  key={i}
                  value={integration?.name ? integration.name : ""}
                >
                  {`(${integration.provider}) - ${integration.name}`}
                </option>
              ))}
            </select>
            <div
              className="btn lg:mt-0 mt-8 lg:w-auto w-full btn-primary text-white"
              onClick={() => newIntegrationModalRef.current?.showModal()}
            >
              <CirclePlus height={18} width={18} /> New Integration
            </div>
            <NewIntegrationModal
              newIntegrationModalRef={newIntegrationModalRef}
              integrations={currentIntegrations}
              setIntegrations={setCurrentIntegrations}
              activeToast={activeToast}
              setActiveToast={setActiveToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({
  products,
  setCurrentProducts,
}: {
  products: Tables<"Products">[];
  setCurrentProducts: Dispatch<SetStateAction<Tables<"Products">[]>>;
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        You haven&apos;t created any products yet.
      </div>
    );
  } else {
    return products.map((product, i) => (
      <div key={i} className="flex flex-row w-full items-center gap-2">
        <div className="flex flex-col w-full gap-1">
          {i === 0 && <p className="text-sm mt-4">Product Name</p>}
          <input
            type="text"
            placeholder="Ex: Tennis Shoes"
            defaultValue={product.name || ""}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          {i === 0 && <p className="text-sm mt-4">Price</p>}
          <input
            type="text"
            placeholder="0.00"
            defaultValue={product.price || ""}
            className="input input-bordered"
          />
        </div>
      </div>
    ));
  }
};

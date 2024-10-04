"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingDots from "@/app/_components/shared/loadingdots";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shared/form";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { CirclePlus, EyeIcon, Pencil } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/providers/stripe-logo.svg";
import GA4Logo from "@/public/images/providers/ga-logo.svg";
import { Tables } from "@/lib/supabase/types";
import {
  createIntegration,
  updateIntegration,
} from "@/lib/actions/integrations";
import { checkDuplicateTitle } from "@/lib/actions";
import { EventType, Providers } from "@/lib/enums";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import React from "react";

const PROVIDERS = Object.values(Providers) as [string, ...string[]];
const providersEnum = z.enum(PROVIDERS, {
  errorMap: (issue, ctx) => ({ message: "API Provider is required." }),
});
type ProvidersEnum = z.infer<typeof providersEnum>;

const FormSchema = z.object({
  provider: providersEnum,
  key: z.string().min(1, "API Key is required."),
  name: z.string().optional(),
});

export default function NewIntegrationForm({
  activeProject,
  integrations,
  setIntegrations,
  newIntegrationModalRef,
  currentEvent,
  handleUpdateEvent,
  integrationToEdit,
  setIntegrationToEdit,
}: {
  activeProject: Tables<"Projects">;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  currentEvent?: Tables<"Events">;
  handleUpdateEvent?: (event: Tables<"Events">, integrationId: number) => void;
  integrationToEdit?: Tables<"Integrations"> | undefined;
  setIntegrationToEdit?: Dispatch<
    SetStateAction<Tables<"Integrations"> | undefined>
  >;
}) {
  const [isPending, startTransition] = useTransition();
  const [provider, setProvider] = useState<ProvidersEnum>(
    integrationToEdit?.provider || ""
  );
  const [isShowApiKey, setShowApiKey] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provider: integrationToEdit?.provider || "",
      key: integrationToEdit?.api_key || "",
      name: integrationToEdit?.name || "",
    },
  });

  /**
   * This useEffect reinitializes the default values of the form field
   * whenever integrationToEdit changes.
   */
  useEffect(() => {
    if (integrationToEdit) {
      form.reset({
        provider: integrationToEdit?.provider || "",
        key: integrationToEdit?.api_key || "",
        name: integrationToEdit?.name || "",
      });
      setProvider(integrationToEdit?.provider || "");
    } else {
      form.reset({
        provider: "",
        key: "",
        name: "",
      });
      setProvider("");
    }
  }, [integrationToEdit, form]);

  /**
   * Handles the update of an existing integration
   */
  const handleIntegrationUpdate = async (
    formData: z.infer<typeof FormSchema>
  ) => {
    const { data: updateData, error: updateError } = await updateIntegration(
      integrationToEdit!.id,
      {
        api_key: formData.key,
        provider: formData.provider,
        name:
          formData.name ||
          checkDuplicateTitle(
            integrations.map((integration) => integration.name),
            `${formData.provider} API Key`
          ),
      }
    );

    return { data: updateData, error: updateError };
  };

  /**
   * Handles the creation of a new integration
   */
  const handleIntegrationCreate = async (
    formData: z.infer<typeof FormSchema>
  ) => {
    const { data: createData, error: createError } = await createIntegration({
      user_id: activeProject.user_id,
      project_id: activeProject.id,
      api_key: formData.key,
      provider: formData.provider,
      name:
        formData.name ||
        checkDuplicateTitle(
          integrations.map((integration) => integration.name),
          `${formData.provider} API Key`
        ),
    });

    return { data: createData, error: createError };
  };

  /**
   * Handles the submission of the form
   */
  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        let data, error;

        if (integrationToEdit) {
          ({ data, error } = await handleIntegrationUpdate(formData));
        } else {
          ({ data, error } = await handleIntegrationCreate(formData));
        }

        if (error) {
          showToastError(error);
          return;
        }

        if (data) {
          if (integrationToEdit) {
            setIntegrations((prevIntegrations) =>
              prevIntegrations.map((integration) =>
                integration.id === integrationToEdit?.id ? data : integration
              )
            );
          } else {
            setIntegrations((prevIntegrations) => [...prevIntegrations, data]);
            showToast(`Successfully created new ${data.provider} API Key.`);
          }

          if (currentEvent && handleUpdateEvent) {
            handleUpdateEvent(currentEvent, data.id);
          }
        }

        form.reset({
          provider: "",
          key: "",
          name: "",
        });
        setProvider("");
      } catch (error) {
        showToastError(error);
      } finally {
        if (setIntegrationToEdit) setIntegrationToEdit(undefined);
        newIntegrationModalRef.current?.close();
      }
    });
  };

  /**
   * Filters the available providers to select from in dropdown based on the current event type
   */
  const filterProvidersByEventType = useCallback(() => {
    let filteredProviders = PROVIDERS;
    if (currentEvent) {
      switch (currentEvent.event_type) {
        case EventType.Checkout:
        case EventType.Purchase:
        case EventType.CustomerTrends:
          filteredProviders = [Providers.Stripe];
          break;
        case EventType.SomeoneViewing:
        case EventType.ActiveVisitors:
          filteredProviders = [Providers.GoogleAnalytics];
          break;
      }
    }
    return filteredProviders;
  }, [currentEvent]);

  /**
   * Returns the logo of the selected provider
   */
  const getProviderLogo = (provider: ProvidersEnum) => {
    switch (provider) {
      case Providers.Stripe:
        return (
          <Image
            width={48}
            height={48}
            alt={"Stripe logo"}
            src={StripeLogo}
            className="rounded-lg"
          />
        );
      case Providers.GoogleAnalytics:
        return (
          <Image
            width={48}
            height={48}
            alt={"Google analytics logo"}
            src={GA4Logo}
            className="rounded-lg aspect-square"
          />
        );
      default:
        return null;
    }
  };

  const getProviderDescription = (provider: ProvidersEnum) => {
    switch (provider) {
      case Providers.Stripe:
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">For connecting to Stripe:</p>
            <ol className="list-decimal list-inside flex flex-col gap-2 max-h-28 overflow-y-scroll text-sm text-gray-500">
              <li>Create a new Stripe Restricted API key.</li>
              <li>
                View Taplo event details to know what permissions to enable (for
                example, the &quot;Recent Purchases&quot; event requires access
                to Stripe charges data).
              </li>
              <li>Paste your restricted API key below.</li>
            </ol>
          </div>
        );
      case Providers.GoogleAnalytics:
        return (
          <div className="flex flex-col">
            <p className="text-sm font-bold mb-3">
              For connecting to Google Analytics:
            </p>
            <ol className="list-decimal list-inside flex flex-col gap-2 max-h-32 overflow-y-scroll text-sm text-gray-500">
              <li>
                Create or access your project in the Google Cloud Console.
              </li>
              <li>
                Make sure the Google Analytics Data API is enabled for your
                project.
              </li>
              <li>
                Click &quot;Create Credentials&quot; and select &quot;API
                key&quot;.
              </li>
              <li>
                (Recommended) Under &quot;Website restrictions&quot;, add
                restricted access to https://www.taplo.io. Under &quot;API
                restrictions&quot;, restrict the API key to only being able to
                access the Google Analytics Data API.
              </li>
              <li>Paste your new API Key below.</li>
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredProviders = filterProvidersByEventType();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 pb-6 font-sans"
        autoComplete="on"
      >
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Provider</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <select
                    className="select select-bordered flex items-center gap-2 w-full"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setProvider(e.target.value as ProvidersEnum);
                    }}
                    value={field.value}
                  >
                    <option value="">Select</option>
                    {filteredProviders.map((provider, i) => (
                      <option key={i} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`w-1/5 aspect-square max-w-[48px] rounded-lg ${
                      !provider ? "bg-link-hover" : ""
                    }`}
                  >
                    {getProviderLogo(provider)}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {getProviderDescription(provider)}
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret API Key</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <input
                    placeholder=""
                    {...field}
                    type={isShowApiKey ? "text" : "password"}
                    className="input input-bordered flex items-center gap-2 w-full"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  <div
                    className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer"
                    onClick={() => setShowApiKey(!isShowApiKey)}
                  >
                    {isShowApiKey ? (
                      <EyeClosedIcon strokeWidth={2.5} />
                    ) : (
                      <EyeIcon strokeWidth={1.5} />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name (Optional)</FormLabel>
              <FormControl>
                <input
                  placeholder="My API Key"
                  {...field}
                  type="text"
                  className="input input-bordered flex items-center gap-2 w-full"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          onClick={form.handleSubmit(onSubmit)}
          className="w-full btn btn-primary text-white"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? (
            <LoadingDots color="#FFFFFF" />
          ) : integrationToEdit ? (
            <>
              <Pencil height={20} width={20} />
              Edit Integration
            </>
          ) : (
            <>
              <CirclePlus height={20} width={20} />
              Create New Integration
            </>
          )}
        </div>
      </form>
    </Form>
  );
}

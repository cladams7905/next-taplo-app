"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
  useMemo,
  useState,
  useTransition,
} from "react";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { CirclePlus, ExternalLink, EyeIcon, Pencil } from "lucide-react";
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
import Link from "next/link";

const PROVIDERS = Object.values(Providers) as [string, ...string[]];
const providersEnum = z.enum(PROVIDERS, {
  errorMap: (issue, ctx) => ({ message: "API Provider is required." }),
});

type ProvidersEnum = z.infer<typeof providersEnum>;

type ZodForm = UseFormReturn<ApiKeyOptions | GoogleOptions>;

type ApiKeyOptions = {
  provider: string;
  key: string;
  name?: string | undefined;
};
type GoogleOptions = {
  provider: string;
  name?: string | undefined;
  google_property_id: string;
  google_project_id: string;
  google_client_email: string;
  google_private_key: string;
};

const BaseSchema = z.object({
  provider: providersEnum,
});

const ApiKeySchema = BaseSchema.extend({
  key: z.string().min(1, "API Key is required."),
  name: z.string().optional(),
});

const GoogleAnalyticsSchema = BaseSchema.extend({
  name: z.string().optional(),
  google_property_id: z.string().min(1, "Property ID is required."),
  google_project_id: z.string().min(1, "Project ID is required."),
  google_client_email: z.string().min(1, "Client Email is required."),
  google_private_key: z.string().min(1, "Private Key is required."),
});

const FormSchema = z.union([ApiKeySchema, GoogleAnalyticsSchema]);

const getSchema = (provider: string) => {
  switch (provider) {
    case Providers.Stripe:
      return ApiKeySchema;
    case Providers.GoogleAnalytics:
      return GoogleAnalyticsSchema;
    default:
      return BaseSchema; // Fallback schema
  }
};

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

  const schema = useMemo(() => getSchema(provider), [provider]);

  const getFormProvider = (integrationToEdit?: Tables<"Integrations">) =>
    integrationToEdit?.provider || "";

  const getFormApiKey = (integrationToEdit?: Tables<"Integrations">) =>
    integrationToEdit && "api_key" in integrationToEdit
      ? integrationToEdit?.api_key ?? ""
      : "";

  const getFormName = (integrationToEdit?: Tables<"Integrations">) =>
    integrationToEdit?.name || "";

  const getFormGooglePropertyId = (
    integrationToEdit?: Tables<"Integrations">
  ) =>
    integrationToEdit && "google_property_id" in integrationToEdit
      ? integrationToEdit.google_property_id ?? ""
      : "";

  const getFormGoogleProjectId = (integrationToEdit?: Tables<"Integrations">) =>
    integrationToEdit && "google_project_id" in integrationToEdit
      ? integrationToEdit.google_project_id ?? ""
      : "";

  const getFormGoogleClientEmail = (
    integrationToEdit?: Tables<"Integrations">
  ) =>
    integrationToEdit && "google_client_email" in integrationToEdit
      ? integrationToEdit.google_client_email ?? ""
      : "";

  const getFormGooglePrivateKey = (
    integrationToEdit?: Tables<"Integrations">
  ) =>
    integrationToEdit && "google_private_key" in integrationToEdit
      ? integrationToEdit.google_private_key ?? ""
      : "";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: getFormProvider(integrationToEdit),
      key: getFormApiKey(integrationToEdit),
      name: getFormName(integrationToEdit),
      google_property_id: getFormGooglePropertyId(integrationToEdit),
      google_project_id: getFormGoogleProjectId(integrationToEdit),
      google_client_email: getFormGoogleClientEmail(integrationToEdit),
      google_private_key: getFormGooglePrivateKey(integrationToEdit),
    },
  });

  /**
   * This useEffect reinitializes the default values of the form field
   * whenever integrationToEdit changes.
   */
  useEffect(() => {
    if (integrationToEdit) {
      form.reset({
        provider: getFormProvider(integrationToEdit),
        key: getFormApiKey(integrationToEdit),
        name: getFormName(integrationToEdit),
        google_property_id: getFormGooglePropertyId(integrationToEdit),
        google_project_id: getFormGoogleProjectId(integrationToEdit),
        google_client_email: getFormGoogleClientEmail(integrationToEdit),
        google_private_key: getFormGooglePrivateKey(integrationToEdit),
      });
      setProvider(integrationToEdit?.provider || "");
    } else {
      form.reset({
        provider: "",
        key: "",
        name: "",
        google_property_id: "",
        google_project_id: "",
        google_client_email: "",
        google_private_key: "",
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
        api_key: "key" in formData ? formData.key : "",
        provider: formData.provider,
        name:
          formData.name ||
          checkDuplicateTitle(
            integrations.map((integration) => integration.name),
            `${formData.provider} API Key`
          ),
        google_property_id:
          "google_property_id" in formData
            ? formData.google_property_id
            : undefined,
        google_project_id:
          "google_project_id" in formData
            ? formData.google_project_id
            : undefined,
        google_client_email:
          "google_client_email" in formData
            ? formData.google_client_email
            : undefined,
        google_private_key:
          "google_private_key" in formData
            ? formData.google_private_key
            : undefined,
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
      api_key: "key" in formData ? formData.key : "",
      provider: formData.provider,
      name:
        formData.name ||
        checkDuplicateTitle(
          integrations.map((integration) => integration.name),
          `${formData.provider} API Key`
        ),
      google_property_id:
        "google_property_id" in formData
          ? formData.google_property_id
          : undefined,
      google_project_id:
        "google_project_id" in formData
          ? formData.google_project_id
          : undefined,
      google_client_email:
        "google_client_email" in formData
          ? formData.google_client_email
          : undefined,
      google_private_key:
        "google_private_key" in formData
          ? formData.google_private_key
          : undefined,
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
          google_property_id: "",
          google_project_id: "",
          google_client_email: "",
          google_private_key: "",
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
        case EventType.ActiveUsers:
          filteredProviders = [Providers.GoogleAnalytics];
          break;
      }
    }
    return filteredProviders;
  }, [currentEvent]);

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
        {provider && (
          <div className="inline-block gap-2 text-sm font-semibold !py-3">
            Follow{" "}
            <Link
              href={getProviderGuideURL(provider)}
              target="_blank"
              className="link inline-flex items-center gap-1 link-primary"
            >
              this guide
              <ExternalLink width={16} height={16} />
            </Link>{" "}
            for steps to connect to {provider}.
          </div>
        )}
        {getFormOptions(form, provider)}
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
        <div className="text-sm">
          Need help setting up an integration? Email me at{" "}
          <Link
            href={`mailto:help@taplo.io?subject=Help%20setting%20up%20integration`}
            target="_blank"
            className="link link-primary"
          >
            help@taplo.io
          </Link>
          .
        </div>
      </form>
    </Form>
  );
}

/**
 * Returns the field options for the selected provider
 */
const getFormOptions = (form: ZodForm, provider: ProvidersEnum) => {
  switch (provider) {
    case Providers.Stripe:
      return <ApiKeyOptions form={form} />;
    case Providers.GoogleAnalytics:
      return <GoogleOptions form={form} />;
    default:
      return null;
  }
};

/**
 * Returns the form fields for an integration requiring an API Key
 */
const ApiKeyOptions = ({ form }: { form: ZodForm }) => {
  const [isShowApiKey, setShowApiKey] = useState(false);
  return (
    <FormField
      control={form.control}
      name="key"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Secret API Key*</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <input
                placeholder=""
                {...field}
                type={isShowApiKey ? "text" : "password"}
                className="input input-bordered flex items-center gap-2 w-full"
                onChange={field.onChange}
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
  );
};

/**
 * Returns the form fields for Google Analytics integration
 */
const GoogleOptions = ({ form }: { form: ZodForm }) => {
  const [isShowPrivateKey, setShowPrivateKey] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  return (
    <>
      <label className="flex items-center gap-2 w-full cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            handleFileUpload(e, form, setFileError, setUploadedFile)
          }
        />
        <div className="btn btn-accent btn-sm text-white">Upload</div>
        <p className={`text-sm ${fileError ? "text-error" : ""}`}>
          {fileError
            ? fileError
            : uploadedFile
            ? uploadedFile
            : "Upload your Google credentials.json file here"}
        </p>
      </label>
      <FormField
        control={form.control}
        name="google_property_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property ID*</FormLabel>
            <FormControl>
              <input
                placeholder=""
                {...field}
                type="text"
                className="input input-bordered flex items-center gap-2 w-full"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="google_project_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project ID*</FormLabel>
            <FormControl>
              <input
                placeholder=""
                {...field}
                type="text"
                className="input input-bordered flex items-center gap-2 w-full"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="google_client_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Google client email*</FormLabel>
            <FormControl>
              <input
                placeholder=""
                {...field}
                type="email"
                className="input input-bordered flex items-center gap-2 w-full"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="google_private_key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Private Key*</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <input
                  placeholder=""
                  {...field}
                  type={isShowPrivateKey ? "text" : "password"}
                  className="input input-bordered flex items-center gap-2 w-full"
                  onChange={field.onChange}
                />
                <div
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer"
                  onClick={() => setShowPrivateKey(!isShowPrivateKey)}
                >
                  {isShowPrivateKey ? (
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
    </>
  );
};

/**
 * Handles the file upload for Google Analytics credentials
 */
const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: ZodForm,
  setFileError: (error: string | null) => void,
  setUploadedFile: (file: string | null) => void
) => {
  const file = e.target.files?.[0];
  if (!file) {
    setFileError("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const fileContents = e.target?.result;
    if (!fileContents) {
      setFileError("File is empty.");
      return;
    }
    try {
      const credentials = JSON.parse(fileContents as string);
      if (
        !credentials.client_email ||
        !credentials.private_key ||
        !credentials.project_id
      ) {
        setFileError(
          "Credentials not found. Please upload a valid credentials.json file."
        );
        return;
      } else {
        setUploadedFile(file.name);
        form.setValue("google_project_id", credentials.project_id);
        form.setValue("google_client_email", credentials.client_email);
        form.setValue("google_private_key", credentials.private_key);
        setFileError(null);
      }
    } catch (error) {
      setFileError(
        "Invalid JSON file. Please upload a valid credentials.json file."
      );
    }
  };
  reader.onerror = () => {
    setFileError(
      "Invalid JSON file. Please upload a valid credentials.json file."
    );
  };
  reader.readAsText(file);
};

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

/**
 * Returns the guide URL for the selected provider
 */
const getProviderGuideURL = (provider: ProvidersEnum) => {
  switch (provider) {
    case Providers.Stripe:
      return "/docs/integrations/stripe";
    case Providers.GoogleAnalytics:
      return "/docs/integrations/google-analytics";
    default:
      return "";
  }
};

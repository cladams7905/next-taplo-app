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
import LemonSqueezyLogo from "@/public/images/providers/lemonsqueezy-logo.jpeg";
import { Tables } from "@/supabase/types";
import {
  createIntegration,
  updateIntegration,
} from "@/lib/actions/integrations";
import { checkDuplicateTitle } from "@/lib/actions";
import { EventType, Providers } from "@/lib/enums";
import { EyeClosedIcon } from "@radix-ui/react-icons";

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

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        let data, error;

        //Check to see if there is an integration to edit. If there is, then update.
        //If not, then create a new one.
        if (integrationToEdit) {
          const { data: updateData, error: updateError } =
            await updateIntegration(integrationToEdit.id, {
              api_key: formData.key,
              provider: formData.provider,
              name:
                formData.name ||
                checkDuplicateTitle(
                  integrations.map((integration) => integration.name),
                  `${formData.provider} API Key`
                ),
            });

          data = updateData;
          error = updateError;
        } else {
          const { data: createData, error: createError } =
            await createIntegration({
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

          data = createData;
          error = createError;
        }

        if (error) {
          showToastError(error);
          return;
        }

        if (integrationToEdit) {
          setIntegrations((prevIntegrations) =>
            prevIntegrations.map((integration) =>
              integration.id === integrationToEdit?.id ? data : integration
            )
          );
        } else {
          setIntegrations((prevIntegrations) => [...prevIntegrations, data]);
        }

        //if the new integration form is opened within the event settings on the create page,
        //then also update the corresponding event with the integration id.
        if (currentEvent && handleUpdateEvent) {
          handleUpdateEvent(currentEvent, data.id);
        }
        showToast(`Successfully created new ${data.provider} API Key.`);

        // Reset form values after successful submission
        form.reset({
          provider: "",
          key: "",
          name: "",
        });
        setProvider("");
      } catch (error) {
        showToastError(error);
      } finally {
        newIntegrationModalRef.current?.close();
      }
    });
  }
  const filterProvidersByEventType = useCallback(() => {
    let filteredProviders = PROVIDERS;
    if (currentEvent) {
      switch (currentEvent.event_type) {
        case EventType.AddToCart:
        case EventType.SomeoneViewing:
        case EventType.Purchase:
          filteredProviders = [Providers.Stripe];
          break;
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
                  <div className="w-1/5 aspect-square max-w-[48px] bg-link-hover rounded-lg">
                    {provider !== undefined && provider === "Stripe" && (
                      <Image
                        width={48}
                        height={48}
                        alt={"Stripe logo"}
                        src={StripeLogo}
                        className="rounded-lg"
                      />
                    )}
                    {provider !== undefined && provider === "LemonSqueezy" && (
                      <Image
                        width={48}
                        height={48}
                        alt={"LemonSqueezy logo"}
                        src={LemonSqueezyLogo}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {provider === "Stripe" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">For connecting to Stripe: </p>
            <p className="text-sm text-gray-500">
              1. Create a Stripe Restricted API key with only
              &quot;charges&quot; permissions set to &quot;read&quot;.{" "}
            </p>
            <p className="text-sm text-gray-500">
              2. Paste your restricted API key below.
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
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

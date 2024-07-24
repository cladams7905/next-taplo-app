"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingDots from "@/components/shared/loadingdots";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { showToast, showToastError } from "@/components/shared/showToast";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/stripe-logo.svg";
import LemonSqueezyLogo from "@/public/images/lemonsqueezy-logo.jpeg";
import { Tables } from "@/supabase/types";
import { createIntegration } from "@/lib/actions/integrations";
import { checkDuplicateTitle } from "@/lib/actions";
import { updateProject, updateUserToast } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";

const PROVIDERS = ["Stripe", "LemonSqueezy"] as const;
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
  newIntegrationModalRef,
  integrations,
  setIntegrations,
  activeToast,
  setActiveToast,
}: {
  newIntegrationModalRef: RefObject<HTMLDialogElement>;
  integrations: Tables<"Integrations">[];
  setIntegrations: Dispatch<SetStateAction<Tables<"Integrations">[]>>;
  activeToast?: Tables<"Projects">;
  setActiveToast?: Dispatch<SetStateAction<Tables<"Projects"> | undefined>>;
}) {
  const [isPending, startTransition] = useTransition();
  const [provider, setProvider] = useState<ProvidersEnum>();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provider: undefined,
      key: "",
      name: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { data, error } = await createIntegration({
        api_key: formData.key,
        provider: formData.provider,
        name: formData.name
          ? formData.name
          : checkDuplicateTitle(
              integrations.map((integration) => integration.name),
              `${formData.provider} API Key`
            ),
      });
      if (error) {
        showToastError(error);
      } else {
        setIntegrations((prevIntegrations) => [...prevIntegrations, data]);
        if (activeToast && setActiveToast) {
          setActiveToast({
            ...activeToast,
            integration_id: data.id,
          });
          const { error } = await updateProject(activeToast.id, {
            ...activeToast,
            integration_id: data.id,
          });
          if (error) {
            showToastError(error);
          } else {
            router.refresh();
            showToast(`Successfully created new ${data.provider} API Key.`);
          }
        } else {
          showToast(`Successfully created new ${data.provider} API Key.`);
        }
      }
      newIntegrationModalRef.current?.close();
    });
  }

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
                    {PROVIDERS.map((provider, i) => (
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
        {provider !== undefined && provider === "Stripe" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">For connecting to Stripe: </p>
            <p className="text-sm text-gray-500">
              1. Create a Stripe Restricted API key with only "charges"
              permissions set to "read".{" "}
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
                <input
                  placeholder=""
                  {...field}
                  type="password"
                  className="input input-bordered flex items-center gap-2 w-full"
                  onChange={field.onChange}
                  value={field.value}
                />
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

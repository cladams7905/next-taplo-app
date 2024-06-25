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
import { useState, useTransition } from "react";
import { showToast, showToastError } from "@/components/shared/showToast";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import StripeLogo from "@/public/images/stripe-logo.svg";

const PROVIDERS = ["Stripe", "LemonSqueezy"] as const;
const providersEnum = z.enum(PROVIDERS, {
  errorMap: (issue, ctx) => ({ message: "API Provider is required." }),
});
type ProvidersEnum = z.infer<typeof providersEnum>;

const FormSchema = z.object({
  provider: providersEnum,
  secret: z.string().min(1, "API Key is required."),
  name: z.string().optional(),
});

export default function NewKeyForm() {
  const [isPending, startTransition] = useTransition();
  const [provider, setProvider] = useState<ProvidersEnum>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provider: undefined,
      secret: "",
      name: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      // handle submission
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
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
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
              Create New API Key
            </>
          )}
        </div>
      </form>
    </Form>
  );
}

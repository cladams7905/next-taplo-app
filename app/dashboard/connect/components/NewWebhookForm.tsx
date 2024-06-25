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
import { useTransition } from "react";
import { showToast, showToastError } from "@/components/shared/showToast";
import { CirclePlus } from "lucide-react";

const FormSchema = z.object({
  endpoint: z.string(),
  secret: z.string(),
  event_type: z.string(),
});

export default function NewWebhookForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      endpoint: "",
      secret: "",
      event_type: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {});
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 my-6 font-sans"
        autoComplete="on"
      >
        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook Endpoint</FormLabel>
              <FormControl>
                <input
                  placeholder="https://stripe/"
                  {...field}
                  type="url"
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
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook Secret</FormLabel>
              <FormControl>
                <input
                  placeholder=""
                  {...field}
                  type="password"
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
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <FormControl>
                <input
                  placeholder="Ex: On payment complete"
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
        <div
          onClick={form.handleSubmit(onSubmit)}
          className="w-full btn btn-primary text-white"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? (
            <LoadingDots color="#FFFFFF" />
          ) : (
            <>
              {" "}
              <CirclePlus height={20} width={20} />
              Create New Webhook
            </>
          )}
        </div>
      </form>
    </Form>
  );
}

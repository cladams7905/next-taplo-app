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
import { createClient } from "@/supabase/client";
import { showToast, showToastError } from "@/components/shared/showToast";
import { getURL } from "@/lib/actions";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const resetPasswordWithEmail = (data: { email: string }) => {
    const result = supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: getURL() + "/account/update-password",
    });
    return JSON.stringify(result);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(
        resetPasswordWithEmail({ email: formData.email })
      );

      if (error) {
        showToastError(error);
      } else {
        showToast(`An email has been sent to ${formData.email} with a link
                to reset your password. Please check your email!`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-6 font-sans"
        autoComplete="on"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  placeholder="example@gmail.com"
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
        <div
          onClick={form.handleSubmit(onSubmit)}
          className="w-full btn btn-primary text-white"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? <LoadingDots color="#FFFFFF" /> : "Send Link"}
        </div>
      </form>
    </Form>
  );
}

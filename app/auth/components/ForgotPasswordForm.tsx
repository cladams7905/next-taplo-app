"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingDots from "@/components/shared/LoadingDots";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { toast } from "@/components/shared/use-toast";
import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const resetPasswordWithEmail = (data: { email: string }) => {
    const result = supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${location.origin}/account/update-password`,
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
        toast({
          variant: "destructive",
          description: (
            <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
              <p>{`Error ${error.status}: ` + error.name}</p>
            </pre>
          ),
        });
      } else {
        toast({
          description: (
            <pre className="font-sans rounded-md text-wrap break-words whitespace-normal">
              <p>
                An email has been sent to{" "}
                <span className="font-bold">{formData.email}</span> with a link
                to reset your password. Please check your email!
              </p>
            </pre>
          ),
        });
      }
    });
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
          className="w-full btn btn-neutral"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? <LoadingDots color="#FFFFFF" /> : "Send Link"}
        </div>
      </form>
    </Form>
  );
}

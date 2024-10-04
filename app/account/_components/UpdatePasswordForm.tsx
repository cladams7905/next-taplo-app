"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shared/form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showToast, showToastError } from "@/app/_components/shared/showToast";

const FormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords do not match.",
    path: ["confirm"],
  })
  .refine((data) => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(data.confirm), {
    message: "Password does not contain numbers and letters.",
    path: ["confirm"],
  });

export default function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const supabase = createClient();

  const updatePassword = async (data: { new_password: string }) => {
    const result = await supabase.auth.updateUser({
      password: data.new_password,
    });
    return JSON.stringify(result);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(
        await updatePassword({ new_password: formData.password })
      );
      console.log(error);
      if (error) {
        showToastError(error);
      } else {
        router.push("/login");
        showToast("Password updated!");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <input
                  placeholder="Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                  className="input input-bordered flex items-center gap-2 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <input
                  placeholder="Confirm Password"
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
        <div
          onClick={form.handleSubmit(onSubmit)}
          className="w-full btn btn-neutral"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md bg-base-100"></span>
          ) : (
            "Update Password"
          )}
        </div>
      </form>
    </Form>
  );
}

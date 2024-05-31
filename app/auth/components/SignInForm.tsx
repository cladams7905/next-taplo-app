"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signInWithEmailAndPassword } from "../actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { useTransition } from "react";
import LoadingDots from "@/components/shared/LoadingDots";
import Link from "next/link";
import { showToastError } from "@/components/shared/showToast";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password is required.",
  }),
});

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(formData);
      const { error } = JSON.parse(result);

      if (error) {
        if (error.status === 400) {
          showToastError(
            error,
            error.status === 400
              ? `Incorrect username or password. Make sure you sign in using the same provider you registered with.`
              : ``
          );
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 my-6"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <input
                  placeholder="Password"
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
        <Link href={"/auth/forgot-password"}>
          <p className="link text-sm text-right mt-2">Forgot password?</p>
        </Link>
        <div
          onClick={form.handleSubmit(onSubmit)}
          className="w-full btn btn-neutral"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? <LoadingDots color="#FFFFFF" /> : "Login"}
        </div>
      </form>
    </Form>
  );
}

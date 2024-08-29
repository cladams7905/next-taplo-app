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
import ResendEmailButton from "./ResendEmailButton";
import Link from "next/link";
import OAuthForm from "./OAuthForm";
import { createClient } from "@/supabase/client";
import { showToast, showToastError } from "@/components/shared/showToast";

const FormSchema = z
  .object({
    email: z.string().email(),
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

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const supabase = createClient();

  const signUp = async (data: { email: string; password: string }) => {
    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard/create-project`,
      },
    });
    return JSON.stringify(result);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { data, error } = JSON.parse(
        await signUp({
          email: formData.email,
          password: formData.password,
        })
      );
      if (error) {
        showToastError(error);
      } else {
        setIsRegisterSuccess(true);
        showToast(`Successfully registered! Please check ${formData.email} to confirm
                your registration.`);
      }
    });
  }

  if (isRegisterSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <p className="font-bold text-4xl mb-4">Almost done!</p>
        <p>Please check your inbox to confirm your email address.</p>
        <ResendEmailButton email={form.getValues().email} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg border border-gray-200 my-8 mb-16">
        <p className="font-logo text-center text-3xl mb-4">
          Get started for free!
        </p>
        <p className="">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="link link-primary link-hover">Login</span>
          </Link>
        </p>
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
                      className="input input-bordered flex items-center gap-2 w-full"
                      {...field}
                      type="email"
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
                  <FormLabel>Confirm Password</FormLabel>
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
              className="w-full btn btn-primary text-white"
              style={{ marginTop: "2.5rem" }}
            >
              {isPending ? <LoadingDots color="#FFFFFF" /> : "Sign up"}
            </div>
          </form>
        </Form>
        <OAuthForm />
        <p className="mt-6 text-sm">
          By continuing, you agree to our{" "}
          <Link href={"/legal/terms-of-service"} target="_blank">
            <span className="link">Terms of Service</span>
          </Link>{" "}
          and{" "}
          <Link href={"/legal/privacy-policy"} target="_blank">
            {" "}
            <span className="link">Privacy Policy</span>
          </Link>
          .
        </p>
      </div>
    );
  }
}

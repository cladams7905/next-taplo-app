"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingDots from "@/components/shared/LoadingDots";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { toast } from "@/components/shared/use-toast";
import { Button } from "@/components/shared/button";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "../actions";
import { useTransition } from "react";

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword(data);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-red-400">{"Error: " + error.message}</code>
            </pre>
          ),
        });
      } else {
        await signInWithEmailAndPassword(data).then(() => {
          toast({
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-green-400">
                  Successfully registered!
                  <div className="text-white">
                    Please check {data.email}
                    <br />
                    to confirm your registration.
                  </div>
                </code>
              </pre>
            ),
          });
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
          className="w-full btn btn-neutral"
          style={{ marginTop: "2.5rem" }}
        >
          {isPending ? <LoadingDots /> : "Sign up"}
        </div>
      </form>
    </Form>
  );
}

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
import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { CirclePlus } from "lucide-react";

const FormSchema = z.object({
  projectName: z.string().max(32, {
    message: "Project name cannot exceed 32 characters.",
  }),
});

export default function NewProjectForm() {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {});
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 my-6 font-sans"
          autoComplete="on"
        >
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <input
                    placeholder="My Awesome Project"
                    className="input input-bordered flex items-center gap-2 w-full"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            onClick={form.handleSubmit(onSubmit)}
            className="w-full btn btn-primary"
            style={{ marginTop: "2.5rem" }}
          >
            {isPending ? (
              <LoadingDots color="#FFFFFF" />
            ) : (
              <>
                <CirclePlus height={18} width={18} />
                Create Project
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

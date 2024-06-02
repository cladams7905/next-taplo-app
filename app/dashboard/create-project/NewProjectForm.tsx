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
import { CirclePlus } from "lucide-react";
import { createProject } from "../actions";
import { showToast, showToastError } from "@/components/shared/showToast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  projectName: z
    .string()
    .max(32, {
      message: "Project name cannot exceed 32 characters.",
    })
    .min(3, {
      message: "Project name must be at least 3 characters.",
    }),
});

export default function NewProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const newProject = {
        project_name: formData.projectName,
      };
      const { data, error } = JSON.parse(await createProject(newProject));
      if (error) {
        showToastError(error);
      } else {
        form.resetField("projectName");
        showToast(`Successfully created new project: ${formData.projectName}`);
        router.push(`/dashboard/project/${data.id}`);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 font-sans"
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

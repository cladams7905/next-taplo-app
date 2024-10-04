"use client";

import React, { useState, useTransition } from "react";
import { Tables } from "@/lib/supabase/types";
import { updateProject } from "@/lib/actions/projects";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shared/form";
import * as z from "zod";

export default function ProjectDetails({
  fetchedActiveProject,
}: {
  fetchedActiveProject: Tables<"Projects">;
}) {
  const [activeProject, setActiveProject] = useState(fetchedActiveProject);
  const [isPending, startTransition] = useTransition();

  const FormSchema = z.object({
    projectName: z
      .string()
      .max(32, {
        message: "Project name cannot exceed 32 characters.",
      })
      .min(3, {
        message: "Project name must be at least 3 characters.",
      }),
    projectUrl: z.string().url().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: activeProject.name,
      projectUrl: activeProject.public_url || "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      setActiveProject({
        ...activeProject,
        name: formData.projectName,
        public_url: formData.projectUrl || null,
      });
      const { error } = await updateProject(
        activeProject.id,
        {
          name: formData.projectName,
          public_url: formData.projectUrl,
        },
        true
      );
      if (error) {
        showToastError(error);
      } else {
        showToast(`Successfully saved project changes.`);
      }
    });
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg px-6 gap-4 py-4 text-sm">
      <div className="flex flex-col items-center justify-center w-full">
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
                      placeholder="My Project"
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
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <input
                      placeholder="https://www.my-project.com"
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
              className={`md:w-fit w-full btn btn-primary mt-2 text-base-100 ${
                form.getValues("projectName") === activeProject.name &&
                (form.getValues("projectUrl") || "") ===
                  (activeProject.public_url || "") &&
                "btn-disabled"
              }`}
            >
              {isPending ? <LoadingDots color="#FFFFFF" /> : "Save changes"}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

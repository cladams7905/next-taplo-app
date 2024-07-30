"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shared/form";
import * as z from "zod";
import LoadingDots from "@/components/shared/loadingdots";
import { Tables } from "@/supabase/types";
import { showToast, showToastError } from "@/components/shared/showToast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { updateExistingProject } from "@/lib/actions/projects";

export default function RenameProjectModal({
  renameModalRef,
  dropdownRef,
  project,
}: {
  renameModalRef: RefObject<HTMLDialogElement>;
  dropdownRef: RefObject<HTMLDivElement>;
  project: Tables<"Projects">;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const FormSchema = z
    .object({
      projectName: z
        .string()
        .max(32, {
          message: "Project name cannot exceed 32 characters.",
        })
        .min(3, {
          message: "Project name must be at least 3 characters.",
        }),
    })
    .refine((data) => data.projectName !== project.project_name, {
      message: "Project name must be different.",
      path: ["projectName"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { data, error } = await updateExistingProject(project.id, {
        project_name: formData.projectName,
      });
      if (error) {
        showToastError(error);
      } else {
        if (project.user_id) {
          renameModalRef.current?.close();
          showToast(
            `Successfully renamed project ${project.project_name} to ${formData.projectName}.`
          );
          router.refresh();
        }
      }
    });
  }

  return (
    <dialog className="modal" ref={renameModalRef}>
      <div className="modal-box dark:border dark:border-gray-600">
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
            onClick={() => {
              dropdownRef?.current?.classList.add("hidden");
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-semibold text-lg mb-4">Rename Project</h3>
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
                    <FormControl>
                      <input
                        placeholder="New Project Name"
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
                className="w-full btn btn-primary text-base-100"
                style={{ marginTop: "2.5rem" }}
              >
                {isPending ? (
                  <LoadingDots color="oklch(var(--bc))" />
                ) : (
                  <>
                    <Pencil height={18} width={18} />
                    Rename Project
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </dialog>
  );
}

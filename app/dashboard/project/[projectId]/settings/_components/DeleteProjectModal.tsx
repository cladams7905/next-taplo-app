"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/shared/form";
import * as z from "zod";
import LoadingDots from "@/app/_components/shared/loadingdots";
import { Trash2 } from "lucide-react";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { useRouter } from "next/navigation";
import { getRedirectPathname } from "@/app/(auth)/_actions";
import { deleteProject } from "@/lib/actions/projects";
import { Tables } from "@/supabase/types";

export default function DeleteProjectModal({
  activeProject,
}: {
  activeProject: Tables<"Projects">;
}) {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const FormSchema = z
    .object({
      projectName: z.string(),
    })
    .refine((data) => data.projectName === activeProject.name, {
      message: "Project name does not match.",
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
      const { data, error } = await deleteProject(activeProject.id);
      if (error) {
        showToastError(error);
      } else {
        router.push(await getRedirectPathname(activeProject.user_id));
        deleteModalRef.current?.close();
        showToast(`Successfully deleted project ${activeProject.name}.`);
      }
    });
  }

  return (
    <>
      <div
        className="btn btn-error md:w-fit w-full text-white inline-flex"
        onClick={() => deleteModalRef.current?.showModal()}
      >
        <Trash2 width={20} height={20} /> Delete Project
      </div>
      <dialog className="modal" ref={deleteModalRef}>
        <div className="modal-box text-base-content dark:border dark:border-gray-600">
          <form method="dialog" className="modal-backdrop">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content !outline-none"
              onClick={() => {
                deleteModalRef.current?.close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-lg">Delete Project</h3>
          <p className="py-4">
            If you are sure you want to delete project{" "}
            <span className="font-semibold">{`${activeProject.name}`}</span>,
            please enter the project name below. This action cannot be undone!
          </p>
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
                          placeholder={activeProject.name}
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
                  className="w-full btn btn-error text-base-100"
                  style={{ marginTop: "2.5rem" }}
                >
                  {isPending ? (
                    <LoadingDots color="#FFFFFF" />
                  ) : (
                    <>
                      <Trash2 height={18} width={18} />
                      Delete Project
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </dialog>
    </>
  );
}

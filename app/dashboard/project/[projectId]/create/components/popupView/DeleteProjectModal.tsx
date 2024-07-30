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
import { Trash } from "lucide-react";
import { Tables } from "@/supabase/types";
import { showToast, showToastError } from "@/components/shared/showToast";
import { useRouter } from "next/navigation";
import { getRedirectPathname } from "@/app/auth/actions";
import { deleteProject } from "@/lib/actions/projects";

export default function DeleteProjectModal({
  deleteModalRef,
  dropdownRef,
  project,
}: {
  deleteModalRef: RefObject<HTMLDialogElement>;
  dropdownRef: RefObject<HTMLUListElement>;
  project: Tables<"Projects">;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const FormSchema = z
    .object({
      projectName: z.string(),
    })
    .refine((data) => data.projectName === project.name, {
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
      const { data, error } = await deleteProject(project.id);
      if (error) {
        showToastError(error);
      } else {
        router.push(await getRedirectPathname(project.user_id));
        deleteModalRef.current?.close();
        showToast(`Successfully deleted project ${project.name}.`);
      }
    });
  }

  return (
    <dialog className="modal" ref={deleteModalRef}>
      <div className="modal-box text-base-content dark:border dark:border-gray-600">
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
        <h3 className="font-semibold text-lg">Delete Project</h3>
        <p className="py-4">
          If you are sure you want to delete project{" "}
          <span className="font-semibold">{`${project.name}`}</span>, please
          enter the project name below. This action cannot be undone!
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
                        placeholder={project.name}
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
                    <Trash height={18} width={18} />
                    Delete Project
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

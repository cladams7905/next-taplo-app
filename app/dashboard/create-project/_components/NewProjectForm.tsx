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
import { useTransition } from "react";
import { CirclePlus } from "lucide-react";
import { createProject } from "@/lib/actions/projects";
import { showToast, showToastError } from "@/components/shared/showToast";
import { useRouter } from "next/navigation";
import { TemplateTypes, ScreenAlignment } from "@/lib/enums";

const FormSchema = z.object({
  projectName: z.string().max(32, {
    message: "Project name cannot exceed 32 characters.",
  }),
});

export default function NewProjectForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { data, error } = await createProject({
        name: formData.projectName,
        screen_alignment: ScreenAlignment.BottomLeft,
        template: TemplateTypes.SmPopupNoImg,
        display_time: 4000,
      });
      if (error) {
        showToastError(error);
      } else {
        router.push(`/dashboard/project/${data.id}/create`);
        showToast(`Created new project: ${formData.projectName}`);
      }
    });
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
            className="w-full btn btn-primary text-white"
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LoadingDots from "@/app/_components/shared/loadingdots";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shared/form";
import { useTransition } from "react";
import { CirclePlus } from "lucide-react";
import { createProject } from "@/lib/actions/projects";
import { showToast, showToastError } from "@/app/_components/shared/showToast";
import { useRouter } from "next/navigation";
import { TemplateTypes, ScreenAlignment } from "@/lib/enums";
import { Tables } from "@/stripe/types";

const FormSchema = z.object({
  projectName: z
    .string()
    .max(32, {
      message: "Project name cannot exceed 32 characters.",
    })
    .min(3, { message: "Project name must be at least 3 characters." }),
  publicUrl: z.string().optional(),
});

export default function NewProjectForm({
  stripeUser,
  renewalDate,
  paymentPlan,
  numProjects,
}: {
  stripeUser: Tables<"users"> | null;
  renewalDate: string | null;
  paymentPlan: string | null | undefined;
  numProjects: number | null | undefined;
}) {
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
        public_url: formData.publicUrl,
        screen_alignment: ScreenAlignment.BottomLeft,
        template: TemplateTypes.SmPopupNoImg,
        display_time: 7000,
        bg_color: "#FFFFFF",
        text_color: "#172554",
        accent_color: "#7A81EB",
        border_color: "#D1D3D7",
      });
      if (error) {
        showToastError(error);
      } else {
        router.push(`/dashboard/project/${data.id}/create`);
        showToast(`Created new project: ${formData.projectName}`);
      }
    });
  }

  const shouldDisableCreateProject = () => {
    return (
      !renewalDate ||
      (paymentPlan?.includes("Starter") && numProjects && numProjects >= 1)
    );
  };

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
            name="publicUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project URL (optional)</FormLabel>
                <FormControl>
                  <input
                    placeholder="https://www.my-project.com"
                    className="input input-bordered flex items-center gap-2 w-full"
                    {...field}
                    type="url"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            onClick={form.handleSubmit(onSubmit)}
            className={`w-full btn btn-primary text-white ${
              shouldDisableCreateProject() && "btn-disabled"
            }`}
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

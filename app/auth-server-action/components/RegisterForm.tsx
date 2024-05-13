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
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from "../actions";
import { useTransition } from "react";

const FormSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6, {
			message: "Password is required.",
		}),
		confirm: z.string().min(6, {
			message: "Password is required.",
		}),
	})
	.refine((data) => data.confirm === data.password, {
		message: "Password did not match",
		path: ["confirm"],
	});

export default function RegisterForm({closeSignInModal} : {closeSignInModal: () => void}) {
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
			const {error} = JSON.parse(result);

			if (error?.message) {
				toast({
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-red-400">
								{'Error: ' + error.message}
							</code>
						</pre>
					),
				});
			} else {
				await signInWithEmailAndPassword(data).then(() => {
					closeSignInModal();
					toast({
						description: (
							<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
								<code className="text-green-400">
									Successfully registered!
									<div className="text-white">
										Please check {data.email}
										<br/>
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
				className="w-full space-y-6 my-6"
				autoComplete="on"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="example@gmail.com"
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
								<Input
									placeholder="password"
									{...field}
									type="password"
									onChange={field.onChange}
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
								<Input
									placeholder="Confirm Password"
									{...field}
									type="password"
									className="input input-bordered input-md flex items-center gap-2 w-full"
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full text-white bg-secondary border-secondary hover:bg-secondary-foreground hover:border-secondary-foreground" style={{ marginTop: '2.5rem' }}>
					{isPending ? (
						<LoadingDots color="#FFFFFF" />
					) : (
						'Register'
					)}
				</Button>
			</form>
		</Form>
	);
}

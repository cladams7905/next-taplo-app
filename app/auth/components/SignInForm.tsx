import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signInWithEmailAndPassword } from "../actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { toast } from "@/components/shared/use-toast";
import { Button } from "@/components/shared/button";
import { useTransition } from "react";
import LoadingDots from "@/components/shared/LoadingDots";

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

export default function SignInForm({closeSignInModal} : {closeSignInModal: () => void})  {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			const result = await signInWithEmailAndPassword(data);
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
				closeSignInModal();
			}
		})
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
				<Button type="submit" className="w-full text-white bg-secondary border-secondary hover:bg-secondary-foreground hover:border-secondary-foreground" style={{ marginTop: '2.5rem' }}>
					{isPending ? (
						<LoadingDots color="#FFFFFF" />
					) : (
						'Sign In'
					)}
				</Button>
			</form>
		</Form>
	);
}

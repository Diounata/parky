import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const signInAccountFormSchema = z.object({
  email: formSchema.email.max(254, "Name must be at most 254 characters"),
  password: formSchema.password,
});

export type SignInAccountFormInput = z.infer<typeof signInAccountFormSchema>;

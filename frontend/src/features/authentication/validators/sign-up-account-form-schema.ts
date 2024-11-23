import { formSchema } from "@/lib/zod/form-schemas";
import { formErrors } from "@/lib/zod/form-schemas/form-errors";
import z from "zod";

export const signUpAccountFormSchema = z
  .object({
    name: formSchema.string
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: formSchema.email,
    password: formSchema.password,
    repeatPassword: formSchema.password,
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: formErrors.password.doesNotMatch,
    path: ["repeatPassword"],
  });

export type SignUpAccountFormInput = z.infer<typeof signUpAccountFormSchema>;

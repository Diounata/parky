import { formSchema } from "@/lib/zod/form-schemas";
import z from "zod";

export const updateAccountFormSchema = z.object({
  name: formSchema.string
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: formSchema.email.max(254, "Name must be at most 254 characters"),
});

export type UpdateAccountFormInput = z.infer<typeof updateAccountFormSchema>;

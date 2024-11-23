import { z } from "zod";
import { formErrors } from "../form-errors";

export const email = z
  .string()
  .min(1, formErrors.required)
  .email(formErrors.email.invalid);

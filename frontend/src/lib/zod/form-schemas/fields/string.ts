import { z } from "zod";
import { formErrors } from "../form-errors";

export const string = z.string().min(1, formErrors.required).trim();

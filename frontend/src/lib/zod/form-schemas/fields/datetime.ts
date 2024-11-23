import { z } from "zod";

export const datetime = z.coerce.date();

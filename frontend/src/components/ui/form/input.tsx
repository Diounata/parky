import { InputField } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

import type { InputHTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  label: string;
  name: string;
  description?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function Input({ label, name, description, inputProps }: Props) {
  const form = useFormContext();
  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <InputField
              {...field}
              {...inputProps}
              className={`${inputProps?.className} ${error && "border border-red-500 dark:border-red-900"}`}
            />
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

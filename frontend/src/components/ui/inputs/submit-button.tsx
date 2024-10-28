import { Loader2 } from "lucide-react";
import { Button } from "../button";
import { useFormContext } from "react-hook-form";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  submittingMessage: string;
  className?: string;
}

export function SubmitButton({
  submittingMessage,
  children,
  className = "",
}: Props) {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Button disabled={isSubmitting} className={className}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {submittingMessage}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

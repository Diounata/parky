import { Loader2 } from "lucide-react";

export function LoadingForm() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-2">
      <Loader2 className="animate-spin" /> Loading form
    </div>
  );
}

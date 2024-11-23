import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadCNAvatar,
} from "@/components/ui/avatar";

interface Props {
  src: string;
  fallback: string;
  className?: string;
}

export function Avatar({ src, fallback, className = "" }: Props) {
  const fallbackChar = fallback[0].toUpperCase();

  return (
    <ShadCNAvatar className={`h-8 w-8 rounded-lg ${className}`}>
      <AvatarImage src={src} alt={fallback} />
      <AvatarFallback className="rounded-lg">{fallbackChar}</AvatarFallback>
    </ShadCNAvatar>
  );
}

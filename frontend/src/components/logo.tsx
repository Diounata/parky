"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 90, height = 25, className }: Props) {
  const { theme } = useTheme();

  return (
    <Image
      src={`/park.it-${theme}.svg`}
      alt="Park.it"
      width={width}
      height={height}
      className={className}
    />
  );
}

import { useTheme } from "next-themes";
import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  isShortVersion?: boolean;
}

export function Logo({
  width,
  height,
  className = "",
  isShortVersion = false,
}: Props) {
  const { theme } = useTheme();

  if (!width) width = isShortVersion ? 25 : 90;
  if (!height) height = 25;

  const src = isShortVersion
    ? `/park.it-short-${theme}.svg`
    : `/park.it-${theme}.svg`;

  return (
    <Image
      src={src}
      alt="Park.it"
      width={width}
      height={height}
      className={className}
    />
  );
}

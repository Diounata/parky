"use client";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { PropsWithChildren } from "react";

export default function AuthenticationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ToggleThemeButton className="absolute bottom-4 right-4" />
      {children}
    </>
  );
}

"use client";
import { ThemeProvider } from "@/contexts/theme-context";
import { configuration } from "@/lib/config/configuration";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "./ui/toaster";

export function AppWrapper({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={configuration.queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme={configuration.defaultTheme}
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

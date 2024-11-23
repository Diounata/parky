"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  className?: string;
}

export function ToggleThemeButton({ className }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme, setTheme],
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          <Button
            type="button"
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

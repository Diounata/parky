"use client";
import { logout } from "@/app/authentication/actions";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetAuthenticatedAccountQuery } from "@/features/accounts/hooks/react-query/queries/use-get-authenticated-account-query";
import { toast } from "@/hooks/use-toast";
import { configuration } from "@/lib/config/configuration";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: authenticatedAccount } = useGetAuthenticatedAccountQuery();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar src={""} fallback={authenticatedAccount?.name} />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {authenticatedAccount?.name}
                </span>

                <span className="truncate text-xs">
                  {authenticatedAccount?.email}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar src={""} fallback={authenticatedAccount?.name} />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {authenticatedAccount?.name}
                  </span>

                  <span className="truncate text-xs">
                    {authenticatedAccount?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href={configuration.paths.dashboard.account}>
                <DropdownMenuItem>
                  <User />
                  Account
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                logout();
                toast({
                  title: "Log out",
                  description: "You have successfully logged out",
                });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

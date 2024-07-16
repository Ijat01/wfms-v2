"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import {

  Home,
  Package2,
  ClipboardList,
  NotebookPen,
  CalendarDays,
  Banknote,
  LogOut,
  Theater,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { signOut } from "next-auth/react";

export function Navbar()  {
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (href: string) => {
    return pathname === href ? "bg-gray-200 text-gray-800" : "text-muted-foreground";
  };
  
  return (

      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            
          <Link
            href="/marketer/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/dashboard"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/dashboard")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/booking"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/booking")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <NotebookPen className="h-5 w-5" />
                <span className="sr-only">Booking</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Booking</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/event"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/event")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Theater className="h-5 w-5" />
                <span className="sr-only">Booking</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Booking</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/payment"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/payment")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <Banknote className="h-5 w-5" />
                <span className="sr-only">Payment</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Payment</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/task"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/task")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <ClipboardList className="h-5 w-5" />
                <span className="sr-only">Task</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Task</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/marketer/calendar"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive("/marketer/calendar")} transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <CalendarDays className="h-5 w-5" />
                <span className="sr-only">Calendar</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Calendar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href=""
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut onClick={() => signOut()} className=" h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
      </aside>


  )
}


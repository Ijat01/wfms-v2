import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { signOut } from 'next-auth/react'
import {
  Home,
  LineChart,
  CalendarDays,
  Package2,
  PanelLeft,
  Search,
  ClipboardList,
  Users2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getAuthSession } from "@/lib/auth"


export async function TopBar(){
  const session = await getAuthSession()
  return (
<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
         
<Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/admin/dashboard"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/task"
                  
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ClipboardList className="h-5 w-5" />
                  Task
                </Link>
                <Link
                  href="/admin/calendar"
                  
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CalendarDays className="h-5 w-5" />
                  Calendar
                </Link>
                <Link
                  href="/admin/staff"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Staff
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <div>
            {}
          </div>
            
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/profile.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
           
              <DropdownMenuItem className="flex space-x-2" >
                
                <Image
                  src="/profile.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full  "
                />
                <div>
                <div className="text-xs ">
                {session?.user.name}
                </div>
                <div className="text-xs ">
                {session?.user.role}
                </div>
                </div>
                </DropdownMenuItem>
                
                
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>Settings</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
          

</header>
  )
}

export default TopBar
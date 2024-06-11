import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

export function MyTaskCard(){
  return (
    <div>
        <Card
            className="md:max-h-[802px]" x-chunk="dashboard-05-chunk-4"
            >
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                    Your Task
                </CardTitle>
                <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </CardHeader>
            <div className="md:max-h-[664px] overflow-y-auto">
            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>

            <CardContent className=" overflow overflow-y-auto p-2 text-sm">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                    <CardDescription>Completed Task</CardDescription>
                    <CardTitle className="text-4xl">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        +25% from last week
                    </div>
                    </CardContent>
                    <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
            </CardContent>
            </div>           
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

export default MyTaskCard
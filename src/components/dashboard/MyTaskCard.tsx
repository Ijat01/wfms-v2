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
import { getMytask } from "@/lib/data"

export async function MyTaskCard(){

  const data = await getMytask()

   const getPriorityStatus = (duedate: Date | null ) => {
      const currentDate = new Date();
      if (!duedate) {
        return "Low";
      }
  
      const diffTime = duedate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 5) return "High";
      if (diffDays <= 10) return "Medium";
      return "Low";
    };
  
    const getStatusBadge = (priorityStatus: string) => {
      switch (priorityStatus) {
        case "High":
          return <Badge className="text-xs" variant="destructive">High</Badge>;
        case "Medium":
          return <Badge className="text-xs" variant="warning">Medium</Badge>;
        case "Low":
          return <Badge className="text-xs" variant="success">Low</Badge>;
        default:
          return null;
      }
    };

  return (
    <div>
        <Card className="md:max-h-[740px] " >
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                    Your Task
                </CardTitle>
                <CardDescription>List of your task</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                </div>
            </CardHeader>
        
          <div className="md:max-h-[630px] overflow-y-hidden hover:overflow-y-auto">
            <CardContent className="  p-2 text-sm">
              
          {data.map((taskassignment) =>(
            <Card key={taskassignment.task_id} className="mt-4">
                        <CardHeader className="bg-gray-200 flex pt-4 pb-4 pr-2 h-4 justify-center text-xs rounded-t-[11px]">
                          <div className="flex items-center">
                            <div className="grow">
                              {taskassignment.task_role}
                            </div>
                          </div>
                        </CardHeader>
  
                        <CardContent className="pb-1 pt-4 ">
                          <div className="flex pb-4">
                            <div className="my-auto  text-md font">
                              <div className="pb-2 flex">
                                <div>
                                {taskassignment.event_type}
                                </div>
                                <div className="font-bold pl-1">
                                {taskassignment.groom_name} & {taskassignment.bride_name}
                                </div>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Event Date:
                              </div>
                              <Badge variant="outline">{taskassignment.eventdate}</Badge>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Event Address:
                              </div>
                              <Badge variant="outline">{taskassignment.eventaddress}</Badge>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Due Date:
                              </div>
                              <Badge variant="outline">{taskassignment.duedate}</Badge>
                              </div>
                              <div className="flex items-center">
                              <div className="text-xs pr-2">
                                Priority Level:
                              </div>
                              {getStatusBadge(getPriorityStatus(taskassignment.duedatecompare))}
                              </div>
                              
                            </div>
                          </div>
                        </CardContent>
  
                        <CardFooter className="flex justify-end gap-2 pt-2 pb-2">
                          <Badge variant={taskassignment.task_status === 'Pending' ? 'destructive' : taskassignment.task_status === 'Complete' ? 'success' : 'default'} >{taskassignment.task_status}</Badge>
                        </CardFooter>
                      </Card>
                    ))}
                    
            </CardContent> 
            </div>
             
        </Card>
    </div>
  )
}

export default MyTaskCard
import * as React from "react"

import {
  File,
  ListFilter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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



import {Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const TableData = [
    {
      name: "728ed52f",
      status: "High",
      customer: "Alia & Zarif",
      date: "pending",
    },
    {
        name: "728ed52f",
        status: "High",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "Low",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "Low",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "High",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "Low",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status:"High",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "High",
        customer: "Alia & Zarif",
        date: "pending",
    },
    {
        name: "728ed52f",
        status: "Low",
        customer: "Alia & Zarif",
        date: "pending",
    },
    
  ]

export function DashboardTable(){
return(   <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card className = "" x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Task Weekly </CardTitle>
                    <CardDescription>
                      Task need to be completed this week
                    </CardDescription>
                  </CardHeader>
            <div className="md:max-h-[400px] overflow-y-auto">    
                  <CardContent>
            
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Staff name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Customer
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      
                      <TableBody >
                      {TableData.map( (td,index) => (

                        <TableRow key={index} >
                        <TableCell>
                              <div className="flex items-center gap-4">
                                <Avatar className="bg-green-200 h-9 w-9 sm:flex">
                                <AvatarImage className="bg-green-200" src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback className="bg-green-200" >OM</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {td.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    olivia.martin@email.com
                                </p>
                                </div>
                                </div>
                       </TableCell>
                       <TableCell>
                            <p>{td.customer}</p>
                            
                       </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                            {td.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-25
                          </TableCell>
                        </TableRow>
                      ))}
                    
                      </TableBody>
                    
                    </Table>
                    
                  </CardContent>
                </div>
                </Card>
              </TabsContent>
            </Tabs>

        )
}
"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
Eye
} from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddTask } from "../task/AddTask";
import { UpdateTask } from "../task/UpdateTask";
import { formatDate } from "@/lib/formateDate";
import { DeleteTaskDialog } from "../task/DeleteTask";

interface BookingListProps {
  staff: any[];
}

export function TaskListByStaff({  staff }: BookingListProps) {

    const getPriorityStatus = (duedatecompare: Date | null | undefined) => {
        const currentDate = new Date();
        if (!duedatecompare) {
          return "Low";
        }
    
        const diffTime = duedatecompare.getTime() - currentDate.getTime();
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

  const columns: ColumnDef<typeof staff[0]>[] = [
    {
      accessorKey: "count",
      header: ({ column }) => (
        <div className="">
          #
        </div>
      ),
      cell: ({ row }) => (
        <div className="">
          {row.index + 1}
        </div>
      ),
      size:10
    },
   
    {
      accessorKey: "event_id",
      header: ({ column }) => (
        <div className="text-center">
            ID
        </div>
      ),

    },
    {
      accessorKey: "task_role",
      header: ({ column }) => (
        <div className="text-center">
            ID
        </div>
      ),

    },
    {
        accessorKey: "event_type",
        header: ({ column }) => (
          <div className="text-center">
              ID
          </div>
        ),
  
      },
    {
        accessorKey: "customername",
        header: ({ column }) => (
          <div className="text-center">
              ID
          </div>
        ),
  
      },
    {
      accessorKey: "user_name",
      header: ({ column }) => (
        <div className="text-center pr-14">
            STAFF NAME
        </div>
      ),
      cell: ({ row }) => (
        <div className=" flex items-center font-medium pr-14" >
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <div className="pl-4 text-clip">{row.getValue("user_name")}</div>
                <div className="pl-4 text-xs text-gray-500">{row.original.task_role} </div>
            </div>
        </div>
      ),
      size:100
    },
    {
      accessorKey: "customernameshow",
      header: ({ column }) => (
        <div className="text-center pr-10" >
            EVENT NAME
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center pr-10" >
          <Badge variant="outline">
            {row.original.event_type} OF {row.getValue("customername")}
          </Badge>
        </div>
      ),
      size:10
    },
    {
      accessorKey: "duedate",
      header:({ column }) => (
        <div className=" text-center ">
            EVENT DUE
        </div>
      ),
      cell: ({ row }) =><div className=" text-center "> <Badge variant="outline">{row.getValue("duedate")}</Badge> </div>,
      size:10
    },
    {
      accessorKey: "task_status",
      header:({ column }) => (
        <div className=" text-center ">
            TASK STATUS
        </div>
      ),
      cell: ({ row }) => <div className=" text-center ">
        
      <Badge variant={row.original.task_status === 'Pending' ? 'destructive' : row.original.task_status === 'Complete' ? 'success' : 'default'}>{row.getValue("task_status")}</Badge>
      </div>,
      size:10
    },
    {
        accessorKey: "duedatecompare",
        header:({ column }) => (
          <div className=" text-center pr-16 ">
              PRIORITY
          </div>
        ),
        cell: ({ row }) => <div className="text-center pr-16 ">{getStatusBadge(getPriorityStatus(row.original.duedatecompare))}</div>,
        size:50
      },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterBy, setFilterBy] = React.useState('customername');

  const table = useReactTable({
    data: staff,
    columns,
    initialState: {
      pagination: {
        pageSize: 8, // Number of items per page
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility:{
        task_role: false,
        event_id: false,
        event_type: false,
        customername:false
      },
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="pb-2">
          <CardTitle>Task</CardTitle>
          <CardDescription>Manage staff task</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex items-center py-4">
            <div className="w-96 pr-5">
            <Input
              placeholder="Filter customers..."
              value={(table.getColumn(filterBy) ? table.getColumn(filterBy)?.getFilterValue() as string : '') ?? ""}
              onChange={(event) =>
                table.getColumn(filterBy) && table.getColumn(filterBy)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
              />
            </div>
            <div className="pr-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Filter by column <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={filterBy} onValueChange={setFilterBy}>
                    <DropdownMenuRadioItem value="user_name">Staff</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="customername">Customer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="event_type">Event Type</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="task_role">Role</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="duedate">Due Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="task_status">Task Status</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grow">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table.getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} style={{width: `${header.getSize()}px` }} >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                          <TableRow data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground grow">
            Showing <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong> pages
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddTask } from "../task/AddTask";
import { UpdateTask } from "../task/UpdateTask";
import { formatDate } from "@/lib/formateDate";
import { DeleteTaskDialog } from "../task/DeleteTask";

interface BookingListProps {
  task: any[];
  events: any[];
}

export function TaskListTable({  events, task }: BookingListProps) {

  // Define columns for the booking table
  const columns: ColumnDef<typeof events[0]>[] = [
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
      accessorKey: "bookingid",
      header: ({ column }) => (
        <div className="text-center">
            ID
        </div>
      ),

    },
    {
      accessorKey: "event_title",
      header: ({ column }) => (
        <div className=" " >
            Event Title
        </div>
      ),
      cell: ({ row }) => (
        <div className=" " >
          <Badge variant="outline">
            {row.getValue("event_title")}
          </Badge>
        </div>
      ),
      size:130
    },
    {
      accessorKey: "event_date",
      header:({ column }) => (
        <div className=" ">
            Event Date
        </div>
      ),
      cell: ({ row }) => <Badge variant="outline">{formatDate(row.getValue("event_date"))}</Badge>,
      size:10
    },
    {
      accessorKey: "event_time",
      header:({ column }) => (
        <div className=" ">
            Event Time
        </div>
      ),
      cell: ({ row }) => <Badge variant="outline">{row.getValue("event_time")}</Badge>,
      size:120
    },
    {
      accessorKey: "event_address",
      header:"Location",
      cell: ({ row }) => <div className="text-left"><Badge variant="outline">{row.getValue("event_address")}</Badge></div>,
      size:50
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({cell,row }) => (
        <div className="flex gap-4 justify-end mr-5">
          <AddTask event_id={row.original.event_id} event_date={formatDate(row.original.event_date)} bookingid={row.original.bookingid} />
        </div>
      ),
    },
    
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: events,
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
        event_id: false,
        bookingid: false
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
            <div className="grow">
              <Input
                placeholder="Filter customers..."
                value={(table.getColumn("customername")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("customername")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
            <div className="space-x-2">
              <DropdownMenu >
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
                    <Collapsible key={row.id} asChild>
                      <>
                        <CollapsibleTrigger asChild>
                          <TableRow data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        </CollapsibleTrigger>
                        <CollapsibleContent asChild>
                          <TableRow className="bg-gray-100">
                            <TableCell colSpan={8}>
                            <Table>
                                <TableHeader >
                                    <TableRow className="text-xs">
                                        <TableHead className="w-[500px]">Assigned Staff</TableHead>
                                        <TableHead className="w-[250px]">Task Role</TableHead>
                                        <TableHead>Task Status</TableHead>
                                        <TableHead>Task Due</TableHead>
                                        <TableHead className="w-32 ">
                                        <span className="sr-only">Actions</span>
                                        </TableHead>
                                        
                                    </TableRow>
                                </TableHeader> 
                              <TableBody>
                              {task.filter(t => t.event_id == row.original.event_id).map(tasks => (
                              <TableRow key={tasks.task_id}>
                                <TableCell className=" flex items-center font-medium">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="pl-4 text-clip">{tasks.user_name}</div>
                                    <div className="pl-4 text-xs text-gray-500"> {tasks.user_role} </div>
                                </div>
                                </TableCell>
                                <TableCell><Badge variant="outline">{tasks.task_role}</Badge></TableCell>
                                <TableCell><Badge variant={tasks.task_status === 'Pending' ? 'destructive' : tasks.task_status === 'Completed' ? 'success' : 'default'}>{tasks.task_status}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{tasks.task_due}</Badge></TableCell>
                                  <TableCell>
                                  <div className="flex gap-4 justify-end ">
                                    <UpdateTask task_id={tasks.task_id} event_id={row.original.event_id} task_role={tasks.task_role} user_id={tasks.user_id} bookingid={row.original.bookingid} />
                                    <DeleteTaskDialog task_id={tasks.task_id}/>
                                  </div>
                                  </TableCell>
                              </TableRow>
                              ))}
                              </TableBody>
                            </Table>
                            </TableCell>
                          </TableRow>
                        </CollapsibleContent>
                      </>
                    </Collapsible>
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
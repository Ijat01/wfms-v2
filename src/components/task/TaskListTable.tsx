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
      accessorKey: "event_type",
      header: ({ column }) => (
        <div className="text-center pr-10">
            EVENT TYPE
        </div>
      ),
      cell: ({ row }) => (
        <div className=" text-center pr-10" >
          <Badge variant={row.original.event_type === 'Sanding' ? 'sanding' : row.original.event_type === 'Nikah' ? 'nikah' : 'outline'}>
            {row.getValue("event_type")}
          </Badge>
        </div>
      ),
      size:100
    },
    {
      accessorKey: "customername",
      header: ({ column }) => (
        <div className="text-center pr-10" >
            CUSTOMER NAME
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center pr-10" >
          <Badge variant="outline">
            {row.getValue("customername")}
          </Badge>
        </div>
      ),
      size:10
    },
    {
      accessorKey: "event_date",
      header:({ column }) => (
        <div className=" text-center ">
            EVENT DATE
        </div>
      ),
      cell: ({ row }) =><div className=" text-center "> <Badge variant="outline">{row.getValue("event_date")}</Badge> </div>,
      size:10
    },
    {
      accessorKey: "event_time",
      header:({ column }) => (
        <div className=" text-center ">
            EVENT TIME
        </div>
      ),
      cell: ({ row }) => <div className=" text-center ">
        
      <Badge variant="outline">{row.getValue("event_time")}</Badge>
      </div>,
      size:10
    },
    {
      accessorKey: "event_address",
      header:({ column }) => (
        <div className=" text-center pr-16 ">
            LOCATION
        </div>
      ),
      cell: ({ row }) => <div className="text-center pr-16 "><Badge variant="outline">{row.getValue("event_address")}</Badge></div>,
      size:50
    },
    {
      accessorKey: "event_status",
      header:"STATUS",
      cell: ({ row }) => <div className="text-left"><Badge variant={row.original.event_status === 'No Task Assigned' ? 'destructive' : row.original.event_status === 'Completed' ? 'success' : 'default'}>{row.getValue("event_status")}</Badge></div>,
      size:50
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({cell,row }) => (
        <div className="flex gap-4 justify-end mr-5">
          <AddTask event_id={row.original.event_id} event_date={row.original.event_date} bookingid={row.original.bookingid} />
        </div>
      ),
    },
    
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterBy, setFilterBy] = React.useState('customername');

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
        bookingid: false,
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
                    <DropdownMenuRadioItem value="event_type">Event Type</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bookingid">Booking ID</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="event_title">Customer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="event_date">Event Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="event_status">Status</DropdownMenuRadioItem>
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
                                        <TableHead className="w-[250px]">Task Status</TableHead>
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
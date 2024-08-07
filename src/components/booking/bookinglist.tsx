"use client";

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Eye } from "lucide-react";
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
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AddBookingDialog } from "./AddBooking";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { DeleteBookingDialog } from "./DeleteBooking";
import { UpdateBookingDialog } from "./UpdateBooking";
import { formatDate } from "@/lib/formateDate";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface BookingListProps {
  bookings: any[];
  events: any[];
}

export function BookingList({ bookings, events }: BookingListProps) {
  // Define columns for the booking table
  const columns: ColumnDef<typeof bookings[0]>[] = [
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
      size:20
    },
    {
      accessorKey: "booking_id",
      header: ({ column }) =>(<div className="text-center"> BOOKING ID</div>), 
      cell: ({ row }) => <div className="text-center"> <Badge variant="outline">{row.getValue("booking_id")}</Badge> </div>,
      size: 10,
    },
    {
      accessorKey: "customername",
      header: ({ column }) => (
        <div className="text-center pl-8 pr-14">
            CUSTOMER NAME
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center pl-8 pr-14">
          <Badge variant="outline">{row.getValue("customername")}</Badge>
        </div>
      ),
      size: 150
    },
    {
      accessorKey: "contact",
      header: ({ column }) => (
        <div className="text-center ">
            CONTACT
        </div>
      ),
      cell: ({ row }) =>
        <div className="text-center">
           <Badge variant="outline">{row.getValue("contact")}</Badge>
        </div>,
      size:10,
    },
    {
      accessorKey: "bookingdate",
      header: ({ column }) => (
        <div className="text-center pr-10 ">
            BOOKING DATE
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center pr-10">
          <Badge variant="outline">{row.getValue("bookingdate")}</Badge>
        </div>
      ),
      size:10,
    },
  
    {
      accessorKey: "packagename",
      header: ({ column }) => (
        <div className="text-center ">
            PACKAGE
        </div>
      ),
      cell: ({ row }) => (
        <div className=" text-center  ">
          <Badge variant="outline">{row.getValue("packagename")}</Badge>
        </div>
      ),
      size:10,
    },
    {
      accessorKey: "handleby",
      header: ({ column }) => (
        <div className="text-center pl-14">
            HANDLE BY
        </div>
      ),
      cell: ({ row }) => 
        <div className="text-center pl-14"> <Badge variant="outline">{row.getValue("handleby")}</Badge> </div>,
      size:10,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-4 justify-end mr-5">
          <Button className="bg-blue-500"><Link href={{
            pathname: "/admin/taskdetail",
            query:{
              bookingid: row.original.booking_id,
            }
          }}><Eye></Eye></Link>
          </Button>
          <UpdateBookingDialog booking={row.original} />
          <DeleteBookingDialog booking={row.original} />
        </div>
      ),
    },
  ];

  function readdate(date: string): string | undefined {
  const parts = date.split('/');
  if (parts.length >= 2) {
    return parts[1]; // Return the middle part (index 1) after splitting by '/'
  } else {
    return undefined; // Handle cases where the date format might be incorrect
  }
}

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterBy, setFilterBy] = React.useState('customername');

  const table = useReactTable({
    data: bookings,
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
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="pb-2">
          <CardTitle>Booking</CardTitle>
          <CardDescription>Manage all customer booking</CardDescription>
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
                    <DropdownMenuRadioItem value="handleby">Handle By</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="packagename">Package</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bookingdate">Booking Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="customername">Customer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="booking_id">ID</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="contact">contact</DropdownMenuRadioItem>
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
            <div className="space-x-2">
              <AddBookingDialog />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} style={{width: `${header.getSize()}px` }}>
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
                              <TableHeader className="text-xs">
                                <TableHead className="w-32">Event Type</TableHead>
                                <TableHead className="w-32 ">Event Date</TableHead>
                                <TableHead className="w-32 ">Event Time</TableHead>
                                <TableHead className="w-32 ">Event Address</TableHead>
                                <TableHead className="w-32 "> Status</TableHead>
                              </TableHeader>
                              <TableBody>
                              {events.filter(t => t.bookingid == row.original.booking_id).map(events => (
                              <TableRow key={events.event_id}>
                                <TableCell><Badge variant={events.event_type === 'Sanding' ? 'sanding' : events.event_type === 'Nikah' ? 'nikah' : 'outline'}>{events.event_type}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{formatDate(events.event_date)}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{events.eventtime}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{events.event_address}</Badge></TableCell>
                                <TableCell><Badge variant={events.event_status === 'No Task Assigned' ? 'destructive' : events.event_status === 'Completed' ? 'success' : 'default'}>{events.event_status}</Badge></TableCell>
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

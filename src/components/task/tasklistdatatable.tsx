"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookingList } from "@/lib/data";
import { DeleteBookingDialog } from "../Marketer/booking/DeleteBooking";
import { UpdateBookingDialog } from "../Marketer/booking/UpdateBooking";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Booking } from "@/types/types";
import { AddBookingDialog } from "../Marketer/booking/AddBooking";

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings }: BookingListProps) {

  // Define columns for the booking table
  const columns: ColumnDef<typeof bookings[0]>[] = [
    {
      accessorKey: "booking_id",
      header: "ID",
    },
    {
      accessorKey: "customername",
      header: ({ column }) => { return (
        <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
      },
      cell: ({ row }) => (
      <div className="text-center">
        <Badge variant="outline">
          {row.getValue("customername")}
        </Badge>
      </div>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("contact")}</Badge>,
    },
    {
      accessorKey: "eventaddress",
      header: "Location",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("eventaddress")}</Badge>,
    },
    {
      accessorKey: "eventdate",
      header: "Event Date",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("eventdate")}</Badge>,
    },
    {
      accessorKey: "packagename",
      header:"Package",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("packagename")}</Badge>,
    },
    {
      accessorKey: "bookingdate",
      header: "Booking Date",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("bookingdate")}</Badge>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-4 justify-end mr-5">
          <UpdateBookingDialog booking={row.original} />
          <DeleteBookingDialog booking={row.original} />
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
          <CardTitle>Task</CardTitle>
          <CardDescription>Manage your task</CardDescription>
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
            <AddBookingDialog/>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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




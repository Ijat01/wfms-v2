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
import Link from "next/link";
import { AddPackage } from "./AddPackageForm";
import { formatDate } from "@/lib/formateDate";


interface PackageListProps {
  packagelist: any[];
}

export function PackageTable({ packagelist }: PackageListProps) {
  

  // Define columns for the booking table
  const columns: ColumnDef<typeof packagelist [0]>[] = [
    {
      accessorKey: "count",
      header: ({ column }) => (
        <div className="pr-5">
          #
        </div>
      ),
      cell: ({ row }) => (
        <div className="pr-5">
          {row.index + 1}
        </div>
      ),
    },
    {
      accessorKey: "package_id",
        header: ({ column }) =>(<div className=""> PACKAGE ID</div>), 
        cell: ({ row }) => <div className=""> <Badge variant="outline">{row.getValue("package_id")}</Badge> </div>,
    },
    {
      accessorKey: "package_type",
        header: ({ column }) =>(<div className=""> PACKAGE TYPE</div>), 
        cell: ({ row }) => <div className=""> <Badge variant="outline">{row.getValue("package_type")}</Badge> </div>,

    },
    {
      accessorKey: "package_name",
      header: ({ column }) => (
        <div className="">
            PACKAGE NAME
        </div>
      ),
      cell: ({ row }) => (
        <div className="">
          <Badge variant="outline">
            {row.getValue("package_name")}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-4 justify-end mr-5">
          <Button>Add Package Item</Button>
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
    data: packagelist,
    columns,
    initialState: {
      pagination: {
        pageSize: 10, // Number of items per page
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
          <CardTitle>Events</CardTitle>
          <CardDescription>Manage customer events</CardDescription>
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
                    <DropdownMenuRadioItem value="booking_id">Booking ID</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="customername">Customer</DropdownMenuRadioItem>
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
            <AddPackage/>
            </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} >
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
                              
                              <TableRow >
                                <TableCell><Badge variant="outline"></Badge></TableCell>
                                <TableCell><Badge variant="outline"></Badge></TableCell>
                                <TableCell><Badge variant="outline"></Badge></TableCell>
                                <TableCell><Badge variant="outline"></Badge></TableCell>
                                <TableCell><Badge></Badge></TableCell>
                              
                              </TableRow>
                          
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
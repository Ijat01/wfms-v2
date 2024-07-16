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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import Link from "next/link";
import { AddPaymentDetails } from "@/components/Payment/AddPaymentDetails";
import { UpdatePaymentDialog } from "@/components/Payment/UpdatePaymentDetails";
import { DeletePaymentDetailsDialog } from "@/components/Payment/DeletePaymentDetails";

interface BookingListProps {
  payments: any[];
  paymentdetails: any[];
}

export function PaymentList({ payments, paymentdetails }: BookingListProps) {

  // Define columns for the booking table
  const columns: ColumnDef<typeof payments[0]>[] = [
    {
      accessorKey: "paymentid",
      header: ({ column }) =>(<div className=""> ID </div>),
      cell: ({ row }) => <div className="">{row.getValue("paymentid")}</div>,
    },
    {
        accessorKey: "bookingid",
        header: ({ column }) =>(<div className="w-2"> BID </div>), 
        cell: ({ row }) => <Badge variant="outline">{row.getValue("bookingid")}</Badge>,
      },
    {
      accessorKey: "customername",
      header: ({ column }) => (
        <div className=" text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
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
      accessorKey: "paymenttotal",
      header:"Total",
      cell: ({ row }) => <div className="font-bold"> RM {row.getValue("paymenttotal")}</div>,
    },
    {
        accessorKey: "paymentbalance",
        header:"Balance",
        cell: ({ row }) =><div className="font-bold"> RM {row.getValue("paymentbalance")}</div>,
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
          <AddPaymentDetails paymentid={row.original.paymentid} paymentbalance={row.original.paymentbalance}/>
          <UpdatePaymentDialog payment_balance={row.original.paymentbalance} payment_id={row.original.paymentid} payment_total={row.original.paymenttotal}/>
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: payments,
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
          <CardTitle>Payment </CardTitle>
          <CardDescription>Manage all customer payment</CardDescription>
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
                                <TableHead className="w-32">Payment</TableHead>
                                <TableHead className="w-32 ">Payment Method </TableHead>
                                <TableHead className="w-32 ">Amount</TableHead>
                                <TableHead className="w-32 "> Status</TableHead>
                                <TableHead className="w-32 "> <span className="sr-only">Actions</span> </TableHead>
                              </TableHeader>
                              <TableBody>
                              {paymentdetails.filter(t => t.payment_id == row.original.paymentid).map(pd => (
                              <TableRow key={pd .paymentdetails_id}>
                                <TableCell><Badge variant="outline">{pd .paymentdetails_desc}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{pd .paymentdetails_type}</Badge></TableCell>
                                <TableCell><div className="font-bold">RM {pd.paymentdetails_amount}</div></TableCell>
                                <TableCell><Badge variant={pd .paymentdetails_status === 'Pending' ? 'destructive' : pd .paymentdetails_status === 'Complete' ? 'success' : 'default'}>{pd .paymentdetails_status}</Badge></TableCell>
                                <TableCell>
                                <div className="flex gap-4 justify-end mr-5">
                                  <DeletePaymentDetailsDialog paymentdetails_id={pd.paymentdetails_id}/>
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
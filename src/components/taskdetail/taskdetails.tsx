import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Task {
  data: any[];
  task: any[];
  bookingid: string;
}

export function TaskCard({ data, task, bookingid }: Task) {
  return (
    <>
      <Card>
        <CardHeader className="pb-10">
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>
            This shows the customer booking details and list of events
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Card>
            <CardHeader className="pb-5">
              <CardTitle>Customer Details</CardTitle>
              <CardDescription>Customer booking details</CardDescription>
            </CardHeader>
            <CardContent>
              {data.map((booking) => (
                <div key={booking.bookingid} className="grid gap-4">
                  <div className="flex">
                    <div className="text-sm w-36">Booking ID :</div>
                    <Badge variant="outline">{booking.bookingid}</Badge>
                  </div>
                  <div className="flex">
                    <div className="text-sm w-36">Customer Name :</div>
                    <Badge variant="outline">{booking.customername}</Badge>
                  </div>
                  <div className="flex">
                    <div className="text-sm w-36">Contact No:</div>
                    <Badge variant="outline">{booking.contactno}</Badge>
                  </div>
                  <div className="flex">
                    <div className="text-sm w-36">Package:</div>
                    <Badge variant="outline">{booking.packagename}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-5">
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>List of payments for this booking</CardDescription>
            </CardHeader>
            <CardContent>
              {data.map((booking) =>
                booking.payments.map((payment: any) => (
                  <div key={payment.paymentid} className="pb-4">
                    <div className="flex pb-4">
                      <div className="font-bold pr-5">Total :</div>
                      <div className="font-bold pr-5 grow">RM {payment.paymenttotal}</div>
                      <div className="font-bold pr-5">Balance :</div>
                      <div className="font-bold pr-5">RM {payment.paymentbalance}</div>
                    </div>
                    <Table>
                      <TableHeader className="text-xs">
                        <TableRow>
                          <TableHead className="w-32">Payment</TableHead>
                          <TableHead className="w-32">Payment Method</TableHead>
                          <TableHead className="w-32">Amount</TableHead>
                          <TableHead className="w-32">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payment.paymentdetails.map((paymentdetail: any) => (
                          <TableRow key={paymentdetail.detailid}>
                            <TableCell>
                              <Badge variant="outline">{paymentdetail.detaildesc}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{paymentdetail.detailtype}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="font-bold">RM {paymentdetail.detailamount}</div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  paymentdetail.detailstatus === "Pending"
                                    ? "destructive"
                                    : paymentdetail.detailstatus === "Complete"
                                    ? "success"
                                    : "default"
                                }
                              >
                                {paymentdetail.detailstatus}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-5">
              <CardTitle>Event List</CardTitle>
              <CardDescription>List of events for this booking</CardDescription>
            </CardHeader>
            <CardContent>
              {task.map((task) => (
                <Accordion key={task.eventid} type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="text-start flex">
                        <div className="w-40">{task.eventtype}</div>
                        <div className="w-40">
                          <Badge variant="outline">{task.eventdate}</Badge>
                        </div>
                        <div className="w-10">
                          <Badge>{task.eventstatus}</Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-end">
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="text-xs">
                            <TableHead className="w-[350px]">Assigned Staff</TableHead>
                            <TableHead className="w-[250px]">Task Role</TableHead>
                            <TableHead>Task Status</TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {task.assignments.map((assignment: any) => (
                            <TableRow key={assignment.taskid}>
                              <TableCell className="flex items-center font-medium">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="pl-4 text-clip">{assignment.username}</div>
                                  <div className="pl-4 text-xs text-gray-500">{assignment.userrole}</div>
                                </div>
                              </TableCell>
                              <TableCell>{assignment.task_role}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    assignment.task_status === "In Progress"
                                      ? "default"
                                      : assignment.task_status === "Complete"
                                      ? "success"
                                      : "destructive"
                                  }
                                >
                                  {assignment.task_status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}

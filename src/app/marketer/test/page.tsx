
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { CaretSortIcon } from "@radix-ui/react-icons"

import { any } from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Page = async () => {


  return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
            <Card>
                <CardHeader className="pb-10">
                <CardTitle>Payment</CardTitle>
                <CardDescription>
                    This show the customer payment details and list of payment
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Card>
                        <CardHeader className="pb-5">
                        <CardTitle>Customer Details</CardTitle>
                        <CardDescription>
                            Customer booking details
                        </CardDescription>
                        </CardHeader>

                        <CardContent >
                    
                       <div className="grid gap-4">
                        <div className="flex">
                            <div className="text-sm w-36">
                                Booking ID : 
                            </div>
                            <Badge variant="outline">1</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Customer Name : 
                            </div>
                            <Badge variant="outline">AMIN & NANA</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Contact No: 
                            </div>
                            <Badge variant="outline">0123456789</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Package: 
                            </div>
                            <Badge variant="outline">Nikah + Sanding Photo</Badge>
                        </div>
                        </div>

                        </CardContent>
                        
                    </Card>
                    <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>
                            Payment Details for this booking
                        </CardDescription>
                        </CardHeader>
                        <CardContent>

                        <div className="flex pb-2 items-center">
                        <div className="text-xs">Total Amount:</div>
                        <div className="pl-2 text-xs font-bold">RM 5000</div>
                        <div className="pl-10 text-xs">Remaining Amount:</div>
                        <div className="pl-2 text-xs font-bold grow">RM 3500</div>
                        <Button className="size-md"> Add Payment Details</Button>
                        </div>
                        <Table>
                                <TableHeader >
                                    <TableRow className="text-xs">

                                        <TableHead >Payment</TableHead>
                                        <TableHead >Payment Method</TableHead>
                                        <TableHead >Amount</TableHead>
                                        <TableHead>Task Status</TableHead>
                                        <TableHead>
                                        <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader> 
                            
                                <TableBody>
                                    <TableRow >
                                        <TableCell>
                                            <Badge variant="outline">Deposit</Badge>
                                        </TableCell>
                                        
                                        <TableCell className=" flex items-center font-medium">
                                            <Badge variant="outline">Cash</Badge>
                                        </TableCell>  
                                        <TableCell>
                                            <div className="font-bold"> RM 500</div>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Badge variant="success" >Complete</Badge>
                                        </TableCell>
                                        <TableCell>
                                        <div className="flex gap-4 justify-end ">
                                        <Button className="bg-blue-500">Edit</Button>
                                        <Button className="bg-red-500">Delete</Button>
                                        </div>
                                        </TableCell>  
                                    </TableRow>
                                    <TableRow >
                                        <TableCell>
                                            <Badge variant="outline">Second Payment</Badge>
                                        </TableCell>
                                        
                                        <TableCell className=" flex items-center font-medium">
                                            <Badge variant="outline">Online Transfer</Badge>
                                        </TableCell>  
                                        <TableCell>
                                            <div className="font-bold"> RM 1000</div>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Badge variant="success" >Complete</Badge>
                                        </TableCell> 
                                        <TableCell>
                                        <div className="flex gap-4 justify-end ">
                                        <Button className="bg-blue-500">Edit</Button>
                                        <Button className="bg-red-500">Delete</Button>
                                        </div>
                                        </TableCell> 
                                    </TableRow>
                                    <TableRow >
                                        <TableCell>
                                            <Badge variant="outline">Third Payment</Badge>
                                        </TableCell>
                                        
                                        <TableCell className=" flex items-center font-medium">
                                            <Badge variant="outline">Online Transfer</Badge>
                                        </TableCell>  
                                        <TableCell>
                                            <div className="font-bold"> RM 0</div>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Badge variant="destructive" >Pending</Badge>
                                        </TableCell>
                                        <TableCell>
                                        <div className="flex gap-4 justify-end ">
                                        <Button className="bg-blue-500">Edit</Button>
                                        <Button className="bg-red-500">Delete</Button>
                                        </div>
                                        </TableCell>  
                                    </TableRow>
                                 </TableBody>
                            </Table>
                    
                    

                        
                        
                        </CardContent>
                    </Card>
                </CardContent>

                
            </Card>     
        </main>  
  )
}

export default Page;


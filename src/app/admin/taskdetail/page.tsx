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
import { getEventDetailsBooking, getEventDetailsTask, getEventDetailsTaskAssignment } from "@/lib/data";
import { any } from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = async ({searchParams}: { searchParams:{ bookingid:string; }} ) => {

    const data = await getEventDetailsBooking( searchParams.bookingid )
    const task = await getEventDetailsTask(searchParams.bookingid)

    const taskid = task.map((task)=>(task.taskid))

    console.log(searchParams.bookingid)

  return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
            <Card>
                <CardHeader className="pb-10">
                <CardTitle>Task Details</CardTitle>
                
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Card>
                        <CardHeader className="pb-5">
                        <CardTitle>Event Details</CardTitle>
                        <CardDescription>
                            Customer Event Details
                        </CardDescription>
                        </CardHeader>

                        <CardContent >
                    
                    {data.map((booking) => (
                       
                       <div key= {booking.bookingid} className="grid gap-4">
                        <div className="flex">
                            <div className="text-sm w-36">
                                Booking ID : 
                            </div>
                            <Badge variant="outline">{booking.bookingid}</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Customer Name : 
                            </div>
                            <Badge variant="outline">{booking.customername}</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Event Date: 
                            </div>
                            <Badge variant="outline">{booking.event_date}</Badge>
                        </div>
                        <div className="flex">
                            <div className="text-sm w-36">
                                Event Location: 
                            </div>
                            <Badge variant="outline">{booking.event_address}</Badge>
                        </div>
                        </div>
                    ))}
                        
                        </CardContent>
                        
                    </Card>
                    <Card>
                    <CardHeader className="pb-5">
                        <CardTitle>Task List</CardTitle>
                        <CardDescription>
                            Task for this event
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                    {task.map((task) => (

                        
                        <Accordion key={task.taskid} type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>

                            <div className="text-start flex">
                                <div className="w-40">
                                {task.tasktype}
                                </div>
                              <Badge>{task.taskstatus}</Badge>  
                             
                            </div> 

                               
                           
                             
                            </AccordionTrigger>
                            <AccordionContent>
                            <Table>
                                <TableHeader >
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
                                
                            {task.assignments.map((assignment) => (

                                <TableRow key={assignment.taskassignmentid}>

                                    <TableCell className=" flex items-center font-medium">
                          
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="pl-4 text-clip">{assignment.username}</div>
                                        <div className="pl-4 text-xs text-gray-500"> {assignment.userrole} </div>
                                    </div>
                                    </TableCell>  
                                    <TableCell>
                                    {assignment.taskassignment_role}
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Badge variant={assignment.taskassignment_status === 'In Progress' ? 'default' : assignment.taskassignment_status === 'Complete' ? 'success' : 'destructive'}>{assignment.taskassignment_status}</Badge>
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
        </main>  
  )
}

export default Page;


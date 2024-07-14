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
import { AddTask } from "@/components/forms/Task/AddTask";
import { TaskCard } from "@/components/taskdetail/taskdetails";

const Page = async ({searchParams}: { searchParams:{ bookingid:string; }} ) => {

    const data = await getEventDetailsBooking( searchParams.bookingid )
    const task = await getEventDetailsTask(searchParams.bookingid)

    const taskid = task.map((task)=>(task.eventid))

    console.log(searchParams.bookingid)

  return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
           <TaskCard data={data} task={task} bookingid={searchParams.bookingid}/>
        </main>  
  )
}

export default Page;


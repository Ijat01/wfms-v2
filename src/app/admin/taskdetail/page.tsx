
import React from 'react'
import { getEventDetailsBooking, getEventDetailsTask } from "@/lib/data";
import { TaskCard } from "@/components/taskdetail/taskdetails";

const Page = async ({searchParams}: { searchParams:{ bookingid:string; }} ) => {

    const data = await getEventDetailsBooking( searchParams.bookingid )
    const task = await getEventDetailsTask(searchParams.bookingid)


    console.log(searchParams.bookingid)

  return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
           <TaskCard data={data} task={task} bookingid={searchParams.bookingid}/>
        </main>  
  )
}

export default Page;


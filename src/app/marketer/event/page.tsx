import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getMytask, getBookingList, getBookingTaskDataAll } from '@/lib/data'

import Loading from './loading'
import { EventTable } from '@/components/Event/EventTable'



const page = async () => {

  const data = await getMytask();
  const task = await getBookingTaskDataAll();
  const booking = await getBookingList();

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            
            </div>

            <TabsContent value="all">
            <Suspense fallback={<Loading/>}>
              <EventTable bookings={booking} events={task}/>
            </Suspense>
            </TabsContent>

          </Tabs>
    </main>
  )
}

export default page;
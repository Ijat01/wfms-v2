
import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BookingList } from '@/components/booking/bookinglistmarketer'
import Loading from './loading'
import { getBookingList, getBookingTaskDataAll } from '@/lib/data'





const page = async () => {

  const booking = await getBookingList()
  const events = await getBookingTaskDataAll();
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
            <BookingList bookings={booking} events={events} />
            </Suspense >
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;
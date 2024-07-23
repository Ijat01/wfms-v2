import React from 'react'
import MyCalendar from '@/components/calendar/momentuser'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getEventScheduleUser } from '@/lib/data'

const Page = async () => {
  const events = await getEventScheduleUser(); // Ensure this returns an array

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
      <Tabs defaultValue="Calendar">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="Calendar">All</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="Calendar">
          <MyCalendar events ={events} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default Page

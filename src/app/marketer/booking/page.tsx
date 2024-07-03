
import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  ListFilter,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookingList } from '@/components/Marketer/booking/bookinglist'
import Loading from './loading'
import { AddBookingDialog } from '@/components/Marketer/booking/AddBooking'
import { getBookingList } from '@/lib/data'





const page = async () => {

  const booking = await getBookingList()
  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
          <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Staff</TabsTrigger>
                <TabsTrigger value="draft">Marketer</TabsTrigger>
                 
              </TabsList>

            </div>
            <TabsContent value="all">
            <Suspense fallback={<Loading/>}>
            <BookingList bookings = {booking} />
            </Suspense >
            </TabsContent>
            <TabsContent value="pending">
            </TabsContent>
            <TabsContent value="staff">
            </TabsContent>
            <TabsContent value="mytask">
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;
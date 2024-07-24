import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  File,
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
import {CurrentStaffTable} from '@/components/staff/CurrentStaffTable'
import { AddStaffDialog } from '@/components/staff/AddStaffDialog'
import Loading from './loading'



const page = () => {
  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                 
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                
                <AddStaffDialog/>
                
              </div>
            </div>
            <TabsContent value="all">

            <Suspense fallback={<Loading/>}>
              <CurrentStaffTable/>
            </Suspense>

            </TabsContent>
            
          </Tabs>
    </main>
  )
}

export default page;
import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Board from '@/components/mytask/Board'
import { getMytask } from '@/lib/data'
import { BookingList } from '@/components/task/TaskListTable'
import Loading from './loading'



const page = async () => {

  const data = await getMytask();

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="mytask">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="mytask">My Task</TabsTrigger>
              </TabsList>
            
            </div>

            <TabsContent value="mytask">
            <Suspense fallback={<Loading/>}>
            <Board board={data} />
            </Suspense>
            </TabsContent>

          </Tabs>
    </main>
  )
}

export default page;
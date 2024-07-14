import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getEventList, getTaskList } from '@/lib/data'
import Loading from './loading'
import { TaskListTable } from '@/components/task/TaskListTable'


const page = async () => {

  const task = await getTaskList();
  const events = await getEventList();

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
            <TaskListTable events={events}  task={task}/>
            </Suspense >
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;
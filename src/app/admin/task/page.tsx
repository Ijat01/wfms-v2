import React, { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getEventList, getTaskList,getMyTaskKanban, getAllTaskAssignment } from '@/lib/data'
import Loading from './loading'
import Board from '@/components/mytask/Board'
import { TaskListTable } from '@/components/task/TaskListTable'
import { TaskListByStaff } from '@/components/task/TaskListTableByStaff'

const page = async () => {

  const task = await getTaskList();
  const events = await getEventList();
  const data = await getMyTaskKanban();
  const staff = await getAllTaskAssignment()

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
          <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Event Task</TabsTrigger>
                <TabsTrigger value="stafftask">Staff Task</TabsTrigger>
                <TabsTrigger value="mytask">My Task</TabsTrigger>
                
              </TabsList>

            </div>
            <TabsContent value="all">
            <Suspense fallback={<Loading/>}>
            <TaskListTable events={events}  task={task}/>
            </Suspense >
            </TabsContent>
            <TabsContent value="stafftask">
            <Suspense fallback={<Loading/>}>
            <TaskListByStaff staff={staff}/>
            </Suspense >
            </TabsContent>
            <TabsContent value="mytask">
            <Suspense fallback={<Loading/>}>
            <Board board={data}/>
            </Suspense >
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;
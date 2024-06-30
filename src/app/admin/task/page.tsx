import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import  TaskListAll from '@/components/task/tasklist'
import TaskListPending from '@/components/task/tasklistpending'
import TaskStaff from '@/components/task/taskstaff'
import TaskKanban from '@/components/task/addTask'
import Board from '@/components/task/Board'
import { getAllTaskAssignment } from '@/lib/data'




const page = async () => {

  const data = await getAllTaskAssignment();

  return (
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="mytask">My Task</TabsTrigger>
              </TabsList>
            
            </div>

            <TabsContent value="all">
              <TaskListAll/>
            </TabsContent>

            <TabsContent value="pending">
            <TaskListPending/>
            </TabsContent>

            <TabsContent value="staff">
            <TaskStaff/>
            </TabsContent>

            <TabsContent value="mytask">
            <Board board={data} />
            </TabsContent>
          </Tabs>
    </main>
  )
}

export default page;
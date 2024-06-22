import {
  Pencil,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/lib/db"
import { getBookingTaskDataAll } from "@/lib/data"




async function TaskList(){

  const data = await getBookingTaskDataAll();
  console.log(data);

  return (


    <>

    <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Task</CardTitle>
                  <CardDescription>
                    Manage your task here
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-1 md:grid-cols-2     lg:grid-cols-3 gap-4">

                {data.map((task)=>(

                    <Card key={task.taskid} x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">{task.task_type} of {task.groom_name} & {task.bride_name} </CardDescription>

                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: {task.event_address}
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Event: {task.task_type}
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        
                    </div>
                    
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                    
                      <Badge variant={task.taskstatus === 'Pending' ? 'destructive' : task.taskstatus === 'Completed' ? 'success' :
    'default'} className="flex justify-start">{task.taskstatus}</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      

                    </CardFooter>
                    </Card>


                ))}
                

                </CardContent>
                <CardFooter>
                  
                </CardFooter>
              </Card>
    </>
  )
}

export default TaskList
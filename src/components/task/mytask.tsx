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
  import { Mytask } from "@/lib/data"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
    
async function MyTask(){

    const data = await Mytask();
  
    return (
      <>
      <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Staff Task</CardTitle>
                    <CardDescription>
                      Manage Staff Task
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                 {data.map((task) => (
                      <Card key={task.taskassignmentid}  x-chunk=" dashboard-05-chunk-1">
                      <CardHeader className=" rounded-xl pb-2">
                      <CardDescription className="   flex items-center font-bold text-black">
                        <div className="">
                        <Avatar >
                            <AvatarImage src="" alt="/profile.png" />
                            <AvatarFallback>{task.staffname?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        </div>
                        <div className="pl-2">
                            <div>
                                {task.staffname}
                            </div>
                            <div className="text-xs font-light text-gray-500">
                                {task.taskassignmentrole}
                            </div>
                        </div>
                       </CardDescription>
  
                      </CardHeader>
                      <CardContent className="pt-2" >
                    
                    <div className="flex">
                      <div className="font-bold text-xs text-muted-foreground ">
                          Customer Name: 
                      </div>
                      <div className="text-xs text-muted-foreground pl-1 ">
                          {task.groom_name} & {task.bride_name}
                      </div>
                      
                    </div>
                    <div className="flex">
                      <div className="font-bold text-xs text-muted-foreground pt-2">
                          Event type: 
                      </div>
                      <div className="text-xs text-muted-foreground pl-1 pt-2">
                          {task.event_type}
                      </div>
                      
                    </div>
                    <div className="flex">
                      <div className="font-bold text-xs text-muted-foreground pt-2">
                         Location: 
                      </div>
                      <div className="text-xs text-muted-foreground pl-1 pt-2">
                          {task.event_address}
                      </div>
                      
                    </div>
                    <div className="flex">
                      <div className="font-bold text-xs text-muted-foreground pt-2">
                          Date: 
                      </div>
                      <div className="text-xs text-muted-foreground pl-1 pt-2">
                          
                      </div>
                      
                    </div>
                     
                      </CardContent>
                      <CardFooter className="flex justify-end gap-5">
                      
                        <Badge variant={task.tasksassignmentstatus === 'Pending' ? 'destructive' : task.tasksassignmentstatus === 'Completed' ? 'success' :'default'} className="flex justify-start">{task.tasksassignmentstatus}</Badge>
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
  
  
  
  export default MyTask
  
  
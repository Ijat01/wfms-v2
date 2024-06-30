import {
    Pencil,
    Trash2,
    CalendarDays,
    MoreVertical
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
  import { Mytask, getAllTaskAssignment } from "@/lib/data"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
  
    
async function MyTask(){

  const data = await getAllTaskAssignment();
  const PendingTask = data!.filter((data) => data.taskassignment_status === "Pending" )
  const CompleteTask = data!.filter((data) => data.taskassignment_status === "Complete" )
  const InprogressTask = data!.filter((data) => data.taskassignment_status === "In Progress" )
    return (
    <>
        <Card> 

            <CardHeader>

                    <CardTitle>Task Assignment</CardTitle>
                    <CardDescription>
                      Manage Task Assignment
                    </CardDescription>

            </CardHeader>

            <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <Card>

                    <CardHeader className="bg-slate-200 rounded-t-[11px] flex justify-center items-center text-sm font-bold pt-2 pb-2 h-8">
                    <div className="grow">
                    Pending Task
                    </div>

                    
                    </CardHeader>

                    <CardContent className="flex-col overflow-y-auto h-[520px]">
                    
                    {PendingTask.map((taskassignment)=>(

                    
                        <Card key= {taskassignment.taskassignment_id} className="mt-4">

                            <CardHeader className="bg-gray-200  flex pt-4 pb-4 pr-2 h-4  justify-center text-xs rounded-t-[11px]">

                            <div className="flex items-center">
                            <div className="grow">
                                {taskassignment.taskassignment_role}
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreVertical className="size-4"></MoreVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                            </CardHeader>

                            <CardContent className="pb-1 pt-4">
                                <div className="flex pb-4">
                                    <Avatar >
                                        <AvatarImage src="" alt="/profile.png" />
                                        <AvatarFallback>AA</AvatarFallback>
                                    </Avatar>
                                
                                    <div className="my-auto pl-2 text-sm font">
                                        <div>
                                        {taskassignment.user_name}
                                        </div>
                                        <div className="text-xs font-light text-gray-500">
                                        {taskassignment.user_role}
                                        </div>
                                    </div>
                                </div>

                                <div className=" text-xs pb-1">
                                    Comment:
                                </div>

                                <Card className="pl-2 pt-2 pb-2 text-sm rounded-sm">
                                    {taskassignment.taskassignment_description}
                                </Card>
                                
                            </CardContent>

                            <CardFooter className="flex justify-end gap-2 pt-2 pb-2  ">
                                
                                    
                                    <Badge variant="destructive">{taskassignment.taskassignment_status}</Badge>

                                
                                
                            </CardFooter>

                        </Card>


                    ))}
                        

                    </CardContent>



                </Card>

                <Card>

                    <CardHeader className="bg-slate-200 rounded-t-[11px] flex justify-center items-center text-sm font-bold pt-2 pb-2 h-8">
                    <div className="grow">
                    In Progress Task
                    </div>


                    </CardHeader>

                    <CardContent className="flex-col overflow-y-auto h-[520px]">

                    {InprogressTask.map((taskassignment)=>(


                        <Card key= {taskassignment.taskassignment_id} className="mt-4" >

                            <CardHeader className="bg-gray-200  flex pt-4 pb-4 pr-2 h-4  justify-center text-xs rounded-t-[11px]">

                            <div className="flex items-center">
                            <div className="grow">
                                {taskassignment.taskassignment_role}
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreVertical className="size-4"></MoreVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                            </CardHeader>

                            <CardContent className="pb-1 pt-4 ">
                                <div className="flex pb-4">
                                    <Avatar >
                                        <AvatarImage src="" alt="/profile.png" />
                                        <AvatarFallback>AA</AvatarFallback>
                                    </Avatar>
                                
                                    <div className="my-auto pl-2 text-sm font">
                                        <div>
                                        {taskassignment.user_name}
                                        </div>
                                        <div className="text-xs font-light text-gray-500">
                                        {taskassignment.user_role}
                                        </div>
                                    </div>
                                </div>

                                <div className=" text-xs pb-1">
                                    Comment:
                                </div>

                                <Card className="pl-2 pt-2 pb-2 text-sm rounded-sm">
                                    {taskassignment.taskassignment_description}
                                </Card>
                                
                            </CardContent>

                            <CardFooter className="flex justify-end gap-2 pt-2 pb-2  ">
                                
                                    
                                    <Badge>{taskassignment.taskassignment_status}</Badge>

                                
                                
                            </CardFooter>

                    </Card>


))}
    

</CardContent>



</Card>

<Card>

<CardHeader className="bg-slate-200 rounded-t-[11px] flex justify-center items-center text-sm font-bold pt-2 pb-2 h-8">
<div className="grow">
Completed Task
</div>


</CardHeader>

<CardContent className="flex-col overflow-y-auto h-[520px]">

{CompleteTask.map((taskassignment)=>(


    <Card key= {taskassignment.taskassignment_id} className="mt-4" >

        <CardHeader className="bg-gray-200  flex pt-4 pb-4 pr-2 h-4  justify-center text-xs rounded-t-[11px]">

        <div className="flex items-center">
        <div className="grow">
            {taskassignment.taskassignment_role}
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className="size-4"></MoreVertical>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </CardHeader>

        <CardContent className="pb-1 pt-4 ">
            <div className="flex pb-4">
                <Avatar >
                    <AvatarImage src="" alt="/profile.png" />
                    <AvatarFallback>AA</AvatarFallback>
                </Avatar>
            
                <div className="my-auto pl-2 text-sm font">
                    <div>
                    {taskassignment.user_name}
                    </div>
                    <div className="text-xs font-light text-gray-500">
                    {taskassignment.user_role}
                    </div>
                </div>
            </div>

            <div className=" text-xs pb-1">
                Comment:
            </div>

            <Card className="pl-2 pt-2 pb-2 text-sm rounded-sm">
                {taskassignment.taskassignment_description}
            </Card>
            
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-2 pb-2  ">
            
                
                <Badge variant="success" >{taskassignment.taskassignment_status}</Badge>

            
            
        </CardFooter>

</Card>


))}


</CardContent>



</Card>

                     
            </CardContent>
                      
                  
            <CardFooter>
                    
            </CardFooter>

        </Card>

        
        
    </>
    )
  }
  
  
  
  export default MyTask
  
  
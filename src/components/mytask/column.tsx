import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MyTask } from "@/types/types";



interface ColumnProps {
  title: string;
  tasks: MyTask[];
  droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId }) => {
    const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  
    const handleDragStart = (taskId: string) => {
      setDraggingTaskId(taskId);
    };
  
    const handleDragEnd = () => {
      setDraggingTaskId(null);
    };

    const getPriorityStatus = (duedate: Date | null ) => {
      const currentDate = new Date();
      if (!duedate) {
        return "Low";
      }
  
      const diffTime = duedate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 5) return "High";
      if (diffDays <= 10) return "Medium";
      return "Low";
    };
  
    const getStatusBadge = (priorityStatus: string) => {
      switch (priorityStatus) {
        case "High":
          return <Badge className="text-xs" variant="destructive">High</Badge>;
        case "Medium":
          return <Badge className="text-xs" variant="warning">Medium</Badge>;
        case "Low":
          return <Badge className="text-xs" variant="success">Low</Badge>;
        default:
          return null;
      }
    };
    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Card {...provided.droppableProps} ref={provided.innerRef}>
            <CardHeader className="bg-slate-200 rounded-t-[11px] flex justify-center items-center text-sm font-bold pt-2 pb-2 h-8">
              <div className="grow">
                {title}
              </div>
            </CardHeader>
  
            <CardContent className="flex-col overflow-y-auto h-[520px]">
              {tasks.map((taskassignment, index) => (
                <Draggable key={taskassignment.task_id} draggableId={taskassignment.task_id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.8 : 1,
                      }}
                    >
                      <Card className="mt-4">
                        <CardHeader className="bg-gray-200 flex pt-4 pb-4 pr-2 h-4 justify-center text-xs rounded-t-[11px]">
                          <div className="flex items-center">
                            <div className="grow">
                              {taskassignment.task_role}
                            </div>
                          </div>
                        </CardHeader>
  
                        <CardContent className="pb-1 pt-4">
                          <div className="flex pb-4">
                            <div className="my-auto  text-md font">
                              <div className="pb-2 flex">
                                <div>
                                {taskassignment.event_type}
                                </div>
                                <div className="font-bold pl-1">
                                {taskassignment.groom_name} & {taskassignment.bride_name}
                                </div>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Event Date:
                              </div>
                              <Badge variant="outline">{taskassignment.eventdate}</Badge>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Event Address:
                              </div>
                              <Badge variant="outline">{taskassignment.eventaddress}</Badge>
                              </div>
                              <div className="flex items-center pb-2">
                              <div className="text-xs pr-2">
                                Due Date:
                              </div>
                              <Badge variant="outline">{taskassignment.duedate}</Badge>
                              </div>
                              <div className="flex items-center">
                              <div className="text-xs pr-2">
                                Priority Level:
                              </div>
                              {getStatusBadge(getPriorityStatus(taskassignment.duedatecompare))}
                              </div>
                              
                              
                            </div>
                          </div>
  
                        </CardContent>
  
                        <CardFooter className="flex justify-end gap-2 pt-2 pb-2">
                          <Badge variant={taskassignment.task_status === 'Pending' ? 'destructive' : taskassignment.task_status === 'Complete' ? 'success' : 'default'} >{taskassignment.task_status}</Badge>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </CardContent>
          </Card>
        )}
      </Droppable>
    );
  };
  
  export default Column;

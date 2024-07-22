"use client";
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import Column from "./column";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MyTask } from "@/types/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "../ui/input"; 

const Board: React.FC<{ board: MyTask[] }> = ({ board }) => {
    const [tasks, setTasks] = useState<MyTask[]>(board);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        const draggedTask = tasks.find(
            (task) => task.task_id === draggableId
        );

        if (!draggedTask) return;

        let updatedStatus: string | null;

        switch (destination.droppableId) {
            case "Pending":
                updatedStatus = "Pending";
                break;
            case "In Progress":
                updatedStatus = "In Progress";
                break;
            case "Completed":
                updatedStatus = "Complete";
                break;
            default:
                updatedStatus = draggedTask.task_status;
        }

        const updatedTasks = tasks.map((task) =>
            task.task_id === draggableId
                ? { ...task, task_status: updatedStatus }
                : task
        );

        setTasks(updatedTasks);

        try {
            await axios.patch(`/api/task/updatetaskstatus`, {
                task_id: draggableId,
                task_status: updatedStatus,
            });
        } catch (error) {
            console.error("Failed to update task status", error);
            setTasks(tasks); // Revert back to the original state if the API call fails
        }
    };

    // Filter the tasks based on the search query
    const filteredTasks = tasks.filter(task =>
        task.groom_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.bride_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.eventdate?.includes(searchQuery)
    );

    return (
        <>
            
            <DragDropContext onDragEnd={onDragEnd}>
                <Card>
                    <CardHeader>
                        <CardTitle>Task Assignment</CardTitle>
                        <CardDescription>
                            Manage Task Assignment
                        </CardDescription>
                    </CardHeader>
                    <div className="pl-6">
                    <Input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border w-96 p-2 rounded mb-4"
                    />
                    </div>
                    <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Column
                            title="In Progress"
                            tasks={filteredTasks.filter(
                                (task) => task.task_status === "In Progress"
                            )}
                            droppableId="In Progress"
                        />
                        <Column
                            title="Completed"
                            tasks={filteredTasks.filter(
                                (task) => task.task_status === "Complete"
                            )}
                            droppableId="Completed"
                        />
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </DragDropContext>
        </>
    );
};

export default Board;

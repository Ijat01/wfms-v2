"use client";
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import Column from "./column";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Board: React.FC<{ board: Task[] }> = ({ board }) => {
    const [tasks, setTasks] = useState<Task[]>(board);
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
            (task) => task.taskassignment_id === draggableId
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
                updatedStatus = draggedTask.taskassignment_status;
        }

        const updatedTasks = tasks.map((task) =>
            task.taskassignment_id === draggableId
                ? { ...task, taskassignment_status: updatedStatus }
                : task
        );

        setTasks(updatedTasks);

        try {
            await axios.patch(`/api/task/updatetaskstatus`, {
                taskassignment_id: draggableId,
                taskassignment_status: updatedStatus,
            });
        } catch (error) {
            console.error("Failed to update task status", error);
            setTasks(tasks); // Revert back to the original state if the API call fails
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Card>
                <CardHeader>
                    <CardTitle>Task Assignment</CardTitle>
                    <CardDescription>
                        Manage Task Assignment
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Column
                        title="Pending"
                        tasks={tasks.filter(
                            (task) => task.taskassignment_status === "Pending"
                        )}
                        droppableId="Pending"
                    />
                    <Column
                        title="In Progress"
                        tasks={tasks.filter(
                            (task) => task.taskassignment_status === "In Progress"
                        )}
                        droppableId="In Progress"
                    />
                    <Column
                        title="Completed"
                        tasks={tasks.filter(
                            (task) => task.taskassignment_status === "Complete"
                        )}
                        droppableId="Completed"
                    />
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </DragDropContext>
    );
};

export default Board;

"use server";
import { db } from '@/lib/db';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

const UpdateTaskAssignmentSchema = z.object({
    task_id: z.string(),
    task_status: z.string(),
});

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        console.log("Request Body:", body);

        const { task_id, task_status } = UpdateTaskAssignmentSchema.parse(body);

        // Ensure the user is authenticated
        const session = await getAuthSession();
        if (!session) {
            return new Response('You must be signed in to update a task assignment', { status: 401 });
        }

        console.log('Session ID:', session.user.id);

        const newTaskId = +task_id;
        

        const updatedTaskAssignment = await db.tasks.update({
            where: { task_id: newTaskId },
            data: {
                task_status: task_status,
            },
        });

        console.log('Task assignment successfully updated:', updatedTaskAssignment);

        return new Response('OK', { status: 200 });
    } catch (error) {
        console.error('Error updating task assignment:', error);

        if (error instanceof z.ZodError) {
            return new Response('Invalid input data', { status: 400 });
        }

        return new Response('Unable to update task assignment. Please try again later.', { status: 500 });
    }
}
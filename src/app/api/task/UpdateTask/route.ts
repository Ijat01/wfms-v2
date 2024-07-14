"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

const UpdateTaskSchema = z.object({
    user_id: z.string(),
    task_role: z.string(),
    event_id: z.string(),
    task_id: z.string(),
    bookingid: z.string(),
});

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {
            user_id,
            task_role,
            event_id,
            task_id,
            bookingid,
        } = UpdateTaskSchema.parse(body);

        // Ensure the user is authenticated
        const session = await getAuthSession();
        if (!session) {
            throw new Error('You must be signed in to update a task');
        }

        console.log('Session ID:', session.user.id);

        const newEventId = +event_id;
        const newTaskId = +task_id;
        const newbookingid = +bookingid;

        const event = await db.events.findUnique({
            where: {
              event_id: newEventId,
            },
          });
      
          if (!event || !event.event_date) {
            throw new Error('Event not found or event date is missing');
          }
      
          // Parse event date
          const eventDate = new Date(event.event_date);
      
          // Set task due date based on role
          let taskDueDate = new Date(eventDate);

          if (user_id) {
            const conflictingUser = await db.tasks.findMany({
                where: {
                    user_id: user_id,
                    event_id: newEventId,
                    events: {
                        booking_id: newbookingid,
                    },
                },
            });

            if (conflictingUser.length > 0) {
                const checkTask = await db.tasks.findMany({
                    where: {
                        user_id: user_id,
                        task_role: task_role,
                        event_id: event.event_id,
                        events: {
                            booking_id: newbookingid,
                        },
                    },
                });

            if (checkTask.length < 0){
                throw new Error('Staff is already assigned to an event on the same date ');
            }
            }
        }

          // Check for conflicting tasks for specific roles
          if (["Main Photographer", "Main Videographer", "Extra Videographer", "Extra Photographer"].includes(task_role)) {
            const conflictingTasks = await db.tasks.findMany({
                where: {
                    user_id: user_id,
                    event_id: {
                        not: newEventId,
                    },
                    events: {
                        event_date: event.event_date,
                        booking_id: {
                            not: event.booking_id,
                        },
                    },
                },
            });

            if (conflictingTasks.length > 0) {
                throw new Error('Staff is already assigned to an event on the same date ');
            }
        }


        // Check if the user is authorized to update this task (optional)

        // Retrieve the existing task from the database
        const existingTask = await db.tasks.findUnique({
            where: {
                task_id: newTaskId,
            },
        });

        if (!existingTask) {
            throw new Error('Task not found');
        }

        // Update task details
        const updatedTask = await db.tasks.update({
            where: {
                task_id: newTaskId,
            },
            data: {
                user_id: user_id,
            },
        });

        console.log('Task successfully updated:', updatedTask);

        // Return a 200 OK response with the updated task
        return new Response('OK');
    } catch (error) {
        console.error('Error updating Task:', error);

        let errorMessage = 'Unable to update Task. Please try again later.';
        let statusCode = 500;

        if (error instanceof Error) {
            if (error.message.includes('You must be signed in')) {
                errorMessage = error.message;
                statusCode = 401;
            } if (error.message.includes('Staff is already assigned to an event on the same date for the same booking')) {
                errorMessage = error.message;
                statusCode = 402;
            }
            else if (error.message.includes('Role already exist in this event')) {
                errorMessage = error.message;
                statusCode = 400;
            }
             else if (error.message.includes('Task not found')) {
                errorMessage = error.message;
                statusCode = 404;
            }
        }

        // Return a response with the specific error message and status code
        return new Response(errorMessage, { status: statusCode });
    }
}
"use server";
import { db } from '@/lib/db';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

// Define a schema for validating the request body
const DeleteEventsSchema = z.object({
  task_id: z.string(),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { task_id } = DeleteEventsSchema.parse(body);

    
    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new Response('You must be signed in to delete a user', { status: 401 });
    }


    // Delete the user record from the database
    const newtask_id = +task_id;

    const task = await db.tasks.findUnique({
      where: { task_id : newtask_id }  ,
    });

    if (!task || !task.event_id) {
      throw new Error('Event not found or event date is missing');
    }

    const event = await db.events.findUnique({
      where: { event_id : task?.event_id }  ,
    });

    const deletedEvent = await db.tasks.delete({
      where: { task_id : newtask_id }  ,
    });

    const counttask = await db.tasks.count({
      where:{
        event_id: task.event_id,
      }
    })
    
    if (counttask === 0){
      const updateevent = await db.events.update({
        where:{
          event_id: event?.event_id,
        },
        data:{
          event_status: "No Task Assigned"
        }
      })
    }

    

    // Return a 200 OK response indicating successful deletion
    return new Response('Task successfully deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting Task:', error);

    // Return a 500 Internal Server Error response if an error occurs
    return new Response('Unable to delete Task. Please try again later.', {
      status: 500,
    });
  }
}
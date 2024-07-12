"use server";
import { db } from '@/lib/db';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

// Define a schema for validating the request body
const DeleteEventsSchema = z.object({
  event_id: z.string(),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { event_id } = DeleteEventsSchema.parse(body);

    
    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new Response('You must be signed in to delete a user', { status: 401 });
    }

    

    console.log('Session ID:', session.user.id);

    // Delete the user record from the database
    const newevent_id = +event_id;

    const deletedEvent = await db.events.delete({
      where: { event_id : newevent_id }  ,
    });

    console.log('Event successfully deleted:', deletedEvent);

    // Return a 200 OK response indicating successful deletion
    return new Response('User successfully deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting Event:', error);

    // Return a 500 Internal Server Error response if an error occurs
    return new Response('Unable to delete Event. Please try again later.', {
      status: 500,
    });
  }
}
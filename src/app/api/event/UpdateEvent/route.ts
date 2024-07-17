"use server";
import { db } from '@/lib/db';
import { EventSchemaType,EventSchema } from '@/lib/validators/events';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';


export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { 
            eventid,
            event_type,
            event_date,
            event_address,
            event_time,
         } = EventSchema.parse(body) as EventSchemaType;
    
         const formattedDate = new Date(event_date).toISOString();

         
    
        // Ensure the user is authenticated
        const session = await getAuthSession();
        if (!session) {
          throw new Error('You must be signed in to create a user');
        }
    
        console.log('Session ID:', session.user.id);
    
        const neweventid = +eventid ;
        // Create a new user record in the database
        const newEvent = await db.events.update({
            where:{
                event_id: neweventid 
            },
          data: {
            event_type:event_type,
            event_date:formattedDate,
            event_address:event_address,
            event_time:event_time,
            event_status:"No Task Assigned" // Ensure to add the creator's ID
          },
        });
    
        console.log('Event successfully created:', newEvent);
    
        // Return a 201 Created response with the newly created user
        return new Response ('OK')
      } catch (error) {
        console.error('Error creating Event:', error);
        
        // Return a 500 Internal Server Error response if an error occurs
        return new Response (
          'Unable to create Event. Please try again later.', 
          {status: 500}
          
          );
      }
  }
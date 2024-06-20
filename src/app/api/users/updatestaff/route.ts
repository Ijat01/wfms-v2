"use server";
import { db } from '@/lib/db';
import { AddStaffSchema, AddStaffSchemaType } from '@/lib/validators/users';
import { hash } from 'bcrypt';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

const UpdateStaffSchema = z.object({
    icno: z.string().nonempty(),
    fullname: z.string().nonempty(),
    email: z.string().email(),
    role: z.string().nonempty(),
  });

export async function PATCH(req: Request) {
    try {
      const body = await req.json();
      const {icno, fullname, email, role } = UpdateStaffSchema.parse(body);
  
      // Ensure the user is authenticated
      const session = await getAuthSession();
      if (!session) {
        throw new Error('You must be signed in to update a user');
      }
  
      console.log('Session ID:', session.user.id);
  
      // Hash the password before storing it
      // Create a new user record in the database
      const updatedUser = await db.users.update({
        where: { user_id: icno },
        data: {
          user_fullname: fullname,
          user_email: email,
          user_role: role, // Ensure to add the updater's ID
        },
      });
  
      console.log('User successfully update:', updatedUser);
  
      // Return a 201 Created response with the newly created user
      return new Response ('OK')
    } catch (error) {
      console.error('Error updating user:', error);
      
      // Return a 500 Internal Server Error response if an error occurs
      return new Response (
        'Unable to update user. Please try again later.', 
        {status: 500}
        
        );
    }
  }
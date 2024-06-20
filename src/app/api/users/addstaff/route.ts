"use server";
import { db } from '@/lib/db';
import { AddStaffSchema, AddStaffSchemaType } from '@/lib/validators/users';
import { hash } from 'bcrypt';
import { getAuthSession } from '@/lib/auth';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { icno, fullname, email, password, role } = AddStaffSchema.parse(body) as AddStaffSchemaType;

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to create a user');
    }

    console.log('Session ID:', session.user.id);

    // Hash the password before storing it
    const hashedPassword = await hash(password, 12);

    // Create a new user record in the database
    const newUser = await db.users.create({
      data: {
        user_id: icno,
        user_fullname: fullname,
        user_email: email,
        user_password: hashedPassword,
        user_role: role,
        created_by: session.user.id, // Ensure to add the creator's ID
      },
    });

    console.log('User successfully created:', newUser);

    // Return a 201 Created response with the newly created user
    return new Response ('OK')
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Return a 500 Internal Server Error response if an error occurs
    return new Response (
      'Unable to create user. Please try again later.', 
      {status: 500}
      
      );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { icno, fullname, email, role } = AddStaffSchema.parse(body) 

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
"use server";
import { db } from '@/lib/db';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';

// Define a schema for validating the request body
const DeletePaymentDetailsSchema = z.object({
  paymentdetails_id: z.string(),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { paymentdetails_id } = DeletePaymentDetailsSchema.parse(body);

    
    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new Response('You must be signed in to delete a user', { status: 401 });
    }

    

    console.log('Session ID:', session.user.id);

    // Delete the user record from the database
    const newpaymentdetails_id = +paymentdetails_id;

    const deletedBooking = await db.paymentdetails.delete({
      where: { paymentdetails_id : newpaymentdetails_id }  ,
    });

    console.log('Booking successfully deleted:', deletedBooking);

    // Return a 200 OK response indicating successful deletion
    return new Response('User successfully deleted', { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);

    // Return a 500 Internal Server Error response if an error occurs
    return new Response('Unable to delete user. Please try again later.', {
      status: 500,
    });
  }
}
"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

// Define the schema for updating a booking

const UpdateBookingSchema = z.object({
    booking_id: z.string(),
    groomname: z.string(),
    bridename: z.string(),
    bookingdate: z.string().optional(),
    eventdate: z.string(),
    eventaddress: z.string(),
    contact: z.string(),
    package_id: z.string().optional(),
    package_name: z.string().optional(),
  });


export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      booking_id,
      groomname,
      bridename,
      bookingdate,
      eventdate,
      eventaddress,
      contact,
      package_id,
    } = UpdateBookingSchema.parse(body);

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to update a booking');
    }

    console.log('Session ID:', session.user.id);

    const neweventdate = new Date(eventdate).toISOString();
    const newbookingid = +booking_id;
    // Update the booking record in the database
    const updatedBooking = await db.bookings.update({
      where: { booking_id: newbookingid },
      data: {
        groom_name: groomname,
        bride_name: bridename,
        updated_at: bookingdate,
        event_date: neweventdate,
        event_address: eventaddress,
        contact_no: contact,
        package_id: package_id,
      },
    });

    console.log('Booking successfully updated:', updatedBooking);

    // Return a 200 OK response with the updated booking
    return new Response('Booking successfully updated', { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);

    // Return a 500 Internal Server Error response if an error occurs
    return new Response('Unable to update booking. Please try again later.', {
      status: 500,
    });
  }
}

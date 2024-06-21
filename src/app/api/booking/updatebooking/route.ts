"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';

// Define the schema for updating a booking
const UpdateBookingSchema = z.object({
  booking_id: z.number(),
  groomname: z.string().nullable(),
  bridename: z.string().nullable(),
  bookingdate: z.string().optional(),
  eventdate: z.string().optional(),
  eventaddress: z.string().nullable(),
  contact: z.string().nullable(),
  packagetype: z.string().nullable(),
  packageid: z.string().nullable(),
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
      packagetype,
      packageid,
    } = UpdateBookingSchema.parse(body);

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to update a booking');
    }

    console.log('Session ID:', session.user.id);

    // Update the booking record in the database
    const updatedBooking = await db.bookings.update({
      where: { booking_id: booking_id },
      data: {
        groom_name: groomname,
        bride_name: bridename,
        updated_at: bookingdate,
        event_date: eventdate,
        event_address: eventaddress,
        contact_no: contact,
        event_type: "",
        package_id: packageid,
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

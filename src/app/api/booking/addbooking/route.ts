"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { BookingSchema, BookingSchemaType } from '@/lib/validators/booking';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packageid, groomname, bridename, eventaddress, contactno, eventdate, confirmProceed} = BookingSchema.parse(body) as BookingSchemaType;

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new Response('You must be signed in to create a booking', { status: 401 });
    }

    console.log('Session ID:', session.user.id);

    const formattedDate = new Date(eventdate).toISOString();

    // Count bookings for the specified event date
    const checkbooking = await db.bookings.count({
      where: {
        event_date: formattedDate,
      },
    });

    console.log('Bookings for date:', checkbooking);

    // Check if booking limit exceeded
    if (checkbooking >= 5 && !confirmProceed) {
      return new Response('Booking limit exceeded for this date. Do you want to proceed?', { status: 400 });
    }

    // Proceed to create the booking
    const newBooking = await db.bookings.create({
      data: {
        user_id: session.user.id,
        package_id: packageid,
        groom_name: groomname.toUpperCase(),
        bride_name: bridename.toUpperCase(),
        event_date: formattedDate,
        event_type: "", // Adjust as needed
        event_address: eventaddress,
        contact_no: contactno,
        created_at: new Date(),
      },
    });

    console.log('Booking successfully created:', newBooking);

    // Return success response with the created booking data
    return new Response(JSON.stringify(newBooking), { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response('Unable to create booking. Please try again later.', { status: 500 });
  }
}

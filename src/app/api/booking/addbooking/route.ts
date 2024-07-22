"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { BookingSchema, BookingSchemaType } from '@/lib/validators/booking';
import { Resend } from 'resend';
import BookingEmail from '../../../../../emails/BookingEmail';
import { formatDate } from '@/lib/formateDate';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lock_by, packageid, groomname, bridename, eventaddress, contactno, eventdate, payment_total, paymentdetail_amount, paymentdetails_type, paymentdetails_desc, confirmProceed, eventtime } = BookingSchema.parse(body) as BookingSchemaType;
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new Response('You must be signed in to create a booking', { status: 401 });
    }

    console.log('Session ID:', session.user.id);

    const formattedDate = new Date(eventdate).toISOString();

    // Count bookings for the specified event date
    const checkbooking = await db.events.findMany({
      where: {
        event_date: formattedDate,
      },
      distinct: ['booking_id'],
    });

    const bookingCount = checkbooking.length;

    console.log('Bookings for date:', bookingCount);

    const newPaymentTotal = parseFloat(payment_total);
    const newPaymentDetailsAmount = parseFloat(paymentdetail_amount);
    const newBalance = newPaymentTotal - newPaymentDetailsAmount;

    // Check if booking limit exceeded
    if (bookingCount >= 5 && !confirmProceed) {
      return new Response('Booking limit exceeded for this date. Do you want to proceed?', { status: 400 });
    }

    const findpackage = await db.packages.findUnique({
      where:{
        package_id: packageid
      }
    })

    const packagename = findpackage?.package_name;

    // Proceed to create the booking
    const newBooking = await db.bookings.create({
      data: {
        user_id: session.user.id,
        package_id: packageid,
        groom_name: groomname.toUpperCase(),
        bride_name: bridename.toUpperCase(),
        contact_no: contactno,
        created_at: new Date(),
        lock_by: lock_by.toUpperCase(),
      },
    });
    console.log('Payment successfully created:', newBooking);

    const newPayment = await db.payments.create({
      data: {
        payment_total: newPaymentTotal,
        payment_balance: newBalance,
        booking_id: newBooking.booking_id
      }
    });

    console.log('Payment successfully created:', newPayment);

    const createEvent = async (eventType: string) => {
      return await db.events.create({
        data: {
          event_type: eventType,
          event_status: "No Task Assigned",
          event_date: formattedDate,
          event_address: eventaddress,
          booking_id: newBooking.booking_id,
          event_time: eventtime,  
        },
      });
    };

    const newPaymentDetails = await db.paymentdetails.create({
      data: {
        payment_id: newPayment.payment_id,
        paymentdetails_type: paymentdetails_type,
        paymentdetails_desc: paymentdetails_desc,
        paymentdetails_amount: newPaymentDetailsAmount,
        paymentdetails_status: "Complete",
      },
    });

    console.log('Payment details successfully created:', newPaymentDetails);

    if (["N01", "N02", "N03"].includes(packageid)) {
      await createEvent("Nikah");
    } else if (["S01", "S02", "S03"].includes(packageid)) {
      await createEvent("Sanding");
    } else {
      await createEvent("Nikah");
      await createEvent("Sanding");
    }

    console.log('Booking successfully created:', newBooking);

    const { data, error } = await resend.emails.send({
      from: "no-reply <no-reply@pwms.xyz>",
      to: "izatsaf07@gmail.com",
      subject: "New Booking",
      react: BookingEmail({ groomname: groomname, bridename:bridename, contactno:contactno, packagename:packagename , paymenttotal:payment_total ,handleby:lock_by , amountpaid:paymentdetail_amount , balance: newBalance , eventdate:formatDate(eventdate), eventtime:eventtime }),
    });

    // Return success response with the created booking data
    return new Response(JSON.stringify(newBooking), { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response('Unable to create booking. Please try again later.', { status: 500 });
  }
}

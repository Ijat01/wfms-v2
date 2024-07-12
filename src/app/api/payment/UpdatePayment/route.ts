"use server";
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { z } from 'zod';
import { PaymentSchemaType, PaymentSchema } from '@/lib/validators/payment';

// Define the schema for updating a booking

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      payment_balance,
      payment_id,
      payment_total,
    } = PaymentSchema.parse(body);

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to update a booking');
    }

    console.log('Session ID:', session.user.id);

    const newPaymentId = +payment_id;
    const newPaymentTotal = +payment_total;

    // Retrieve total payment details amount for the given payment_id
    const totalPaymentDetailsAmount = await db.paymentdetails.aggregate({
      _sum: {
        paymentdetails_amount: true,
      },
      where: {
        payment_id: newPaymentId,
      },
    });

    console.log('Total Payment Details Amount:', totalPaymentDetailsAmount);

    // Calculate new payment balance
    const newTotalPaymentDetailsAmount = totalPaymentDetailsAmount?._sum?.paymentdetails_amount || 0;
    const newPaymentBalance = newPaymentTotal - newTotalPaymentDetailsAmount ;

    console.log('New Payment Balance:', newPaymentBalance);

    // Update the booking record in the database
    const updatedBooking = await db.payments.update({
      where: { payment_id: newPaymentId },
      data: {
        payment_balance: newPaymentBalance,
        payment_total: newPaymentTotal,
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

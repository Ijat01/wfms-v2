"use server";
import { db } from '@/lib/db';
import { PaymentDetailsSchema,PaymentDetailsType } from '@/lib/validators/paymentdetails';
import { getAuthSession } from '@/lib/auth';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { payment_id, paymentdetails_type, paymentdetails_amount, paymentdetails_desc, payment_balance} = PaymentDetailsSchema.parse(body) as PaymentDetailsType;

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to create a user');
    }

    console.log('Session ID:', session.user.id);

    const newpayment_id= +payment_id;
    const newpaymentdetails_amount= +paymentdetails_amount;
    const paymentbalance = +payment_balance;
    const newpaymentbalance= paymentbalance-newpaymentdetails_amount

    // Hash the password before storing it
    // Create a new user record in the database
    const newPaymentDetails = await db.paymentdetails.create({
      data: {
        payment_id: newpayment_id,
        paymentdetails_status:"Complete",
        paymentdetails_type: paymentdetails_type.toLocaleUpperCase(),
        paymentdetails_amount:newpaymentdetails_amount,
        paymentdetails_desc:paymentdetails_desc.toLocaleUpperCase(), 
      },
    });

    console.log('payment details created:', newPaymentDetails);

    const updatePayment = await db.payments.update({
        where:{ payment_id: newpayment_id }
        ,
        data: {

            payment_balance: newpaymentbalance,

        },
    })

    console.log('payment details created:', newPaymentDetails);

    // Return a 201 Created response with the newly created user
    return new Response ('OK')
  } catch (error) {
    console.error('Error creating payment details:', error);
    
    // Return a 500 Internal Server Error response if an error occurs
    return new Response (
      'Unable to create payment details. Please try again later.', 
      {status: 500}
      
      );
  }
}

import {z} from 'zod'

export const PaymentDetailsSchema = z.object({


payment_balance: z.string(),
payment_id:z.string(),
paymentdetails_type:z.string().min(4),
paymentdetails_amount:z.string(),
paymentdetails_desc:z.string(),


  });

export type PaymentDetailsType = z.infer<typeof PaymentDetailsSchema>;


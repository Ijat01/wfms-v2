import {z} from 'zod'

export const BookingSchema = z.object({

   packageid: z.string(),
   groomname: z.string().min(3),
   bridename: z.string().min(3),
   eventdate: z.string(),
   eventaddress: z.string().min(5),
   contactno: z.string(),
   confirmProceed: z.boolean().optional(),
   payment_total:z.string(),
   paymentdetail_amount:z.string(),
   paymentdetails_type:z.string().min(4),
   paymentdetails_desc:z.string().min(4),
   lock_by:z.string().min(1),
  });

export type BookingSchemaType = z.infer<typeof BookingSchema>;


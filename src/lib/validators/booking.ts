import {z} from 'zod'

export const BookingSchema = z.object({

   packageid: z.string(),
   groomname: z.string().min(3),
   bridename: z.string().min(3),
   eventdate: z.string(),
   eventaddress: z.string().min(5),
   contactno: z.string(),
   confirmProceed: z.boolean().optional(),
  });

export type BookingSchemaType = z.infer<typeof BookingSchema>;


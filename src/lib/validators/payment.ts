import {z} from 'zod'

export const PaymentSchema = z.object({


payment_id: z.string(),
payment_balance: z.string(),
payment_total: z.string(),

  });

export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
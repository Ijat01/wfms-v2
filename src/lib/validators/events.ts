import {z} from 'zod'

export const EventSchema = z.object({

eventid: z.string().min(1),
bookingid:z.string().min(1),
event_type:z.string().min(1),
event_date:z.string().min(1),
event_address:z.string().min(1,"please fill the address"),
event_time:z.string().optional()


  });

export type EventSchemaType = z.infer<typeof EventSchema>;
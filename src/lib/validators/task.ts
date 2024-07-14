import {z} from 'zod'

export const TaskSchema = z.object({

event_id:z.string(),
user_id:z.string().min(1,"please choose one staff"),
task_role:z.string(),
event_date:z.string(),
bookingid:z.string(),
confirmation:z.boolean().optional(),
task_id:z.string().optional(),
  });

export type TaskSchemaType = z.infer<typeof TaskSchema>;
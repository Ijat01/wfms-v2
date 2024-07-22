import {z} from 'zod'

export const AddStaffSchema = z.object({
    icno: z.string().min(1, { message: "please insert username" }),
    fullname: z.string().min(10, { message: "Please insert your full name" }),
    email: z.string().email(),
    password: z.string().min(5, { message: "Please insert a password with at least 5 characters" }),
    role: z.string().min(1, { message: "Please choose one role" }),
  });

export type AddStaffSchemaType = z.infer<typeof AddStaffSchema>;


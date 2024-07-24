import {z} from 'zod'

export const PackageSchema = z.object({

   package_id: z.string(),
   package_type: z.string(),
   package_name: z.string(),

  });

export type PackageSchemaType = z.infer<typeof PackageSchema>;
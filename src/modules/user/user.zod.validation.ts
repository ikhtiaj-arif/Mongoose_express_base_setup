import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'password must be a string',
    })
    .max(20, { message: 'Password cannot be more then 20 characters' })
    .optional(),
  
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};

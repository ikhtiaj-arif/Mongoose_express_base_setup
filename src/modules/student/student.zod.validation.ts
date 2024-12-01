import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First name must be in capitalize format',
    }),
  middleName: z
    .string()
    .trim()
    .max(20, { message: 'Middle name cannot be more than 20 characters' })
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(20, { message: 'Last name cannot be more than 20 characters' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    }),
});

// Guardian ValidationSchema
const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father Name is required' }),
  fathersOccupation: z.string({
    required_error: 'Father Occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father Contact Number is required',
  }),
  motherName: z.string({ required_error: 'Mother Name is required' }),
  mothersOccupation: z.string({
    required_error: 'Mother Occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother Contact Number is required',
  }),
});

// Local Guardian ValidationSchema
const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local Guardian Name is required' }),
  occupation: z.string({
    required_error: 'Local Guardian Occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Local Guardian Contact Number is required',
  }),
  address: z.string({ required_error: 'Local Guardian Address is required' }),
});

// Main Student ValidationSchema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: ' Password is required' }),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other'], {
        required_error: 'Gender is required',
        invalid_type_error:
          "The gender field can only be one of the following: 'Male', 'Female', or 'Other'.",
      }),
      dateOfBirth: z
        .date()
        .optional()
        // .refine((value) => !value || !isNaN(Date.parse(value)), {
        //   message: 'Date of Birth must be a valid date string',
        // }),
        ,
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email must be a valid email address' }),
      contactNo: z.string({ required_error: 'Contact Number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z
        .string()
        .optional()
        .refine((value) => !value || value.startsWith('http'), {
          message: 'Profile Image must be a valid URL',
        }),
    }),
  }),
});

export const studentValidations = { createStudentValidationSchema };

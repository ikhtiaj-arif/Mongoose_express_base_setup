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
      name: userNameValidationSchema.optional(),
      gender: z.enum(['Male', 'Female', 'Other'], {
        required_error: 'Gender is required',
        invalid_type_error:
          "The gender field can only be one of the following: 'Male', 'Female', or 'Other'.",
      }),
      dateOfBirth: z.string().optional(),
      // .refine((value) => !value || !isNaN(Date.parse(value)), {
      //   message: 'Date of Birth must be a valid date string',
      // }),
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
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z
        .string()
        .optional()
        .refine((value) => !value || value.startsWith('http'), {
          message: 'Profile Image must be a valid URL',
        }),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});


export const studentValidations = { createStudentValidationSchema ,updateStudentValidationSchema };

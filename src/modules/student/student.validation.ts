import Joi from 'Joi';

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.pattern.base': '{#value} is not in capitalize format!',
      }),
    middleName: Joi.string().trim().max(20).allow(''),
    lastName: Joi.string()
      .trim()
      .max(20)
      .required()
      .regex(/^[a-zA-Z]+$/)
      .messages({
        'string.pattern.base': '{#value} is not valid!',
      }),
  });

  // Guardian ValidationSchema
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fathersOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    mothersOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });

  // Local Guardian ValidationSchema
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });

  // Main Student ValidationSchema
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('Male', 'Female', 'Other')
      .required()
      .messages({
        'any.only':
          "The gender field can only be one of the following: 'Male', 'Female', or 'Other'.",
      }),
    dateOfBirth: Joi.string().isoDate(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid(
      'A+',
      'A-',
      'B+',
      'B-',
      'AB+',
      'AB-',
      'O+',
      'O-',
    ),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string().uri(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

  export default studentValidationSchema;
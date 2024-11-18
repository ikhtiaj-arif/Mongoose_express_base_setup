// 2. Create a Schema corresponding to the document interface.
import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
} from './student.interface';

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true,
    maxlength: [20, 'First name cannot be more then 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        console.log(value, firstNameStr);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format!',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name cannot be more then 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Middle Name is required!'],
    trim: true,
    maxlength: [20, 'Last name cannot be more then 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid!',
    },
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required!'] },
  fathersOccupation: {
    type: String,
    required: [true, 'Father Occupation is required!'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required!'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required!'] },
  mothersOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required!'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required!'],
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required!'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required!'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required!'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required!'],
  },
});

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: [true, 'Student ID is required!'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required!'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message:
        "The gender field can only be one of the following: 'Male', 'Female', or 'Other'.",
    },
    required: [true, 'Gender is required!'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type!',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact Number is required!'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required!'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required!'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required!'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required!'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required!'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const Student = model<IStudent>('Student', studentSchema);

// import { Schema, model } from 'mongoose';
// import {
//   IGuardian,
//   ILocalGuardian,
//   IStudent,
//   IUserName,
// } from './student.interface';

// const userNameSchema = new Schema<IUserName>({
//   firstName: { type: String, required: [true, 'First Name Is Required!'] },
//   middleName: { type: String },
//   lastName: { type: String, required: [true, 'Last Name Is Required!'] },
// });

// const guardianSchema = new Schema<IGuardian>({
//   fatherName: { type: String, required: true },
//   fathersOccupation: { type: String, required: true },
//   fatherContactNo: { type: String, required: true },
//   motherName: { type: String, required: true },
//   mothersOccupation: { type: String, required: true },
//   motherContactNo: { type: String, required: true },
// });

// const localGuardianSchema = new Schema<ILocalGuardian>({
//   name: { type: String, required: true },
//   occupation: { type: String, required: true },
//   contactNo: { type: String, required: true },
//   address: { type: String, required: true },
// });

// const studentSchema = new Schema<IStudent>({
//   id: { type: String, required: true, unique: true },
//   name: {
//     type: userNameSchema,
//     required: true,
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ['Male', 'Female', 'Other'],
//       message:
//         "The gender field can only be one of the following: 'Male','Female', or 'Other'.",
//     },
//     required: true,
//   },
//   dateOfBirth: { type: String },
//   email: { type: String, required: true, unique: true },
//   contactNo: { type: String, required: true },
//   emergencyContactNo: { type: String, required: true },
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   presentAddress: { type: String, required: true },
//   permanentAddress: { type: String, required: true },
//   guardian: {
//     type: guardianSchema,
//     required: true,
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: true,
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });

// // 3. Create a Model.
// export const Student = model<IStudent>('Student', studentSchema);

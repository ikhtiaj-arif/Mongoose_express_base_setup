// 2. Create a Schema corresponding to the document interface.
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import validator from 'validator';

import config from '../../app/config';
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName,
  // StudentMethod,
  StudentModel,
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

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required!'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required!'],
      unique: true,
      ref: 'User',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `;
});



//!query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});
// studentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   // console.log(this);
//   next();
// });
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<IStudent, StudentModel>('Student', studentSchema);

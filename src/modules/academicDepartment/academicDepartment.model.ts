import { model, Schema } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';

const academicDepartment = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartments',
  academicDepartment,
);

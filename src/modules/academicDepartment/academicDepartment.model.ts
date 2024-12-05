import { model, Schema } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../app/errors/AppError';

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
      ref: 'AcademicFaculties',
    },
  },
  {
    timestamps: true,
  },
);



academicDepartment.pre('save', async function (next) {
  const doesDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (doesDepartmentExists) {
    throw new AppError(404, 'Department already exists');
  }
  next();
});

academicDepartment.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const doesDepartmentExists = await AcademicDepartment.findOne({
    _id: query,
  });

  if (!doesDepartmentExists) {
    throw new AppError(404, 'Department does not exist');
  }
  console.log(query);
  // next()
});

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartments',
  academicDepartment,
);

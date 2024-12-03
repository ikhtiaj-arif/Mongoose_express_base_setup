import { model, Schema } from 'mongoose';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';
import { IAcademicSemester } from './accademicSemester.interface';

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCodes,
      required: true,
    },
    year: { type: String, required: true },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//document middleware
AcademicSemesterSchema.pre('save', async function (next) {
  //check if the same year consists of the same semester name
  const semesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (semesterExists) {
    throw new Error('Semester already exists');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);

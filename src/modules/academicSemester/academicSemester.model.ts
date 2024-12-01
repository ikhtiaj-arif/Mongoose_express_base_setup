import { model, Schema } from 'mongoose';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';
import { IAcademicSemester } from './accademicSemester.interface';

const AcademicSemesterSchema = new Schema<IAcademicSemester>({
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
  year: { type: Date, required: true },
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
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);

import AppError from '../../app/errors/AppError';
import { academicSemesterNameMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './accademicSemester.interface';

const createAcademicSemesterInToDB = async (payload: IAcademicSemester) => {
  //semester name --> code are similar or not? Autumn will be 01, summer will be 02, fall will be 03

  if (academicSemesterNameMapper[payload.name] !== payload.code) {
    throw new AppError(404, 'Invalid Semester Code!');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};
const updateAcademicSemesterFromDB = async (
  semesterId: string,
  payload: Partial<IAcademicSemester>,
) => {
  //semester name --> code are similar or not? Autumn will be 01, summer will be 02, fall will be 03

  if (
    payload.code &&
    payload.name &&
    academicSemesterNameMapper[payload.name] !== payload.code
  ) {
    throw new AppError(404, 'Invalid Semester Code!');
  }

  const result = await AcademicSemester.findByIdAndUpdate(semesterId, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInToDB,
  getAllAcademicSemestersFromDB,
  getAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};

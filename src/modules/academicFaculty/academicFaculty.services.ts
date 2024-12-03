import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyInToDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};
const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<IAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(facultyId, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyInToDB,
  getAcademicFacultyFromDB,
  getAllAcademicFacultiesFromDB,
  updateAcademicFacultyFromDB,
};

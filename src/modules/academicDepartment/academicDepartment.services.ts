import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentInToDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getAcademicDepartmentFromDB = async (DepartmentId: string) => {
  const result = await AcademicDepartment.findById(DepartmentId).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentFromDB = async (
  DepartmentId: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: DepartmentId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentInToDB,
  getAcademicDepartmentFromDB,
  getAllAcademicDepartmentsFromDB,
  updateAcademicDepartmentFromDB,
};

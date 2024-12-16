import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultyFromDB = async () => {
  const result = Faculty.find().populate('academicDepartment');
  return result;
};
const getOneFacultyFromDB = async (facultyID: string) => {
  const result = Faculty.findById(facultyID).populate('academicDepartment');
  return result;
};
const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdatedFacultyData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedFacultyData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(
    id,
    modifiedUpdatedFacultyData,
    {
      new: true,
      runValidators: true,
    },
  );

  return result
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getOneFacultyFromDB,
  updateFacultyIntoDB,
};

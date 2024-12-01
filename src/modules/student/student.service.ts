import { IStudent } from './student.interface';
import { Student } from './student.model';



const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getOneStudentFromDB = async (id: string) => {
  // const result = Student.findOne({ id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
 
  getAllStudentsFromDB,
  getOneStudentFromDB,
  deleteStudentFromDB,
};

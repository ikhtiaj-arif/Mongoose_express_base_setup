import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: IStudent) => {
  const result = await Student.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getOneStudentFromDB = async (id: string) => {
  const result = Student.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getOneStudentFromDB,
};

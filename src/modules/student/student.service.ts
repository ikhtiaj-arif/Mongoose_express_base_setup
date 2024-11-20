import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData?.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(studentData); //built in static methods
  return result;
  //   const student = new Student(studentData); //create an instance

  //   if (await student.isUserExists(studentData?.id)) {
  //     throw new Error('User already exists!');
  //   }
  //   const result = await student.save(); //build in instance method
};

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getOneStudentFromDB,
  deleteStudentFromDB,
};

import { unescape } from 'querystring';
import config from '../../app/config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IAcademicSemester } from '../academicSemester/accademicSemester.interface';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { INewUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (payload: IStudent, password: string) => {
  //create a user object
  const userData: Partial<INewUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';



  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData); //built in static methods

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id
  }

  //create student
  const newStudent = await Student.create(payload);
  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};

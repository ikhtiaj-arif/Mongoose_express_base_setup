import config from '../../app/config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { INewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (studentData: IStudent, password: string) => {
  //create a user object
  const userData: Partial<INewUser> = {};
  
  //if password not given use default password
  userData.password = password || config.default_password as string;

  //set student role
  userData.role = 'student';

  //set generated id
  userData.id = '20300001'

  //create a user
  const newUser = await User.create(userData); //built in static methods

  //create a student
  if(Object.keys(newUser).length){
    //set id, _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id //reference id
  }

  //create student
  const newStudent = await Student.create(studentData)
  return newStudent

};

export const UserServices = {
  createStudentIntoDB,
};

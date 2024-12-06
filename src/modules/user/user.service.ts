import mongoose from 'mongoose';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session }); //built in static methods

    //create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user!');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    //create student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
  }
};

export const UserServices = {
  createStudentIntoDB,
};

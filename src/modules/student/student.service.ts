import mongoose from 'mongoose';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  console.log('baseQuery', query);
  const queryObj = { ...query };

  //{ email: { $regex : query.searchTer,. $options: i }}
  //{ 'name.firstName': { $regex : query.searchTer,. $options: i }}
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  //filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];

  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // .populate('user');

  let sort = '-createdAt';

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery =  filterQuery.sort(sort);

let limit =1 
if(query.limit){
  limit = query.limit as number
}
 
const limitQuery = await sortQuery.limit(limit)


  return limitQuery;
};

const getOneStudentFromDB = async (id: string) => {
  // const result = Student.findOne({ id: id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  console.log(id);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};
const updateStudentIntoDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getOneStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};

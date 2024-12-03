import { IAcademicSemester } from '../academicSemester/accademicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  //2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  //first time 0000

  let currentId = (0).toString(); //0000 default
  const lastStudentId = await findLastStudentId();
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year
  if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentYear) {
    currentId = lastStudentId.substring(6) //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  console.log(incrementId);

  return incrementId;
};

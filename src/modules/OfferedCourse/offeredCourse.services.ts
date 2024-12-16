import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  //!check if the semester registration exists!
  const {
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegExists) {
    throw new AppError(400, 'Semester Registration not found!');
  }

  const academicSemester = isSemesterRegExists?.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(400, 'Academic Faculty not found!');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(400, 'Academic Department not found!');
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(400, 'Course not found!');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(400, 'Faculty not found!');
  }

  //! check if the department belongs to the academic faculty
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      400,
      `The ${isAcademicDepartmentExists?.name} doesn't belong to the ${isAcademicFacultyExists?.name}!`,
    );
  }

  //! check if the same offeredCourse and same section exists in same registered semester

  const isOfferedCourseExistsWithSameSectionExistsInSameRegisteredSemester =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isOfferedCourseExistsWithSameSectionExistsInSameRegisteredSemester) {
    throw new AppError(400, `Offered Course with same section already exists!`);
  }

  //! get the schedules of the faculties and compare if the time and day conflicts or not
  //find schedules according to the same day using $in days
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newScheduled = { days, startTime, endTime };


  if (hasTimeConflict(assignedSchedules, newScheduled)) {
    throw new AppError(
      409,
      `This Faculty is not available at the selected time, please select new time!`,
    );
  }

  // console.log(assignedSchedules);
  // return null;
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};

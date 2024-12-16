import { Router } from 'express';
import { AcademicDepartmentRoutes } from '../../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.routes';
import { AdminRoutes } from '../../modules/admin/admin.routes';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { CourseRoutes } from '../../modules/course/course.routes';
import { FacultyRoutes } from '../../modules/faculty/faculty.routes';
import { OfferedCourseRoutes } from '../../modules/OfferedCourse/offeredCourse.router';
import { SemesterRegistrationRoutes } from '../../modules/semesterRegistration/semesterRegistration.routes';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRoutes } from '../../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/admins', route: AdminRoutes },
  { path: '/courses', route: CourseRoutes },
  { path: '/semester-registrations', route: SemesterRegistrationRoutes },
  { path: '/offered-courses', route: OfferedCourseRoutes },
  { path: '/auth', route: AuthRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

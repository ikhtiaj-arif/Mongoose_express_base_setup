import { Router } from 'express';
import { AcademicDepartmentRoutes } from '../../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.routes';
import { FacultyRoutes } from '../../modules/faculty/faculty.routes';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRoutes } from '../../modules/user/user.routes';
import { AdminRoutes } from '../../modules/admin/admin.routes';
import { CourseRoutes } from '../../modules/course/course.routes';
import { SemesterRegistrationRoutes } from '../../modules/semesterRegistration/semesterRegistration.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

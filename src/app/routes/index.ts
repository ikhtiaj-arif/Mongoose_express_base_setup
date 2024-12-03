import { Router } from 'express';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.routes';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRoutes } from '../../modules/user/user.routes';
import { AcademicFacultyRoutes } from '../../modules/academicFaculty/academicFaculty.routes';

const router = Router();

const moduleRoutes = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

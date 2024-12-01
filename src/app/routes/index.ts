import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.routes';
import { StudentRoutes } from '../../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

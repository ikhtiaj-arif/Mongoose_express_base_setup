import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { studentValidations } from '../student/student.zod.validation';
import { userControllers } from './user.controller';

const router = express.Router();

const { createStudent } = userControllers;
const { createStudentValidationSchema } = studentValidations;

router.post(
  '/students/create-student',
  ValidateRequest(createStudentValidationSchema),
  createStudent,
);

export const UserRoutes = router;

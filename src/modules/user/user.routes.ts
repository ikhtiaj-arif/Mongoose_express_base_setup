import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.zodValidation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidations } from '../student/student.zod.validation';
import { userControllers } from './user.controller';

const router = express.Router();

const { createStudent, createFaculty, createAdmin } = userControllers;
const { createStudentValidationSchema } = studentValidations;

router.post(
  '/students/create-student',
  ValidateRequest(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-faculty',
  ValidateRequest(createFacultyValidationSchema),
  createFaculty,
);

router.post(
  '/create-admin',
  ValidateRequest(createAdminValidationSchema),
  createAdmin,
);

export const UserRoutes = router;

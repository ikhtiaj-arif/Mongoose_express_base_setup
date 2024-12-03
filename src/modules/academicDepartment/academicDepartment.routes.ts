import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

const {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} = AcademicDepartmentValidation;

const {
  createAcademicDepartment,
  getAcademicDepartment,
  getAllAcademicDepartments,
  updateAcademicDepartment,
} = AcademicDepartmentControllers;

router.post(
  '/create-academic-department',
  ValidateRequest(createAcademicDepartmentValidationSchema),
  createAcademicDepartment,
);
router.get('/', getAllAcademicDepartments);

router.get('/:departmentId', getAcademicDepartment);

router.patch(
  '/:departmentId',
  ValidateRequest(updateAcademicDepartmentValidationSchema),
  updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;

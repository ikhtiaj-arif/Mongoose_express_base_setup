import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.zod.validation';

const router = express.Router();

const { createAcademicSemesterValidationSchema, updateAcademicSemesterValidationSchema } = AcademicSemesterValidations;

const {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
} = AcademicSemesterControllers;

router.post(
  '/create-academic-semester',
  ValidateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);
router.get('/', getAllAcademicSemesters);

router.get('/:semesterId', getAcademicSemester);

router.patch('/:semesterId',   ValidateRequest(updateAcademicSemesterValidationSchema), updateAcademicSemester);

export const AcademicSemesterRoutes = router;

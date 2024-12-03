import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

const {
  updateAcademicFacultyValidationSchema,
  createAcademicFacultyValidationSchema,
} = AcademicFacultyValidation;

const {
  createAcademicFaculty,
  getAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
} = AcademicFacultyControllers;

router.post(
  '/create-academic-faculty',
  ValidateRequest(createAcademicFacultyValidationSchema),
  createAcademicFaculty,
);
router.get('/', getAllAcademicFaculties);

router.get('/:facultyId', getAcademicFaculty);

router.patch(
  '/:facultyId',
  ValidateRequest(updateAcademicFacultyValidationSchema),
  updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;

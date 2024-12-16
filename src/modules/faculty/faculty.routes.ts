import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import auth from '../../app/middlewears/auth';

const router = express.Router();

const { getAllFaculty, getOneFaculty, updateFaculty } = FacultyController;

router.get('/',auth(), getAllFaculty);
router.get('/:id', getOneFaculty);
router.patch(
  '/:id',
  ValidateRequest(FacultyValidation.updateFacultyValidationSchema),
  updateFaculty,
);

export const FacultyRoutes = router;

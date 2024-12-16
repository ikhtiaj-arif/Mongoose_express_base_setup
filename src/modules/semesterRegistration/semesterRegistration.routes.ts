import express from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

const {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getOneSemesterRegistration,
  updateSemesterRegistration,
} = SemesterRegistrationControllers;

router.post(
  '/create-semester-registration',
  ValidateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  createSemesterRegistration,
);

router.get('/:id', getOneSemesterRegistration);

router.patch(
  '/:id',
  ValidateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  updateSemesterRegistration,
);

router.get('/', getAllSemesterRegistration);

export const SemesterRegistrationRoutes = router;

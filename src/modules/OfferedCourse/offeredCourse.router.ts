import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';


const router = express.Router();

const {
createOfferedCourse
} = OfferedCourseControllers;

router.post(
  '/create-offered-course',
  ValidateRequest(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  createOfferedCourse,
);

router.get('/:id', );

// router.patch(
//   '/:id',
//   ValidateRequest(
//   ),
//   ,
// );

router.get('/', );

export const OfferedCourseRoutes = router;

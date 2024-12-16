import express from 'express';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getOneCourse,
  deleteOneCourse,
  updateCourse,
  removeFacultiesFromCourse,
  assignFacultiesWithCourse,
} = CourseControllers;

router.post(
  '/create-course',
  //   ValidateRequest(CourseValidations.createCourseValidationSchema),
  createCourse,
);
router.get('/', getAllCourses);
router.get('/:id', getOneCourse);
router.delete('/:id', deleteOneCourse);
router.patch(
  '/:id',
  ValidateRequest(CourseValidations.updateCourseValidationSchema),
  updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  ValidateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  removeFacultiesFromCourse,
);

export const CourseRoutes = router;

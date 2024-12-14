import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendREsponse';
import { CourseServices } from './course.services';

const {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getOneCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
} = CourseServices;

const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is created successfully!',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved all courses successfully!',
    data: result,
  });
});
const getOneCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await getOneCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved course successfully!',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;

  const result = await updateCourseIntoDB(id, course);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated course successfully!',
    data: result,
  });
});

const deleteOneCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted course successfully!',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await assignFacultiesWithCourseIntoDB(courseId, faculties);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Assigned Faculties to Course successfully!',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await removeFacultiesWithCourseFromDB(courseId, faculties);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Removed faculty successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getOneCourse,
  deleteOneCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendREsponse';
import catchAsync from '../../app/utils/catchAsync';



const createStudent = catchAsync(async (req, res, next) => {
  const { student, password } = req.body;

  //!creating schema validation using zod
  //   const zodParsedData = studentValidationSchema.parse(student);
  //   console.log(zodParsedData);

  const result = await UserServices.createStudentIntoDB(student, password);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res, next) => {

  const { faculty, password } = req.body;

  const result = await UserServices.createFacultyIntoDB(faculty, password);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res, next) => {

  const { admin, password } = req.body;

  const result = await UserServices.createAdminIntoDB(admin, password);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
});



export const userControllers = {
  createStudent,createFaculty,createAdmin
};

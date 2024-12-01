import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendREsponse';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { student, password } = req.body;

    //!validation using Joi for student data
    // const { error, value } = studentValidationSchema.validate(student);
    // if (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   });
    // }

    //!creating schema validation using zod
    //   const zodParsedData = studentValidationSchema.parse(student);
    //   console.log(zodParsedData);

    const result = await UserServices.createStudentIntoDB(student, password);

    // res.status(200).json({
    //   success: true,
    //   message: 'student is created successfully!',
    //   data: result,
    // });
    sendResponse(res, {
      success: true,
      statusCode: 200,
      data:result
    } )
  } catch (error: any) {
    next(error)
  }
};

export const userControllers = {
  createStudent,
};

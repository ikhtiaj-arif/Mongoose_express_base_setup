import { Request, Response } from 'express';

import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    //validation using Joi for student data
    const { error, value } = studentValidationSchema.validate(student);

    const result = await studentServices.createStudentIntoDB(value);

    if (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'student is created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Retrieved all students data!',
      data: result,
    });
  } catch (error) {}
};

const getOneStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentServices.getOneStudentFromDB(studentId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Retrieved student data!',
        data: result,
      });
    } else {
      res.status(305).json({
        success: true,
        message: 'Invalid user id!',
      });
    }
  } catch (error) {}
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getOneStudent,
};

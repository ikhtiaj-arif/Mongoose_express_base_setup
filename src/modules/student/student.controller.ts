import { NextFunction, Request, Response } from 'express';

import { studentServices } from './student.service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Retrieved all students data!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentServices.deleteStudentFromDB(studentId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully!',
        data: result,
      });
    } else {
      res.status(305).json({
        success: true,
        message: 'Invalid user id!',
      });
    }
  } catch (error) {
    next(error);
  }
};

export const studentControllers = {
  // createStudent,
  getAllStudents,
  getOneStudent,
  deleteStudent,
};

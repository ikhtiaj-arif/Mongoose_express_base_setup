import catchAsync from '../../app/utils/catchAsync';
import { studentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: 'Retrieved all students data!',
    data: result,
  });
});

const getOneStudent = catchAsync(async (req, res) => {
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
});

const deleteStudent = catchAsync(async (req, res) => {
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
});

export const studentControllers = {
  // createStudent,
  getAllStudents,
  getOneStudent,
  deleteStudent,
};

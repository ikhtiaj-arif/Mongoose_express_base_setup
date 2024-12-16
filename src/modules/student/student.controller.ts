import catchAsync from '../../app/utils/catchAsync';
import { studentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await studentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Retrieved all students data!',
    data: result,
  });
});

const getOneStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
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

const updateOneStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const { student } = req.body;

  const result = await studentServices.updateStudentIntoDB(studentId, student);

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

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.id;
  const result = await studentServices.deleteStudentFromDB(studentId);

  if (result) {
    res.status(200).json({
      success: true,
      message: 'Student updated successfully!',
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
  updateOneStudent,
};

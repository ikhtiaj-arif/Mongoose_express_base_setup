import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

const { getAllStudents, getOneStudent, deleteStudent,updateOneStudent } = studentControllers;
//will call controller function
// router.post('/create-student', studentControllers.createStudent);
router.get('/', getAllStudents);
router.get('/:studentId', getOneStudent);
router.patch('/:studentId', ValidateRequest(studentValidations.updateStudentValidationSchema),updateOneStudent);
router.delete('/:studentId', deleteStudent);

export const StudentRoutes = router;

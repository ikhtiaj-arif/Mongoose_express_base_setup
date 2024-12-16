import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequest from '../../app/middlewears/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

const { getAllStudents, getOneStudent, deleteStudent,updateOneStudent } = studentControllers;
//will call controller function
// router.post('/create-student', studentControllers.createStudent);
router.get('/', getAllStudents);
router.get('/:id', getOneStudent);
router.patch('/:id', ValidateRequest(studentValidations.updateStudentValidationSchema),updateOneStudent);
router.delete('/:id', deleteStudent);

export const StudentRoutes = router;

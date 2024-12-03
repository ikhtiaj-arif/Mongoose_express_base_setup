import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

const { getAllStudents, getOneStudent, deleteStudent } = studentControllers;
//will call controller function
// router.post('/create-student', studentControllers.createStudent);
router.get('/', getAllStudents);
router.get('/:studentId', getOneStudent);
router.delete('/:studentId', deleteStudent);

export const StudentRoutes = router;

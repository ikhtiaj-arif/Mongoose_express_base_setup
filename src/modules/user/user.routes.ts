import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

router.post('/students/create-student', userControllers.createStudent)

export const UserRoutes = router
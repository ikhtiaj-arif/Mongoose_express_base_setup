import express from 'express'
import ValidateRequest from '../../app/middlewears/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'


const router = express.Router()

router.post('/login', ValidateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

export const AuthRoutes = router
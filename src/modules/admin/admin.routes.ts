import express from 'express'
import { AdminControllers } from './admin.controller'

const router = express.Router()

const {getAllAdmins,getOneAdmin,updateOneAdmin} = AdminControllers

router.get('/', getAllAdmins)
router.get('/:id', getOneAdmin)
router.patch('/:id', updateOneAdmin)

export const AdminRoutes =  router
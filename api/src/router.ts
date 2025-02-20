import express from 'express'
import StudentController from './student/StudentController'
const router = express.Router()

const studentPath = '/students'

router.get(studentPath, StudentController.findAll)
router.get(`${studentPath}/:ra`, StudentController.find)
router.post(studentPath, StudentController.create)
router.patch(`${studentPath}/:ra`, StudentController.update)
router.delete(`${studentPath}/:ra`, StudentController.remove)

export default router
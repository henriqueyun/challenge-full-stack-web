import express from 'express'
import StudentController from './student/StudentController'
const router = express.Router()

const studentPath = '/students'
router.get(`${studentPath}/:ra`, StudentController.find)
router.get(studentPath, StudentController.findAll)
router.post(studentPath, StudentController.create)
router.patch(studentPath, StudentController.update)
router.delete(studentPath, StudentController.remove)

export default router
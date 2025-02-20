import { Request, Response } from 'express'
import { fromError } from 'zod-validation-error'
import StudentService from './StudentService'
import CreateStudentDTO from './CreateStudentDTO'
import StudentValidate from './StudentValidate'

const findAll = async (_: Request, res: Response) => {
    const students = await StudentService.findAll()
    res.json(students)
}
const find = async (req: Request, res: Response) => {
    res.send()
}
const create = async (req: Request, res: Response) => {
    const payload: CreateStudentDTO = req.body
    if (!payload) {
        res.status(400).json({ message: 'send a payload'})
        return
    }

    const result = StudentValidate.CreateStudentDTO.safeParse(payload)

    if (!result.success) {
        res.status(400).json({ message: fromError(result.error)})
        return
    }

    const student = await StudentService.create(payload)
    res.status(201).json(student)
}

const update = async (_: Request, res: Response) => {
    res.send()
}

const remove = async (_: Request, res: Response) => {
    res.send()
}

export default {
    findAll,
    find,
    create,
    update,
    remove
}


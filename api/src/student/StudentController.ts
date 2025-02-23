import { Request, Response } from 'express'
import StudentService from './StudentService'
import StudentDTO from './StudentDTO'
import StudentValidate from './StudentValidate'
import { Prisma } from '@prisma/client'
import handleUniqueFieldsError from './error/handleUniqueFieldsError'

const findAll = async (_: Request, res: Response) => {
    try {
        const students = await StudentService.findAll()
        res.json(students)
    } catch (err) {
        console.error(err)
        res.send(500)
    }
}

const find = async (req: Request, res: Response) => {
    const ra: number = parseInt(req.params.ra)

    if (!ra) {
        res.status(400).json({ message: 'o parâmetro ra do path deve ser um inteiro'})
        return
    }

    try {
        const student = await StudentService.find(ra)
        if (!student) {
            res.status(409).json({ message: `o estudante de ${ra} não foi encontrado`})
            return
        }
        res.json(student)
    } catch (err) {
        console.error(err)
        res.send(500)
    }
}
const create = async (req: Request, res: Response) => {
    const payload: StudentDTO = req.body
    if (!payload) {
        res.status(400).json({ message: 'envie um payload'})
        return
    }

    const result = StudentValidate.CreateStudentDTO.safeParse(payload)

    if (!result.success) {
        res.status(400).json({ error: result.error})
        return
    }

    try {
        const student = await StudentService.create(payload)
        res.status(201).json(student)
    } catch (err) {
        console.error(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            handleUniqueFieldsError(err, res)
            return
        }
        res.send(500)
    }
}

const update = async (req: Request, res: Response) => {
    const ra = parseInt(req.params.ra)

    if (!ra) {
        res.status(400).json({ message: 'o parâmetro ra do path deve ser um inteiro'})
        return
    }
    
    const payload: StudentDTO = req.body

    if (!payload) {
        res.status(400).json({ message: 'envie um payload'})
        return
    }

    const result = StudentValidate.UpdateStudentDTO.safeParse(payload)

    if (!result.success) {
        res.status(400).json({ error: result.error})
        return
    }

    try {

        const updated = await StudentService.update(ra, payload)
        if (!updated) {
            res.status(400).json({ message: `o estudante de ${ra} não foi encontrado`})
            return
        }
        res.json(updated)
    } catch (err) {
        console.error(err)
        res.send(500)
    }
}

const remove = async (req: Request, res: Response) => {
    const ra: number = parseInt(req.params.ra)

    if (!ra) {
        res.status(400).json({ message: 'o parâmetro ra do path deve ser um inteiro'})
        return
    }

    try {
        const student = await StudentService.remove(ra)
        if (!student) {
            res.status(409).json({ message: `o estudante de ${ra} não foi encontrado`})
            return
        }
        res.json(student)
    } catch (err) {
        console.error(err)
        res.send(500)
    }
}

export default {
    findAll,
    find,
    create,
    update,
    remove
}


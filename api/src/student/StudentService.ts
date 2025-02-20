import { Student } from '@prisma/client'
import prisma from '../prisma'
import CreateStudentDTO from './CreateStudentDTO'

const findAll = async () => {
    const students = await prisma.student.findMany()
    return students
}

const find = async (ra: number) => {
    // TODO: check what find UNIQUE does (it might be be null)
    const student = await prisma.student.findUnique({ where: { ra }})
    return student
}

const create = async (payload: CreateStudentDTO) => {
    const student = await prisma.student.create({ data: payload})
    return student
}

const update = async (ra: number, payload: Student) => {
    const found = await find(payload.ra)
    if (!found) {
        return null
    }

    const updated = await prisma.student.update({
        where: {
            ra: payload.ra
        },
        data: {
            ...payload,
            ra: found.ra
        }
    })

    return updated
}


const remove = async (ra: number) => {
    const deleted = await prisma.student.delete({ where: { ra }})
    return deleted
}

export default {
    findAll,
    find,
    create,
    update,
    remove
}
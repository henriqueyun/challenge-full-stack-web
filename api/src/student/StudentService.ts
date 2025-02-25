import prisma from '../prisma'
import StudentDTO from './StudentDTO'

const findAll = async () => {
    const students = await prisma.student.findMany()
    return students
}

const find = async (ra: number) => {
    // TODO: check what find UNIQUE does (it might be be null)
    const student = await prisma.student.findUnique({ where: { ra }})
    return student
}

const create = async (payload: StudentDTO) => {
    const student = await prisma.student.create({ data: payload })
    return student
}

const update = async (ra: number, payload: StudentDTO) => {
    const found = await find(ra)
    if (!found) {
        return null
    }

    const updated = await prisma.student.update({
        where: {
            ra
        },
        data: {
            ...payload,
            cpf: found.cpf,
            ra 
            // guarantees that cpf couldn't be updated
        }
    })

    return updated
}


const remove = async (ra: number) => {
    const found = await find(ra)
    if (!found) {
        return null
    }

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
import { Prisma } from '@prisma/client'
import { Response } from 'express'

export default async function handleUniqueFieldsError(err: Prisma.PrismaClientKnownRequestError, res: Response) {
    const UNIQUE_CONSTRAINT_FAILED = 'P2002'

    if (err.code === UNIQUE_CONSTRAINT_FAILED) {
        let fields = 'Campos únicos'
        if (err.meta && err.meta.target) {
        const targetFields = err.meta.target as string[] 
        fields = targetFields.join(',')
        }
        res.status(409).json({ message: `${fields} já cadastrado`})
    }
}
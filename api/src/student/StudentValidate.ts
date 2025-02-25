import * as validator from 'cpf-cnpj-validator'

const isCPFValid = validator.cpf.isValid

import { z } from 'zod'

const CreateStudentDTO = z.object({
    name: z.string({
        required_error: 'O nome é obrigatório'
    }),
    cpf: z.string({
        required_error: 'O cpf é obrigatório'
    }).refine((cpf: string) => {
        return isCPFValid(cpf)
    }, 'Formato do CPF inválido'),
    email: z.string({
        required_error: 'O e-mail é obrigatório'
    }).email({
        message: 'Formato do e-mail inválido'
    })
}).refine(
    (data) => !('ra' in data),
    {
      message: 'O ra não deve estar presente no cadastro',
      path: ['email'], // Define o caminho do erro
    }
  )

const UpdateStudentDTO = z.object({
    name: z.string({
        required_error: 'O nome é obrigatório',
    }).nullish(),
    email: z.string({
        required_error: 'O e-mail é obrigatório'
    }).email({
        message: 'Formato do e-mail inválido'
    }).nullish()
})


export default { CreateStudentDTO, UpdateStudentDTO }
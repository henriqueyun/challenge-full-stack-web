import CreateStudentDTO from "../types/CreateStudentDTO"

const create = async (data: CreateStudentDTO) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return response
}

const update = async (ra: string | number, data: CreateStudentDTO) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${ra}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return response
}

const remove = async (ra: string | number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${ra}`,
        {
            method: 'DELETE',
        }
    )
    return response
}

const findAll = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students`,
        {
            method: 'GET',
        }
    )
    return response
}

const find = async (ra: string | number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${ra}`,
        {
            method: 'GET',
        }
    )
    return response
}

export default {
    create,
    update,
    remove,
    findAll,
    find
}
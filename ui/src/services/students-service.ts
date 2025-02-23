import Student from "../types/Student"

const create = async (data: Student) => {
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

const findAll = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students`,
        {
            method: 'GET',
        }
    )
    return response
}

export default {
    create,
    findAll
}
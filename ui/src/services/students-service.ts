import Student from "../types/Student"

const create = async (data: Student) => {
    const response = await fetch(import.meta.env.VITE_API_URL,
        {
            method: 'POST',
            body: JSON.stringify(data)
        }
    )

    return response
}

export default {
    create
}
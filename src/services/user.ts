import { api } from "./http"


export const getUser = async (id: string) => {
    const response = await api.get(`/user/${id}`)
    const data = response.data

    return data
}
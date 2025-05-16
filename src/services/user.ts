import { api } from "./http"


export const getUser = async (id: string) => {
    const response = await api.get(`/usuario/${id}`)
    const data = response.data

    return data
}
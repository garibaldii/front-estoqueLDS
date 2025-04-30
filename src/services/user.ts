import { api } from "./http"

export const getUser = async (email: string) => {
    const response = await api.get(`/usuario/${email}`)
    const data = response.data
    
    return data
}
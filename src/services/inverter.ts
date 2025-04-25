import { api } from "./http";

export const getInverters = async () => {
    const response = await api.get("/inversor")

    const data = response.data

    return data
}

export const postInverters = async (inverters: any[]) => {
    const response = await api.post("/inversor", inverters)

    const data = response.data
    
    return data
}
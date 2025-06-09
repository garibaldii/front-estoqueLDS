import { api } from "./http";

export const getInverters = async () => {
    const response = await api.get("/inverter")

    const data = response.data

    return data
}

export const postInverters = async (inverters: any[]) => {
    const response = await api.post("/inverter", inverters)

    const data = response.data
    
    return data
}
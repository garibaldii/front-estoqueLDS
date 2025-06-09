import { api } from "./http";

export const postOrder = async (order: any) => {
    const response = await api.post("/order", order)

    const data = response.data

    return data
}


export const getOrders = async () => {
    const response = await api.get("/order")

    const data = response.data

    return data
}
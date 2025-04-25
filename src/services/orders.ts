import { api } from "./http";

export const postOrder = async (order: any) => {
    const response = await api.post("/pedido", order)

    const data = response.data

    return data
}


export const getOrders = async () => {
    const response = await api.get("/pedido")

    const data = response.data

    return data
}
import { api } from "./http";

export const getInverters = async () => {
    const response = await api.get("/inversor")

    const data = response.data

    return data
}
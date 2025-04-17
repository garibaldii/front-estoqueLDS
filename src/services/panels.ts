import { api } from "./http";

export const getPanels = async () => {
    const response = await api.get("/painel")

    const data = response.data

    return data
}
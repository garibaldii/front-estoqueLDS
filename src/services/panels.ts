import { api } from "./http";

export const getPanels = async () => {
    const response = await api.get("/painel")

    const data = response.data

    return data
}

export const postPanels = async (panels: any[]) => {
    const response = await api.post("/painel", panels)

    const data = response.data

    return data
}
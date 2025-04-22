import { api } from "./http";

export const getPanels = async () => {
    const response = await api.get("/painel")

    const data = response.data

    return data
}

export const postPanels = async (panel: any) => {
    const response = await api.post("/painel", panel)

    const data = response.data

    return data
}
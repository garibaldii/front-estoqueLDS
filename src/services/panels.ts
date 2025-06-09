import { api } from "./http";

export const getPanels = async () => {
    const response = await api.get("/panel")

    const data = response.data

    return data
}

export const postPanels = async (panels: any[]) => {
    const response = await api.post("/panel", panels)

    const data = response.data

    return data
}
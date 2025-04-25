import { api } from "./http"


export const getProduct = async (codigoDeBarras: string) => {
    const response = await api.get(`/produto/${codigoDeBarras}`)

    const data = response.data
    return data
}
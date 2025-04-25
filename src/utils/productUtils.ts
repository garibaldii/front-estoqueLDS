import { getProduct } from "@/services/product"

export const fetchProductByCode = async (codigoDeBarras: string) => {
    try {
        const data = await getProduct(codigoDeBarras)
        return data.produto
    } catch (error) {
        return error
    }
}

export const isInputValid = (marca: string, modelo: string, codigoDeBarras: string, potencia: string) => {
    return !!marca && !!modelo && !!codigoDeBarras && !!potencia
}

const isNumberInput = (input: string) => {
    return /^\d+$/.test(input);

}
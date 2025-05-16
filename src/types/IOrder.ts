import { Product } from "./IProduct"

export interface Order{
    codigoPedido: string,
    listaProdutos: Product[]
    dataSaida: string
}
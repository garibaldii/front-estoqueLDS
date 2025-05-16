"use client"
import { useRef, useState } from "react"

import { ProductTable } from "@/components/molecules/ProductTable"
import { AlertModal } from "@/components/molecules/AlertModal"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { postOrder } from "@/services/orders"

import { isInputValid } from "@/utils/orderUtils"
import { fetchProductByCode } from "@/utils/productUtils"
import { alreadyExist } from "@/utils/localProductData"
import ClearListButton from "@/components/atoms/ClearListButton"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/types/IProduct"

export const OrderForm = () => {

    const [codigoPedido, setCodigoPedido] = useState("")
    const [codigoDeBarras, setCodigoDeBarras] = useState("")
    const [listaProdutos, setListaProdutos] = useState<Product[]>([])

    const [alertModal, setAlertModal] = useState<null | { title: string; description: string }>(null)
    const { toast } = useToast()

    const codigoRef = useRef<HTMLInputElement>(null)

    const handleAddLocalData = async () => {

        if (isInputValid(codigoDeBarras, codigoPedido)) {

            //fetch producty by barcode
            const product: Product = await fetchProductByCode(codigoDeBarras)

            if (!product) {

                toast({
                    title: "Erro",
                    variant: "destructive",
                    description: `Produto não encontrado em estoque`
                })

                setCodigoDeBarras("")
                return
            }

            if (alreadyExist(product, listaProdutos)) {

                toast({
                    title: "Erro",
                    variant: "destructive",
                    description: `Código de barras "${codigoDeBarras}" já adicionado à lista`
                })

                setCodigoDeBarras("")
                return
            }

            //add product in the list of products of the order
            setListaProdutos(prevData => [product, ...prevData])
            setCodigoDeBarras("")
            codigoRef.current?.focus()
        }

        else {
            toast({
                title: "Erro",
                variant: "destructive",
                description: `Todos os campos são obrigatórios`
            })
            return
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!listaProdutos.length) {
            toast({
                title: "Erro",
                variant: "destructive",
                description: `Lista de produtos vazia, tente adicionar primeiro`
            })
            return
        }
        try {
            const order = {
                codigoPedido,
                listaProdutos
            }

            await postOrder(order)

            setAlertModal({
                title: "Sucesso",
                description: "Pedido Registrado com Sucesso!"
            })

            setListaProdutos([])
        } catch (error: any) {
            setAlertModal({
                title: "Erro",
                description: error.response.data.message
            })
        }
    }

    return (
        <div className="flex w-full">

            <form
                onSubmit={handleSubmit}
                className="bg-white/50 rounded-2xl  w-full flex flex-col h-full max-h-[90vh] overflow-hidden"
            >

                <div className="p-6 flex flex-col flex-grow overflow-y-auto">
                    <Input
                        type="text"
                        placeholder="Código do Pedido"
                        className="font-mono mb-6 focus:border-gray-500"
                        onChange={(e) => setCodigoPedido(e.target.value)}
                        value={codigoPedido}
                    />

                    <div className="flex items-center rounded-md bg-gray-200 px-4 py-2 mb-6 w-full">

                        <Input
                            type="text"
                            placeholder="Código de Barras"
                            className="font-mono focus:border-gray-500"
                            onChange={(e) => setCodigoDeBarras(e.target.value)}
                            value={codigoDeBarras}
                            ref={codigoRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleAddLocalData()
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="text-green-500 font-bold font-mono hover:underline ml-4"
                            onClick={handleAddLocalData}
                        >
                            BUSCAR
                        </button>
                    </div>

                    <div className="mb-6">
                        <ProductTable
                            localData={listaProdutos}
                            setLocalData={setListaProdutos}
                        />
                    </div>

                    <ClearListButton setLocalData={setListaProdutos} />


                    <Button type="submit" className="w-full font-mono bg-green-500 text-md">
                        Concluir
                    </Button>
                </div>
            </form>



            {alertModal && (
                <AlertModal
                    onClose={() => setAlertModal(null)}
                    title={alertModal.title}
                    description={alertModal.description}
                    hasBackDrop={true}
                />
            )}

           
        </div>
    )
}


export default OrderForm
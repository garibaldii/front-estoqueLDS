"use client"
import { useRef, useState } from "react"

import { GoBackButton } from "@/components/atoms/GoBackButton"
import { ProductTable } from "@/components/molecules/ProductTable"
import { Modal } from "@/components/molecules/Modal"
import { Toast } from "@/components/molecules/Toast"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { postOrder } from "@/services/orders"

import { isInputValid } from "@/utils/orderUtils"
import { addToastMessage } from "@/utils/toastUtilities"
import { fetchProductByCode } from "@/utils/productUtils"
import { alreadyExist } from "@/utils/localProductData"
import ClearListButton from "@/components/atoms/ClearListButton"

export const Orders = () => {

    const [codigoPedido, setCodigoPedido] = useState("")
    const [codigoDeBarras, setCodigoDeBarras] = useState("")
    const [listaProdutos, setListaProdutos] = useState<any>([])

    const [modal, setModal] = useState<null | { title: string; description: string }>(null)
    const [toastMessages, setToastMessages] = useState<string[]>([])

    const codigoRef = useRef<HTMLInputElement>(null)

    const handleAddLocalData = async () => {

        if (isInputValid(codigoDeBarras, codigoPedido)) {

            //fetch producty by barcode
            const product = await fetchProductByCode(codigoDeBarras)

            if (!product) {
                addToastMessage(setToastMessages, `Produto não encontrado em estoque`)
                setCodigoDeBarras("")
                return
            }

            if (alreadyExist(product, listaProdutos)) {
                addToastMessage(setToastMessages, `Código de barras "${codigoDeBarras} já adicionado na lista"`)
                setCodigoDeBarras("")
                return
            }

            //add product in the list of products of the order
            setListaProdutos((prevData: any) => [product, ...prevData])
            setCodigoDeBarras("")
            codigoRef.current?.focus()
        }

        else {
            addToastMessage(setToastMessages, `Todos os campos são obrigatórios`)
            return
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!listaProdutos.length) {
            addToastMessage(setToastMessages, `Lista de produtos vazia, tente adicionar primeiro`)
            return
        }
        try {
            const order = {
                codigoPedido,
                listaProdutos
            }

            await postOrder(order)

            setModal({
                title: "Sucesso",
                description: "Pedido Registrado com Sucesso!"
            })

            setListaProdutos([])
        } catch (error: any) {
            setModal({
                title: "Erro",
                description: error.response.data.message
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <GoBackButton />
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl max-w-5xl w-1/2 flex flex-col h-full max-h-[90vh] overflow-hidden"
            >
                <header className="bg-gray-300 text-center p-5 font-bold rounded-t-2xl text-xl font-mono">
                    <h1>Saída de Pedidos</h1>
                </header>

                <div className="p-6 flex flex-col flex-grow overflow-y-auto">
                    <Input
                        type="text"
                        placeholder="Código do Pedido"
                        className="font-mono mb-6"
                        onChange={(e) => setCodigoPedido(e.target.value)}
                        value={codigoPedido}
                    />

                    <div className="flex items-center rounded-md bg-gray-200 px-4 py-2 mb-6 w-full">

                        <Input
                            type="text"
                            placeholder="Código de Barras"
                            className="font-mono "
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



            {modal && (
                <Modal
                    onClose={() => setModal(null)}
                    title={modal.title}
                    description={modal.description}
                />
            )}

            <Toast
                messages={toastMessages}
                onRemoveMessage={(index) => {
                    setToastMessages((prevMessages) =>
                        prevMessages.filter((_, i) => i !== index)
                    )
                }}
            />
        </div>
    )
}


export default Orders
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"


import { ProductTable } from "../molecules/ProductTable"
import { Toast } from "../atoms/toast"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { alreadyExist } from "@/utils/localProductData"
import ArrowBack from "../../../public/arrowBack"
import { SucessModal } from "../atoms/SucessModal"
import { ErrorModal } from "../atoms/ErrorModal"


export const ProductForm = ({ submitFunction }: any) => {
    const router = useRouter()

    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [codigoDeBarras, setCodigoDeBarras] = useState("")
    const [potencia, setPotencia] = useState("")

    const codigoRef = useRef<HTMLInputElement>(null)

    const [toastMessages, setToastMessages] = useState<string[]>([])

    const [errorModal, setErrorModal] = useState<null | { title: string; description: string }>(null)
    const [sucessModal, setSucessModal] = useState(false)

    const [localData, setLocalData] = useState<any>([])

    const handleAddLocalData = () => {
        if (!marca || !modelo || !codigoDeBarras || !potencia) {

            setToastMessages((prevMessages) => [
                ...prevMessages,
                `Todos os campos são obrigatórios!`
            ])

            return
        }

        const newProduct = {
            marca,
            modelo,
            codigoDeBarras,
            potencia
        }

        if (alreadyExist(newProduct, localData)) {
            setToastMessages((prevMessages) => [
                ...prevMessages,
                `Código de Barras: "${newProduct.codigoDeBarras}" duplicado, nao foi adicionado a lista`
            ])

            setCodigoDeBarras("")
            codigoRef.current?.focus()
            return
        }

        setLocalData((prevData: any) => [newProduct, ...prevData])
        setCodigoDeBarras("")
        codigoRef.current?.focus()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await submitFunction(localData)
            console.log(result)
            setSucessModal(true)
        } catch (error: any) {
            setErrorModal({
                title: "Erro",
                description: error.response.data.message
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4">

            <div
                className="absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={() => router.back()}
            >
                <ArrowBack className="w-6 h-6" />
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl max-w-5xl flex flex-col h-full max-h-[90vh] overflow-hidden"
            >
                <header className="bg-gray-300 text-center p-5 font-bold rounded-t-2xl text-xl font-mono">
                    <h1>Cadastro de Painéis Fotovoltaicos ☀️</h1>
                </header>

                <div className="p-6 flex flex-col flex-grow overflow-y-auto">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-6 font-mono">
                        <Input
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Marca"
                            onChange={(e) => setMarca(e.target.value)}
                            value={marca}
                        />
                        <Input
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Modelo"
                            onChange={(e) => setModelo(e.target.value)}
                            value={modelo}
                        />
                        <Input
                            type="number"
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Potência"
                            value={potencia}
                            onChange={(e) => setPotencia(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center rounded-md bg-gray-200 px-4 py-2 mb-6 w-full">
                        <Input
                            type="text"
                            placeholder="Código de Barras"
                            className="font-mono"
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
                            ADICIONAR
                        </button>
                    </div>




                    <div className="mb-6">
                        <ProductTable localData={localData} />
                    </div>

                    <Button type="submit" className="w-full font-mono bg-green-500 text-md">
                        Concluir
                    </Button>
                </div>
            </form>

            {sucessModal && <SucessModal
                onClose={() => setSucessModal(false)}
                title={"Sucesso!"}
                description={"Entrada Realizada com Sucesso!"} />}

            {errorModal && (
                <ErrorModal
                    onClose={() => setErrorModal(null)}
                    title={errorModal.title}
                    description={errorModal.description}
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

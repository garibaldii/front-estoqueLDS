"use client"

import { useState, useRef } from "react"

import { ProductTable } from "../molecules/ProductTable"
import { useToast } from "@/hooks/use-toast"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { alreadyExist } from "@/utils/localProductData"

import { AlertModal } from "../molecules/AlertModal"
import { GoBackButton } from "../atoms/GoBackButton"
import { isInputValid } from "@/utils/productUtils"
import ClearListButton from "../atoms/ClearListButton"
import { Product } from "@/types/IProduct"


type ProductFormProps = {
    submitFunction: (data: Product[]) => Promise<any>;
    title: string;
    extraFields?: React.ReactNode
    extraFieldsData?: Record<any, any>
};

export const ProductForm = ({ submitFunction, title, extraFields: extraField, extraFieldsData: extraFieldData }: ProductFormProps) => {

    const { toast } = useToast()

    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [codigoDeBarras, setCodigoDeBarras] = useState("")
    const [potencia, setPotencia] = useState(0)

    const codigoRef = useRef<HTMLInputElement>(null)

    const [alertModal, setAlertModal] = useState<null | { title: string; description: string }>(null)

    const [localData, setLocalData] = useState<Product[]>([])

    const handleAddLocalData = () => {
        if (isInputValid(marca, modelo, codigoDeBarras, potencia)) {


            //Recolhe os dados do produto
            const newProduct: Product = {
                marca,
                modelo,
                codigoDeBarras,
                potencia,
                ...extraFieldData
            }

            //verifica existência na lista local
            if (alreadyExist(newProduct, localData)) {


                toast({
                    title: "Erro",
                    variant: "destructive",
                    description: `Código de barras "${codigoDeBarras}" já adicionado na lista`
                })

                setCodigoDeBarras("")
                return
            }

            //adiciona a lista
            setLocalData(prev => [...prev, newProduct])

            //limpa código de barras
            setCodigoDeBarras("")

            //foca no input para a próxima leitura
            codigoRef.current?.focus()
            return
        }

        toast({
            title: "Erro",
            variant: "destructive",
            description: `Todos os campos são obrigatórios!`
        })
        return
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(localData)

        if (!localData.length) {
            toast({
                title: "Erro",
                variant: "destructive",
                description: `Lista de Produtos vazia, tente adicionar primeiro`
            })
            return
        }

        try {
            const result = await submitFunction(localData)
            console.log(result)

            setAlertModal({
                title: "Sucesso!",
                description: result.message
            })
            setLocalData([])

        } catch (error: any) {
            setAlertModal({
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
                className="bg-white rounded-2xl max-w-5xl flex flex-col h-full max-h-[90vh] overflow-hidden"
            >
                <header className="bg-gray-300 text-center p-5 font-bold rounded-t-2xl text-xl font-mono">
                    <h1>{title}</h1>
                </header>

                <div className="p-6 flex flex-col flex-grow overflow-y-auto">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-6 font-mono">
                        <Input
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Marca"
                            onChange={(e) => setMarca(e.target.value)}
                            value={marca}
                            required
                        />
                        <Input
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Modelo"
                            onChange={(e) => setModelo(e.target.value)}
                            value={modelo}
                            required
                        />
                        <Input
                            type="number"
                            className="bg-gray-200 w-[25%] focus:bg-white"
                            placeholder="Potência"
                            value={potencia}
                            onChange={(e) => setPotencia(Number(e.target.value))}
                            required
                        />

                        {extraField}
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
                        <ProductTable localData={localData} setLocalData={setLocalData} />
                    </div>

                    <ClearListButton setLocalData={setLocalData} />


                    <Button type="submit" className="w-full font-mono bg-green-500 text-md mt-3">
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

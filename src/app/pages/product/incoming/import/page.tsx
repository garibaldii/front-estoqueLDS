'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

import Image from "next/image"

import { NavBar } from "@/components/organisms/NavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ActionModal } from "@/components/molecules/ActionModal"
import ArrowBack from "../../../../../../public/arrowBack"

import { postFile } from "@/services/file"
import ProductInventoryDataTable from "@/components/organisms/datatable/_components/product-inventory-datatable"
import { groupByKeys } from "@/utils/filters"


const Import = () => {

    const router = useRouter()

    const [confirmationModal, setConfirmationModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)

    const [error, setError] = useState<any>([])

    const [file, setFile] = useState<File | null>(null)
    const [importedProducts, setImportedProducts] = useState<any>([])




    const handleDownloadFile = () => {
        const link = document.createElement("a")
        link.href = `${process.env.NEXT_PUBLIC_API_URL}/file/download`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleSubmitFile = async () => {
        try {
            if (!file) return alert("Nenhum arquivo selecionado, tente novamente")
            const result = await postFile(file)

            if (result) {
                setConfirmationModal(false)
                setSuccessModal(true)

                //dados dos produtos do excel
                setImportedProducts(result.response)
                console.log(result.response)
                return
            }
            return
        } catch (error: any) {
            setError(error)
            alert(error.response.data.message)
            console.log(error)
            setErrorModal(true)
        }
    }


    return (
        <div className="flex flex-col h-screen">
            <NavBar />

            <div className="flex flex-col items-center">
                <div className="flex-1 p-10 flex flex-col  justify-center w-full">

                    <div className="flex">
                        <div>
                            <ArrowBack width={30} className="rounded-full  transition-colors duration-300 cursor-pointer hover:bg-slate-50 " onClick={() => router.back()} />
                        </div>
                        <p className="ml-2 mb-6 text-lg hover:underline hover:cursor-pointer" onClick={() => router.back()}>Produtos</p>
                    </div>
                    <h1 className="font-bold text-3xl mb-6 text-gray-700 ">Importar Planilha</h1>

                    <div className="flex items-center  bg-white rounded-lg shadow-md text-gray-800 overflow-hidden ">
                        {/* Bloco de Instruções */}
                        <div className="flex-1 p-8 text-xl text-gray-700 flex flex-col justify-center">
                            <p className="mb-10 ">
                                Siga os passos abaixo para importar seus produtos usando uma planilha.
                            </p>

                            <div className="mb-10">
                                <p>· Primeiro Passo:</p>
                                <p className="mb-2">Clique no botão de baixar planilha modelo abaixo e preencha os dados.</p>
                                <Button
                                    className="w-2/5 p-6 text-lg bg-[#0086FF] hover:bg-[#3181c7]"
                                    onClick={() => handleDownloadFile()}
                                >
                                    Baixar planilha modelo
                                </Button>
                            </div>

                            <div className="mb-8">
                                <p>· Segundo Passo:</p>
                                <p className="mb-2">Importe a planilha com os dados que você preencheu.</p>
                                <Button
                                    className="w-2/5 p-6 text-lg bg-green-600 hover:bg-green-700"
                                    onClick={() => setConfirmationModal(true)}
                                >
                                    Importar planilha
                                </Button>
                            </div>
                        </div>

                        {/* Imagem à direita */}
                        <div className="relative w-1/3 h-[100%]">
                            <Image
                                src="/excel.jpg"
                                alt="Upload Illustration"
                                fill
                                className="object-cover"
                            />
                        </div>



                        {confirmationModal && (
                            <ActionModal
                                open={true}
                                onClose={() => setConfirmationModal(false)}
                                onSubmit={() => handleSubmitFile()}
                                title={"Subir planilha para o estoque"}
                                description={
                                    <div className="flex flex-col items-center gap-4">
                                        <p>Baixe a <b>planilha modelo</b> e carregue com os dados preenchidos
                                        </p>
                                        <Input
                                            type="file"
                                            accept=".xlsx,.xls"
                                            className="mb-10 h-20 flex cursor-pointer hover:bg-gray-100"
                                            onChange={(e) => {
                                                const selectedFile = e.target.files?.[0]
                                                if (selectedFile) setFile(selectedFile)
                                            }}
                                        />

                                    </div>}
                            />
                        )}

                        {successModal && (
                            <ActionModal
                                open={true}
                                onClose={() => setSuccessModal(false)}
                                onSubmit={() => router.push("/pages/product")}
                                title={"Produtos Importados com Sucesso! 🎉🥳"}
                                description={
                                    <div className="flex gap-4 max-w-6xl">
                                        {importedProducts.panelData.length > 0 && (
                                            <div>
                                                <h1>Painéis</h1>
                                                {/* Filtra os dados para que sejam exibidos os produtos cadastrados de forma agrupada */}
                                                <ProductInventoryDataTable
                                                    products={groupByKeys(importedProducts.panelData, ["marca", "modelo", "potencia"])}
                                                />
                                            </div>
                                        )}

                                        {importedProducts.inverterData.length > 0 && (
                                            <div>
                                                <h1>Inversores</h1>
                                                <ProductInventoryDataTable
                                                    products={groupByKeys(importedProducts.inverterData, ["marca", "modelo", "potencia"])}
                                                />
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        )}


                        {errorModal && (
                            <ActionModal
                                open={true}
                                onClose={() => setErrorModal(false)}
                                onSubmit={() => setErrorModal(false)}
                                title={`${error.response.data.message} ❌`}
                                description={
                                    <div className="flex flex-col gap-2 max-w-6xl">
                                        {error.response.data.info.map((erro: any, index: number) => (
                                            <div key={index} className="p-2 border rounded bg-red-50">
                                                {Object.entries(erro).map(([chave, valor]) => (
                                                    <p key={chave}>
                                                        <strong>{chave}:</strong> {String({valor})}
                                                    </p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                }
                            />
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Import

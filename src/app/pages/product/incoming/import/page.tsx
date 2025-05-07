'use client'

import { NavBar } from "@/components/organisms/NavBar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ArrowBack from "../../../../../../public/arrowBack"

const Import = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />

            <div className="flex flex-col items-center">
                <div className="flex-1 p-10 flex flex-col  justify-center w-[90%]">

                    <div className="flex">
                        <div className=" hover:bg-black">
                            <ArrowBack width={30} />
                        </div>
                        <p className="ml-2 mb-6 text-lg hover:underline hover:cursor-pointer">Inventário de Produtos</p>
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
                                <Button className="w-2/5 p-6 text-lg bg-[#0086FF] hover:bg-[#3181c7]">
                                    Baixar planilha modelo
                                </Button>
                            </div>

                            <div className="mb-8">
                                <p>· Segundo Passo:</p>
                                <p className="mb-2">Importe a planilha com os dados que você preencheu.</p>
                                <Button className="w-2/5 p-6 text-lg bg-green-600 hover:bg-green-700">
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Import

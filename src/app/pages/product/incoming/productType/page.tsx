"use client"

import { useRouter } from "next/navigation"
import { NavBar } from "@/components/organisms/NavBar"

import { Button } from "@/components/ui/button"
import RightArrow from "../../../../../../public/rightArrow"
import ArrowBack from "../../../../../../public/arrowBack"

const ProductTypeDecisor = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col flex-1">
            <NavBar />

            <div className="p-10">


                <div className="flex">
                    <div>
                        <ArrowBack width={30} className="rounded-full  transition-colors duration-300 cursor-pointer hover:bg-slate-50 " onClick={() => router.back()} />
                    </div>
                    <p className="ml-2 mb-6 text-lg hover:underline hover:cursor-pointer" onClick={() => router.back()}>Produtos</p>
                </div>
                <h1 className="font-bold text-3xl mb-6 text-gray-700 ">Cadastrar Produtos Manualmente</h1>


                <div className="flex flex-col bg-white rounded-lg w-full shadow-md">
                    <div className="flex">
                        <h1 className="font-bold text-2xl p-6">Qual opção deseja cadastrar?</h1>
                    </div>
                    <div className="flex flex-col  ">

                        {/* Linha Painel */}
                        <div
                            className="flex justify-between items-center w-full p-6 cursor-pointer border-t-2 hover:bg-gray-100"
                            onClick={() => router.push("/pages/product/incoming/panel")}>

                            <div >
                                <h1 className="text-xl">Painel</h1>
                                <p className="text-gray-600">Cadastro de painéis fotovoltaicos</p>
                            </div>

                            <Button size={"icon"} variant={"default"} >
                                <RightArrow />
                            </Button>
                        </div>

                        {/* Linha Inversor */}
                        <div
                            className="flex justify-between items-center w-full p-6 border-t-2 cursor-pointer hover:bg-gray-100 "
                            onClick={() => router.push("/pages/product/incoming/inverter")}>

                            <div>
                                <h1 className="text-xl">Inversor</h1>
                                <p className="text-gray-600">Cadastro de inversores fotovoltaicos</p>
                            </div>

                            <Button size={"icon"} variant={"default"} >
                                <RightArrow />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProductTypeDecisor

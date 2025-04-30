'use client'

import ProductDataTable from "@/components/organisms/datatable/_components/product-datatable"
import { NavBar } from "@/components/organisms/NavBar"

import { useInverter } from "@/context/InverterContext"
import { usePanel } from "@/context/PanelContext"

import { countModelQuantity, groupByKeys } from "@/utils/filters"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const Inventory = () => {

    const { panels, refreshPanelData } = usePanel()
    const { inverters, refreshInverterData } = useInverter()

    const router = useRouter()

    //formatar os dados para melhor visualização
    const filteredPanels = groupByKeys(panels, ["marca", "modelo", "potencia",])
    const filteredInverters = groupByKeys(inverters, ["marca", "modelo", "potencia"])


    const [range, setRange] = useState([100, 400])

    useEffect(() => {
        refreshInverterData()
        refreshPanelData()
    }, [])

    return (
        <div className="flex flex-col flex-1">

            <NavBar />

            <div>
                <div className="flex items-center p-6">
                    <h1 className="flex flex-col  gap-8 w-full flex-1 font-bold text-2xl font ">Catálogo de Produtos</h1>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <div className="bg-blue-500 font-bold text-white border rounded-lg px-4 py-3 text-left hover:bg-blue-600 cursor-pointer">
                                Novo Cadastro
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuItem onClick={() => router.push("/pages/product/incoming/productType")}>
                                Cadastrar Manualmente
                                <DropdownMenuShortcut className="w-2/5">Cadastro manual, serão lidos os painéis via código de barras</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Subir Planilha de Produtos
                                <DropdownMenuShortcut className="w-2/5">Cadastro em lote, preencher planilha e subir na plataforma</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <main className="flex gap-8 w-full  rounded-lg p-6">

                    <div className="bg-custom-lds-blur w-1/2 ">
                        <h1>Painéis</h1>
                        <p>Modelos Cadastrados: {countModelQuantity(filteredPanels)}</p>
                        <div className="flex">

                            <Input placeholder="Marca"></Input>
                            <Input placeholder="Status do estoque: Disponível, Reservado, Baixo Estoque..."></Input>
                            <Input placeholder="Data de Cadastro"></Input>
                            <Input placeholder="Observações"></Input>
                        </div>
                        <ProductDataTable products={filteredPanels} />
                    </div>

                    <div className="bg-custom-lds-blur w-1/2">
                        <h1>Inversores</h1>
                        <p>Modelos Cadastrados: {countModelQuantity(filteredInverters)} </p>

                        <ProductDataTable products={filteredInverters} />
                    </div>
                </main>
            </div>
        </div>
    )

}




export default Inventory
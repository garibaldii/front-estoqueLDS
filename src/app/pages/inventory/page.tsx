'use client'

import { ProductTable } from "@/components/molecules/ProductTable"
import ProductDataTable from "@/components/organisms/datatable/_components/product-datatable"
import { NavBar } from "@/components/organisms/NavBar"

import { useInverter } from "@/context/InverterContext"
import { usePanel } from "@/context/PanelContext"

import { groupByKeys } from "@/utils/filters"
import { useEffect } from "react"

const Inventory = () => {

    const { panels, refreshPanelData } = usePanel()
    const { inverters, refreshInverterData } = useInverter()

    //formatar os dados para melhor visualização
    const filteredPanels = groupByKeys(panels, ["marca", "modelo", "potencia",])
    const filteredInverters = groupByKeys(inverters, ["marca", "modelo", "potencia"])


    useEffect(() => {
        refreshInverterData()
        refreshPanelData()
    }, [])

    return (
        <div className="flex flex-col flex-1">

            <NavBar />

            <main className="flex flex-1 items-center justify-center gap-8 w-full  rounded-lg p-6">

                <div className="bg-custom-lds-blur w-1/2 ">
                    <h1>Painéis</h1>

                    <ProductDataTable products={filteredPanels} />
                </div>

                <div className="bg-custom-lds-blur w-1/2">
                    <h1>Inversores</h1>

                    <ProductDataTable products={filteredInverters} />
                </div>
            </main>
        </div>
    )

}




export default Inventory
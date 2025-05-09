'use client'

import OrderDataTable from "@/components/organisms/datatable/_components/orders-datatable"
import { NavBar } from "@/components/organisms/NavBar"
import { useOrder } from "@/context/OrderContext"
import { useEffect } from "react"

export const OutputHistory = () => {

    const { orders, refreshOrderData } = useOrder()

    useEffect(() => {
        refreshOrderData()

    }, [])

    return (
        <div className="flex flex-col flex-1">
            <NavBar />

            <main className="flex flex-1 items-center justify-center gap-8 w-full  rounded-lg p-6">
                <div className="bg-custom-lds-blur w-1/2 ">
                    <h1>Histórico de Saída de Pedidos</h1>

                    <OrderDataTable orders={orders} />
                </div>
            </main>
        </div>
    )
}


export default OutputHistory
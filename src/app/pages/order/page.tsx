'use client'

import OrderDataTable from "@/components/organisms/datatable/_components/orders-datatable"
import { NavBar } from "@/components/organisms/NavBar"
import { useOrder } from "@/context/OrderContext"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import OrderForm from "@/components/organisms/OrderForm"





export const OutputHistory = () => {

    const { orders, refreshOrderData } = useOrder()

    const [orderForm, setOrderForm] = useState(false)


    useEffect(() => {
        refreshOrderData()

    }, [])

    return (
        <div className="flex flex-col flex-1">
            <NavBar />

            <main className=" items-center justify-center w-full  rounded-lg px-3 ">

                <div className="flex items-center p-6 gap-4 w-full">
                    <h1 className="font-bold text-2xl whitespace-nowrap">Pedidos</h1>

                    <div className="flex-grow border-t-2 border-gray-500"></div>

                    <Button
                        className={orderForm ? "bg-red-500 font-semibold text-[16px] text-white rounded-lg px-6 py-6 hover:bg-red-600" : "bg-blue-500 font-semibold text-[16px] text-white rounded-lg px-6 py-6 hover:bg-blue-600"}
                        onClick={() => setOrderForm(!orderForm)}
                    >
                        {/* troca o título do botao com base no estado do orderForm */}
                        {orderForm ? "Ver Estoque" : "Novo Pedido"}
                    </Button>
                </div>

                {!orderForm && (<div className="bg-custom-lds-blur w-full ">
                    <h1>Histórico de Saída de Pedidos</h1>

                    <OrderDataTable orders={orders} />
                </div>)}

                {orderForm && (
                    <OrderForm />
                )}

            </main>
        </div>
    )
}


export default OutputHistory
'use client'

import { createContext, useState, useEffect, useContext, ReactNode } from "react"

import { getOrders } from "@/services/orders"
import { Order } from "@/types/IOrder"

type OrderContextType = {
    orders: Order[]
    loading: boolean
    refreshOrderData: () => void
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const ordersData = await getOrders()
            setOrders(ordersData.orders)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    return (
        <OrderContext.Provider value={{ orders, loading, refreshOrderData: fetchData }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const context = useContext(OrderContext)

    if (!context) throw new Error("useOrder must be used within OrderProvider!")

    return context
}
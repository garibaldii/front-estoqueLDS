'use client'

import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react";

import { DataTable } from "@/components/ui/datatable"
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/molecules/AlertModal";

import { Order } from "../../../../types/IOrder";

import { formatDateToBrasila_BR_Time } from "@/utils/date";
import ProductDataTable from "./product-datatable";

interface Props {
    orders: Order[]
}

export default function OrderDataTable({ orders }: Props) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    

    //memoriza em memória cache apenas uma vez as colunas, e as renderiza caso tenha mudança no pedido selecionado
    const columns = useMemo<ColumnDef<Order>[]>(() => [
        {
            accessorKey: "codigoPedido",
            header: "Código do Pedido",
            cell: ({ row }) => {
                return <div>{row.getValue("codigoPedido")}</div>
            }
        },
        {
            accessorKey: "listaProdutos",
            header: "Conteúdo do Pedido",
            cell: ({ row }) => {
                const order = row.original as Order
                return (
                    <Button
                        variant="ghost"
                        onClick={() => setSelectedOrder(order)}
                    >
                        Ver Materiais
                    </Button>
                )
            }
        },
        {
            accessorKey: "dataSaida",
            header: "Data/Hora de Separação",
            cell: ({ row }) => {

                const formattedDate = formatDateToBrasila_BR_Time(row.getValue("incomindDate"))

                return <div>{formattedDate}</div>
            }
        }
    ], [setSelectedOrder])


  


    return (
        <>
            <DataTable
                columns={columns}
                data={orders}
                pageSize={10}
                searchFields={['codigoPedido', 'dataSaida']}
            />

            {selectedOrder && (
                <AlertModal
                    title={selectedOrder.codigoPedido}
                    description={
                        <ProductDataTable products={selectedOrder.listaProdutos} />
                    }
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </>
    )
}

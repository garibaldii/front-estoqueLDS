'use client'

import { ColumnDef } from "@tanstack/react-table"

import { Order } from "../_interfaces/order";
import { DataTable } from "@/components/ui/datatable"

import { ArrowUpDown } from "lucide-react"

const columns: ColumnDef<Order>[] = [
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
            return <div>{row.getValue("listaProdutos[0]")}</div>
        }
    },
    {
        accessorKey: "dataSaida",
        header: "Data/Hora de Separação",
        cell: ({ row }) => {
            return <div>{row.getValue("dataSaida")}</div>
        }

    }
]

interface Props {
    orders: Order[]
}

export default function OrderDataTable({ orders: orders }: Props) {
    return <DataTable columns={columns} data={orders} pageSize={10} searchFields={['codigoPedido', 'dataSaida']} />
}
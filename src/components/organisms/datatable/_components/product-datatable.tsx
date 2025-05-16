'use client'

import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/datatable"
import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import { Product } from "../../../../types/IProduct"


const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "marca",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Marca
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "modelo",
        header: "Modelo",
        cell: ({ row }) => {
            return <div>{row.getValue("modelo")}</div>
        }
    },

    {
        accessorKey: "potencia",
        header: "Potência",
        cell: ({ row }) => {
            return <div>{row.getValue("potencia")}</div>
        }
    },
    {
        accessorKey: "codigoDeBarras",
        header: "Código de Barras",
        cell: ({ row }) => {
            return <div>{row.getValue("codigoDeBarras")}</div>
        }
    }

]

interface Props {
    products: Product[]
    searchFields?: string[]
}


export default function ProductDataTable({ products, searchFields }: Props) {

    return <DataTable columns={columns} data={products} pageSize={5} searchFields={searchFields} />
}
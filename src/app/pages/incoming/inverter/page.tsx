'use client'

import { useState } from "react"

import { ProductForm } from "@/components/organisms/ProductForm"
import { postInverters } from "@/services/inverter"
import { Input } from "@/components/ui/input"



export const InverterRegister = () => {
    const [tensao, setTensao] = useState("")

    return (
        <ProductForm
            title={"Cadastro de Inversores Fotovoltaicos"}
            submitFunction={postInverters}
            extraFields={
                <>
                    <Input
                        placeholder="Tensão de Operação"
                        className="bg-gray-200 w-[25%] focus:bg-white"
                        value={tensao}
                        onChange={(e) => setTensao(e.target.value)}
                    />
                </>
            }
            extraFieldsData={{tensao}}
        />
    )
}



export default InverterRegister
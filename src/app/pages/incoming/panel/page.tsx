"use client"

import { ProductForm } from "@/components/organisms/ProductForm"
import { postPanels } from "@/services/panels"

export const PanelRegister = () => {


    return(
        <ProductForm 
        title="Cadastro de Painéis Fotovoltaicos"
        submitFunction ={postPanels} />
        
    )
}


export default PanelRegister
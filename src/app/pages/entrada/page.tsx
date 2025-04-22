"use client"

import { ProductForm } from "@/components/organisms/ProductForm"
import { postPanels } from "@/services/panels"

export const Entrada = () => {


    return(
        <ProductForm submitFunction ={postPanels} />
    )
}


export default Entrada
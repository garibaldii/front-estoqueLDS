export const alreadyExist = (newProduct: any, locaListOfProducts: any[]) => {
    return locaListOfProducts.some(product => product.codigoDeBarras === newProduct.codigoDeBarras)
}


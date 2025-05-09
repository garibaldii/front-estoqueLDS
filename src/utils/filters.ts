export const groupByModel = (data: { modelo: string }[]) => {
    const countMap = data.reduce((acc: Record<string, number>, item) => {
        acc[item.modelo] = (acc[item.modelo] || 0) + 1;
        return acc
    }, {})

    return Object.entries(countMap).map(([modelo, quantidade]) => ({
        modelo,
        quantidade
    }))
}


//agrupa através das chaves que serão explícitas ao chamar o código, 
//exemplo: groupByKeys(carros, ["marca", "modelo", "ano"]), ele irá agrupar numa mesma linha os carros que possuem estes três dados em comum.
export const groupByKeys = <T extends Record<string, any>>(
    data: T[],
    keys: (keyof T)[]
) => {
    const countMap = data.reduce((acc: Record<string, number>, item) => {
        const compositeKey = keys.map(key => item[key]).join("|")
        acc[compositeKey] = (acc[compositeKey] || 0) + 1
        return acc
    }, {})

    return Object.entries(countMap).map(([compositeKey, quantidade]) => {
        const values = compositeKey.split("|")
        const result: any = {}

        // Preencher o objeto com as chaves e valores originais
        keys.forEach((key, index) => {
            result[key] = isNaN(Number(values[index]))
                ? values[index]
                : Number(values[index])
        })

        // Adicionando a quantidade por último
        result.quantidade = quantidade

        return result as T & { quantidade: number }
    })
}

export const countModelQuantity = (data: any[]) => {
    return data.length
}

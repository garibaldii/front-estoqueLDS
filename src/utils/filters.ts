export const groupByModel = (data: {modelo: string}[]) => {
    const countMap = data.reduce((acc: Record<string, number>, item) => {
        acc[item.modelo] = (acc[item.modelo] || 0) + 1;
        return acc
    }, {})

    return Object.entries(countMap).map(([modelo, quantidade]) => ({
        modelo,
        quantidade
    }))
}
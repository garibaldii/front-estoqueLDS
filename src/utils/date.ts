//converte a hora para o horário de Brasília
export const formatDateToBrasila_BR_Time = (dateIso: string) => {
    if (!dateIso || isNaN(Date.parse(dateIso))) throw new Error("Data ISO inválida")

    const date: Date = new Date(dateIso)

    const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }

    return date.toLocaleString("pt-BR", options)
}
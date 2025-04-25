'use client'

import {createContext, useContext, useEffect, useState, ReactNode} from 'react'

import { getInverters } from '@/services/inverter'

type InverterContextType = {
    inverters: any[]
    loading: boolean
    refreshInverterData: () => void
}

export const InverterContext = createContext<InverterContextType | undefined>(undefined)

export const InverterProvider = ({children}: {children: ReactNode}) => {
    const [inverters, setInverters] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const invertersData = await getInverters()
            setInverters(invertersData)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <InverterContext.Provider value={{inverters, loading, refreshInverterData: fetchData}}>
            {children}
        </InverterContext.Provider>
    )
}

export const useInverter = () => {
    const context = useContext(InverterContext)

    if(!context) throw new Error("useInverter must be used within InverterProvider")

    return context
}
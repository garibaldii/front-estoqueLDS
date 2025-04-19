'use client'

import {createContext, useContext, useEffect, useState, ReactNode} from 'react'

import { getPanels } from '@/services/panels'

type PanelContextType = {
    panels: any[]
    loading: boolean
    refreshData: () => void
}

const PanelContext = createContext<PanelContextType | undefined>(undefined)

export const PanelProvider = ({children}: {children: ReactNode}) => {
    const [panels, setPanels] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const panelsData = await getPanels()
            setPanels(panelsData.paineis)
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
        <PanelContext.Provider value={{panels, loading, refreshData: fetchData}}>
            {children}
        </PanelContext.Provider>
    )
}

export const usePanel = () => {
    const context = useContext(PanelContext)

    if(!context) throw new Error("usePanel must be used within PanelProvider")

    return context
}
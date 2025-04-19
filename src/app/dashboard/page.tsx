"use client"

import { useState, useEffect } from "react";

import { Graph } from "../../components/molecules/Graph"
import { NavBar } from "../../components/organisms/NavBar"

import { getPanels } from "@/services/panels";
import { getInverters } from "@/services/inverter";


 const Dashboard = () => {
    const [panels, setPanels] = useState([]) 
    const [inverters, setInverters] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const panelsData = await getPanels()
                const invertersData = await getInverters()

                setPanels(panelsData.paineis)
                setInverters(invertersData)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log(`paineis atualizados: ${JSON.stringify(inverters)}`)
    })

    if (loading) return <p className="text-center mt-10"> Carregando...</p>

    return (
        <div>
            <NavBar />

            <div className="flex justify-center items-center">
                <Graph
                    data={panels}
                />
                <Graph
                    data={inverters}
                />
            </div>

        </div>
    )
}


export default Dashboard    
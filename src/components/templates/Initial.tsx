"use client"

import { useState, useEffect } from "react";

import { Graph } from "../molecules/Graph"
import { NavBar } from "../organisms/NavBar"

import { getPanels } from "@/services/panels";
import { getInverters } from "@/services/inverter";


export const Initial = () => {
    const [panels, setPanels] = useState([])
    const [inverters, setInverters] = useState([])
    const [loading, setLoading] = useState(true)

    const data = [
        { name: 'Jan', uv: 400 },
        { name: 'Feb', uv: 300 },
        { name: 'Mar', uv: 500 },
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const panelsData = await getPanels()
                setInverters(await getInverters())

                setPanels(panelsData)
                console.log(panels)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p className="text-center mt-10"> Carregando...</p>

    return (
        <div>
            <NavBar />

            <div className="flex justify-center items-center">
                <Graph
                    data={data}
                />
                <Graph
                    data={[]}
                />
            </div>

        </div>
    )
}
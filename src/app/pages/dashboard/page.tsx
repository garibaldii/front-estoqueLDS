"use client"

import { Graph } from "../../../components/molecules/Graph"
import { NavBar } from "../../../components/organisms/NavBar"

import { usePanel } from "@/context/PanelContext";
import { useInverter } from "@/context/InverterContext";
import { useEffect } from "react";

const Dashboard = () => {
    const { inverters, loading } = useInverter()
    const { panels, refreshPanelData: refreshData } = usePanel()

    useEffect(() => {refreshData()}, [])

    return (
        <div>
            <NavBar />

            {loading ? (<p className="text-center mt-10"> Carregando...</p>) : (
                <div className="flex justify-center items-center">


                    <Graph
                        data={panels}
                    />
                    <Graph
                        data={inverters}
                    />
                </div>

            )}


        </div>
    )
}


export default Dashboard    
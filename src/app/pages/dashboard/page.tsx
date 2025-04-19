"use client"

import { Graph } from "../../../components/molecules/Graph"
import { NavBar } from "../../../components/organisms/NavBar"

import { usePanel } from "@/context/PanelContext";
import { useInverter } from "@/context/InverterContext";

 const Dashboard = () => {
   
    const {inverters, loading} = useInverter()
    const {panels} = usePanel()


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
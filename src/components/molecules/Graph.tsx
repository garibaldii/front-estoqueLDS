"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


interface GraphProps {
    data: { marca: string, modelo: number }[]; // Definindo o tipo esperado para os dados
}

export const Graph = ({ data }: GraphProps) => { // Desestruturando a propriedade
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
        >
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey='marca' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='modelo' stroke='#8884d8' />
        </LineChart>
    );
}

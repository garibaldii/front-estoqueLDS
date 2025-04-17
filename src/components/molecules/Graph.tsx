"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


interface GraphProps {
    data: { name: string, uv: number }[]; // Definindo o tipo esperado para os dados
}

export const Graph = ({ data }: GraphProps) => { // Desestruturando a propriedade
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
        >
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='uv' stroke='#8884d8' />
        </LineChart>
    );
}

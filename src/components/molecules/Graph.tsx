"use client"

import { groupByModel } from '@/utils/filters';
import {  XAxis, YAxis, Tooltip, CartesianGrid, Bar, BarChart} from 'recharts';

import { useMemo } from 'react';

interface GraphProps {
    data: { marca: string, modelo: string }[]; 

}

export const Graph = ({ data }: GraphProps) => { 

  
  const filteredData = useMemo(() => groupByModel(data), [data]);


    return (
        <BarChart
          width={500}
          height={300}
          data={filteredData} // Passa os dados agrupados
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey={`modelo`} /> {/* Exibe o modelo no eixo X */}
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#8884d8" /> {/* A barra vai mostrar a quantidade */}
        </BarChart>
      );
}

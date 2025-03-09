'use client';
import React, { JSX } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ChartContainer, ChartTooltip } from './ui/chart'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { UfChartProps } from '@/types';


function CustomToolTip({ active, payload, label }: any): JSX.Element | null { 
  if (active && payload && payload.length) {
    return(
      <div className='bg-white p-2 shadow-md rounded-md'>
        <p className='label'>{`${label} : ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value)}`}</p>
      </div>
    )
  }
  return null;
}

function ufchart({data, year = 2024} : UfChartProps) {

  let chartData =  data.find((item) => Number(item.year) === year)?.data
  chartData= chartData?.sort((a,b) => b.total_expenses - a.total_expenses);

  return (
    <Card>
      <CardHeader>
          <CardTitle className='text-2xl'>Gastos Por UF</CardTitle>
            <CardDescription> Dados de {year}</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer  config={{}} className='min-h-[900px] w-full'> 
              <BarChart data={chartData} layout='vertical' >
                <YAxis dataKey="uf" type='category' tickLine={false} axisLine={false} tickMargin={10} className='font-semibold'/>
                <XAxis type='number' dataKey='total_expenses'/>
                <ChartTooltip content={CustomToolTip}/>
                <Bar dataKey="total_expenses"  fill="#8884d8" radius={4} layout='vertical'> 
                  <LabelList
                    dataKey={'total_expenses'}
                    position={'insideRight'}
                    fill={'#fff'}
                    formatter={(value: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default ufchart
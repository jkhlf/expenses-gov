'use client';
import React, { JSX } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ChartContainer, ChartTooltip } from './ui/chart'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { PartyChartProps } from '@/types'

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

function partychart({data, year = 2024} : PartyChartProps) {

  let chartData = data.find((item) => Number(item.year) === year)?.data;
  if(!chartData) return null;
  let partyChartData = chartData.map((item) => {
    return {
      party: item.party,
      total_per_senator: item.total_per_senator
    }
  });

  partyChartData = partyChartData.sort((a,b) => b.total_per_senator - a.total_per_senator);

  return (
    <Card>
      <CardHeader>
          <CardTitle className='text-2xl'>Gastos Por Partido</CardTitle>
            <CardDescription> Dados de {year}</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer  config={{}} className='min-h-[900px] w-full'> 
              <BarChart data={partyChartData} layout='vertical' margin={{left:32}} >
                <YAxis dataKey="party" type='category' tickLine={false} axisLine={false}  className='font-semibold'/>
                <XAxis type='number' dataKey='total_per_senator'/>
                <ChartTooltip content={CustomToolTip}/>
                <Bar dataKey="total_per_senator"  fill="#ffa500" radius={4} layout='vertical'> 
                  <LabelList
                    dataKey={'total_per_senator'}
                    position={'right'}
                    fill={'slate'}
                    formatter={(value: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                  }
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default partychart
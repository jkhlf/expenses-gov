'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryChartProps } from '@/types';

function CategoryChart({ data, party, year }: CategoryChartProps) {
    const filteredData = data.filter(item => {
        return true; 
    });

    const aggregatedData = filteredData.reduce((acc, item) => {
        const existingItem = acc.find(i => i.expense_category === item.expense_category);
        if (existingItem) {
            existingItem.amount = (parseFloat(existingItem.amount) + parseFloat(item.amount)).toString();
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, [] as { expense_category: string; amount: string }[]);

    const chartData = aggregatedData
        .map((item) => ({
            name: item.expense_category,
            value: parseFloat(item.amount),
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15);

    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
        '#D2691E', '#8A2BE2', '#A52A2A', '#FF4040', '#008B8B',
        '#BDB76B', '#4682B4', '#8B008B', '#00CED1', '#556B2F'
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Gastos por Categoria</CardTitle>
                <CardDescription>Dados para o partido {party} no ano de {year}. Troque o partido e o ano como preferir acima.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label={({ name, value }) => `${name}: ${new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(value)}`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(Number(value)),
                                    name,
                                ]}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default CategoryChart;
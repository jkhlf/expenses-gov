'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryChartProps } from '@/types';

function CategoryChart({ data, party, year }: CategoryChartProps) {
    // Filtra os dados para o ano e partido selecionados
    const filteredData = data.filter(item => {
        // Aqui você deve adicionar a lógica para filtrar por ano, se necessário
        return true; // Temporariamente retornando true para todos os dados
    });

    // Remove duplicatas e soma os valores das categorias iguais
    const aggregatedData = filteredData.reduce((acc, item) => {
        const existingItem = acc.find(i => i.expense_category === item.expense_category);
        if (existingItem) {
            existingItem.amount = (parseFloat(existingItem.amount) + parseFloat(item.amount)).toString();
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, [] as { expense_category: string; amount: string }[]);

    // Prepara os dados para o gráfico
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
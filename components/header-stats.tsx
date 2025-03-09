'use client';

import { UfChartProps, PartyChartProps } from "@/types";

interface HeaderStatsProps {
  ufData?: UfChartProps['data'];
  partyData?: PartyChartProps['data'];
  year: number;
  totalSenators: number;
}

export default function HeaderStats({ ufData, partyData, year, totalSenators = 81 }: HeaderStatsProps) {
  const currentYearUfData = ufData?.find(item => Number(item.year) === year)?.data || [];
  const totalExpenses = currentYearUfData.reduce((sum, item) => sum + item.total_expenses, 0);
  
    const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <p className="text-sm text-gray-500">Total Gasto em {year}</p>
        <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <p className="text-sm text-gray-500">Total de Senadores</p>
        <p className="text-xl font-bold">{totalSenators}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <p className="text-sm text-gray-500">Média por Senador</p>
        <p className="text-xl font-bold">{formatCurrency(totalExpenses / totalSenators)}</p>
      </div>
    </div>
  );
}

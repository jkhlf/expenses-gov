'use client';

import { UfChartProps, PartyChartProps } from "@/types";
import type { StatsRowProps} from "@/types";

export default function StatsRow({ ufData, partyData, year, totalSenators = 81 }: StatsRowProps) {
  const currentYearUfData = ufData?.find(item => Number(item.year) === year)?.data || [];
  const totalExpenses = currentYearUfData.reduce((sum, item) => sum + item.total_expenses, 0);
  
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-lg">
        <p className="text-xs text-violet-800 font-medium">Total Gasto em {year}</p>
        <p className="text-xl font-bold text-violet-900">{formatCurrency(totalExpenses)}</p>
      </div>
      
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
        <p className="text-xs text-orange-800 font-medium">Total de Senadores</p>
        <p className="text-xl font-bold text-orange-900">{totalSenators}</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
        <p className="text-xs text-blue-800 font-medium">Média por Senador</p>
        <p className="text-xl font-bold text-blue-900">{formatCurrency(totalExpenses / totalSenators)}</p>
      </div>
    </div>
  );
}

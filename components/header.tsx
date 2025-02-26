'use client';

import React from 'react';
import { Calendar, FlagIcon, Landmark, MapIcon, Wallet, Users, ChevronDown } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

function Header({ year }: { year: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  // Get current view type
  const currentViewType = searchParams.get('type') || 'uf';

  // Navigation items configuration
  const navItems = [
    { icon: MapIcon, label: "Gastos por UF", queryType: "uf", description: "Visualize os gastos por Unidade Federativa" },
    { icon: FlagIcon, label: "Gastos por Partido", queryType: "party", description: "Visualize os gastos por partido político" },
    { icon: Wallet, label: "Gastos por Categorias", queryType: "categories", description: "Visualize os gastos por categorias" },
    { icon: Users, label: "Lista de Senadores", queryType: "senators", description: "Veja a lista de senadores" }
  ];

  return (
    <header className='sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 mb-6 shadow-sm'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-4'>
        {/* Logo and title */}
        <div className='flex items-center gap-4'>
          <div className='bg-violet-100 p-2 rounded-lg'>
            <Link href='/'> 
            <Landmark className="h-5 w-5 text-violet-600" />
            </Link>
          </div>
          <div className="flex flex-col">
            <h1 className='text-xl font-bold mb-0.5 text-gray-800'>Gastos dos Senadores</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-gray-500 flex items-center">
                    Visualização da CEAPS
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </p>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="text-sm">
                    CEAPS é a Cota para o Exercício da Atividade Parlamentar dos Senadores, valor destinado ao ressarcimento de despesas no exercício da atividade parlamentar.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Navigation */}
        <div className='flex items-center gap-3 flex-wrap justify-center'>
          {/* Year selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'>
                <Calendar className="h-6w-6" />
                <span>{year}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuLabel className="text-xs">Escolha o ano</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={year.toString()} onValueChange={(value) => router.push(`${pathname}?${createQueryString('year', value)}`)}>
                {[2024, 2023, 2022, 2021, 2020].map(yearOption => (
                  <DropdownMenuRadioItem key={yearOption} value={yearOption.toString()} className="text-sm">
                    {yearOption}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View type selector */}
          <div className="flex bg-gray-100 p-0.5 rounded-md">
            {navItems.map((item) => {
              const isActive = currentViewType === item.queryType;
              const Icon = item.icon;
              
              return (
                <TooltipProvider key={item.queryType}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={`p-2 rounded-md ${
                          isActive 
                            ? 'bg-white text-violet-600 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => router.push(`${pathname}?${createQueryString('type', item.queryType)}`)}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-sm">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>

          {/* Party selector - only show for categories view */}
          {currentViewType === 'categories' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'>
                  <FlagIcon className="h-6w-6" />
                  <span>{searchParams.get('party') || 'MDB'}</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
                <DropdownMenuLabel className="text-xs">Escolha o Partido</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={searchParams.get('party') || 'MDB'}
                  onValueChange={(value) => router.push(`${pathname}?${createQueryString('party', value)}`)}
                >
                  {["MDB", "PSDB", "PSB", "REPUBLICANOS", "PSD", "UNIÃO", "PT", "PL", "PODEMOS", "PP", "NOVO", "PDT"].map(party => (
                    <DropdownMenuRadioItem key={party} value={party} className="text-sm">
                      {party}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
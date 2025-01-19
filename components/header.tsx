'use client';
import { Calendar, FlagIcon, Landmark, MapIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

function Header({year} : {year: number}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const NavButton = ({ icon: Icon, label, queryType }: { icon: React.ElementType, label: string, queryType: string }) => {
    const isActive = searchParams.get('type') === queryType;

    return (
      <button
        className={`flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg hover:border-violet-400 ${isActive ? 'bg-violet-100' : ''}`}
        onClick={() => router.push(`${pathname}?${createQueryString('type', queryType)}`)}
      >
        <Icon className={isActive ? 'text-violet-400' : ''} />
        {label}
      </button>
    );
  };

  return (
    <header className='mb-12 flex justify-center items-center lg:flex-row flex-col gap-10 lg:justify-between'>
      <div className='flex items-center gap-4'>
        <Landmark height={40} width={40} />
        <div className="flex flex-col ">
          <h1 className='text-3xl font-bold mb-1'>Gastos dos Senadores</h1>
          <p>Gastos dos senadores Total por estado (UF) - CEAPS</p>
        </div>
      </div>

      <nav className='flex gap-6'>
        <div className='border-r-2 pr-6 border-black/10 '>
          <DropdownMenu>
            <DropdownMenuTrigger>
            <button className='flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg hover:border-violet-400'> <Calendar/> Calendario </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Escolha o ano</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={year.toString()} onValueChange={(value) => router.push(`${pathname}?${createQueryString('year', value)}`)}>
              <DropdownMenuRadioItem value={'2024'}>2024</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={'2023'}>2023</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={'2022'}>2022</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={'2021'}>2021</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={'2020'}>2020</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex gap-4'>
          <NavButton icon={MapIcon} label="Gastos por UF" queryType="uf" />
          <NavButton icon={FlagIcon} label="Gastos por Partido" queryType="party" />
        </div>
      </nav>
    </header>
  )
}

export default Header
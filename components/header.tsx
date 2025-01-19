import { Calendar, FlagIcon, Landmark, MapIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import React, { use, useCallback } from 'react'

function header() {
  const searchParams = useSearchParams();

const createQueryString = useCallback((name: string, value: string) => { 
  const params = new URLSearchParams( searchParams.toString() );
  params.set(name, value);
  return params.toString();
}, [searchParams]);



  return (
     <header className='mb-12 flex justify-center items-center lg:flex-row flex-col gap-10 lg:justify-between'>
        <div className='flex items-center gap-4'>  
          <Landmark height={40} width={40}/>
          <div className="flex flex-col ">
            <h1 className='text-3xl font-bold mb-1'>Gastos dos Senadores</h1>
            <p>Gastos dos senadores Total por estado (UF) - CEAPS</p>
          </div>
        </div>

        <nav className='flex gap-6'>
          <div className='border-r-2 pr-6 border-black/10 '>
          <button className='flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg'><Calendar/>Calendario</button></div>

          <div className='flex gap-4'><button className='flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg hover:border-violet-400'><MapIcon className='text-violet-400'/>Gastis por UF</button>
          <button className='flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg hover:border-violet-400'><FlagIcon/>Gastos por Partido</button>
          </div>
        </nav>
      </header>
     
  )
}

export default header
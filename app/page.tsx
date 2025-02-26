import Ufchart from "@/components/uf-chart";
import Header from "@/components/header";
import PartyChart from "@/components/party-chart";
import SenatorList from "@/components/senator-list";
import CategoryChart from "@/components/category-chart";
import ErrorMessage from "@/components/ui/error-message";
import LoadingSpinner from "@/components/ui/loading";
import PageTitle from "@/components/page-title";
import StatsRow from "@/components/stats-row";
import { API_ENDPOINTS } from "@/lib/fetcher";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

// Component to handle data fetching with error handling
async function DataFetcher({
  fetch_function,
  fallback_data,
  error_message
}: {
  fetch_function: () => Promise<any>;
  fallback_data: any;
  error_message: string;
}) {
  try {
    return await fetch_function();
  } catch (error) {
    console.error(error_message, error);
    return fallback_data;
  }
}

export default async function Home({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  try {
    // Await the searchParams promise
    const searchParams = await searchParamsPromise;
    
    const type = searchParams.type;
    const yearParam = searchParams.year;
    const partyParam = searchParams.party;
    
    const expensesType = Array.isArray(type) ? type[0] : (type || 'uf');
    const year = Number(yearParam) || 2024;
    const selectedParty = Array.isArray(partyParam) ? partyParam[0] : (partyParam || 'MDB');

    // Page title and description based on view type
    const pageInfo = {
      'uf': {
        title: 'Gastos por Estado',
        description: 'Visualização dos gastos dos senadores agrupados por estado (UF).'
      },
      'party': {
        title: 'Gastos por Partido',
        description: 'Visualização dos gastos dos senadores agrupados por partido político.'
      },
      'senators': {
        title: 'Lista de Senadores',
        description: 'Relação completa de senadores com informações de contato.'
      },
      'categories': {
        title: `Gastos do ${selectedParty} por Categoria`,
        description: `Distribuição dos gastos do partido ${selectedParty} por categoria de despesa.`
      }
    }[expensesType] || {
      title: 'Gastos dos Senadores',
      description: 'Plataforma de transparência para gastos do Senado Federal'
    };

    // Fetch all data in parallel
    const [ufData, partyData, senatorsData, categoryData] = await Promise.all([
      DataFetcher({
        fetch_function: async () => {
          const res = await fetch(API_ENDPOINTS.ufSummary);
          if (!res.ok) throw new Error('Failed to fetch UF data');
          return res.json();
        },
        fallback_data: [],
        error_message: 'Erro ao buscar dados de UF:'
      }),
      
      DataFetcher({
        fetch_function: async () => {
          const res = await fetch(API_ENDPOINTS.partySummary);
          if (!res.ok) throw new Error('Failed to fetch party data');
          return res.json();
        },
        fallback_data: [],
        error_message: 'Erro ao buscar dados de partido:'
      }),
      
      DataFetcher({
        fetch_function: async () => {
          const res = await fetch(API_ENDPOINTS.senators);
          if (!res.ok) throw new Error('Failed to fetch senators data');
          const data = await res.json();
          return data;
        },
        fallback_data: { data: [] },
        error_message: 'Erro ao buscar dados dos senadores:'
      }),
      
      DataFetcher({
        fetch_function: async () => {
          const res = await fetch(API_ENDPOINTS.partyExpenses(selectedParty, year));
          if (!res.ok) throw new Error('Failed to fetch category data');
          return res.json();
        },
        fallback_data: { data: [] },
        error_message: 'Erro ao buscar dados de categorias:'
      })
    ]);

    return (
      <>
        <Header year={year} />
        <main className="container mx-auto px-4 py-6">
          <PageTitle 
            title={pageInfo.title} 
            description={pageInfo.description}
            year={year}
          />
          
          {/* Only show stats on main views */}
          {(expensesType === 'uf' || expensesType === 'party') && (
            <StatsRow 
              ufData={ufData} 
              partyData={partyData} 
              year={year}
              totalSenators={senatorsData?.data?.length || 81}
            />
          )}
          
          {/* Main content area with box shadow */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              {expensesType === 'uf' && <Ufchart year={year} data={ufData} />}
              {expensesType === 'party' && <PartyChart year={year} data={partyData} />}
              {expensesType === "senators" && <SenatorList data={senatorsData.data || []} />}
              {expensesType === "categories" && (
                <CategoryChart data={categoryData.data || []} party={selectedParty} year={year}/>
              )}
            </Suspense>
          </div>
          
          <footer className="mt-8 text-center text-xs text-gray-500">
            <p>Dados extraídos do portal de transparência do Senado Federal.</p>
            <p className="mt-1">© {new Date().getFullYear()} Expenses Gov</p>
          </footer>
        </main>
      </>
    );
  } catch (error) {
    console.error('Erro geral na aplicação:', error);
    return (
      <>
        <Header year={2024} />
        <main className="container mx-auto px-4 py-6">
          <ErrorMessage 
            message="Ocorreu um erro inesperado na aplicação."
            retry={() => window.location.reload()}
          />
        </main>
      </>
    );
  }
}
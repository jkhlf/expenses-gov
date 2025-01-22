import Ufchart from "@/components/uf-chart";
import Header from "@/components/header";
import PartyChart from "@/components/party-chart";
import SenatorList from "@/components/senator-list";
import CategoryChart from "@/components/category-chart";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await searchParamsPromise;
  try {
    const { type, year: yearParam, party: partyParam } = searchParams;
    const expensesType = type || 'uf';
    const year = Number(yearParam) || 2024;
    const selectedParty = Array.isArray(partyParam) ? partyParam[0] : (partyParam || 'MDB');

    let ufData, partyData, senatorsData, categoryData;

    try {
      const ufRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-uf');
      ufData = await ufRes.json();
    } catch (error) {
      console.error('Erro ao buscar dados de UF:', error);
      ufData = [];
    }

    try {
      const partyRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-party');
      partyData = await partyRes.json();
    } catch (error) {
      console.error('Erro ao buscar dados de partido:', error);
      partyData = [];
    }

    try {
      const senatorsRes = await fetch(
        "https://apis.codante.io/senator-expenses/senators"
      );
      senatorsData = await senatorsRes.json();
    } catch (error) {
      console.error('Erro ao buscar dados dos senadores:', error);
      senatorsData = { data: [] };
    }

    try {
      const categoryRes = await fetch(`https://apis.codante.io/senator-expenses/parties/${selectedParty}/expenses?year=${year}`);
      categoryData = await categoryRes.json();
    } catch (error) {
      console.error('Erro ao buscar dados de categorias:', error);
      categoryData = { data: [] };
    }

    return (
      <main className="container mx-auto py-10">
        <Header year={year} />
        {expensesType === 'uf' && <Ufchart year={year} data={ufData} />}
        {expensesType === 'party' && <PartyChart year={year} data={partyData} />}
        {expensesType === "senators" && <SenatorList data={senatorsData.data} />}
        {expensesType === "categories" && (
          <CategoryChart data={categoryData.data} party={selectedParty} year={year}/>
        )}
      </main>
    );
  } catch (error) {
    console.error('Erro geral na aplicação:', error);
    return (
      <main className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Ocorreu um erro ao carregar os dados
          </h1>
          <p className="mt-2">Por favor, tente novamente mais tarde.</p>
        </div>
      </main>
    );
  }
}
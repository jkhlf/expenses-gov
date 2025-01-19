
import Ufchart from "@/components/uf-chart";
import Header from "@/components/header"
import { SeparatorHorizontal } from "lucide-react";
import PartyChart from "@/components/party-chart";

type HomeProps = {
  searchParams: {[ key : string] : string | string [] | undefined}
}

export default async function Home({searchParams} : HomeProps) {

  const expensesType = searchParams.type || 'uf';
  const year = Number(searchParams.year) || 2024;

const ufRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-uf')
const ufData = await ufRes.json();

const partyRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-party')
const partyData = await partyRes.json();


  return (
    <main className="container mx-auto py-10">
      < Header year={year} />
      {expensesType === 'uf' && <Ufchart year={year} data={ufData}/>}
      {expensesType === 'party' && <PartyChart year={year} data={partyData}/>}
      
    </main>
  );
}

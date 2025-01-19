
import Ufchart from "@/components/uf-chart";
import Header from "@/components/header"
import { SeparatorHorizontal } from "lucide-react";
import PartyChart from "@/components/party-chart";

export default async function Home() {

const ufRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-uf')
const ufData = await ufRes.json();

const partyRes = await fetch('https://apis.codante.io/senator-expenses/summary/by-party')
const partyData = await partyRes.json();


  return (
    <main className="container mx-auto py-10">
      < Header />
      <Ufchart  data={ufData}/>
      <SeparatorHorizontal />
      <PartyChart  data={partyData}/>
    </main>
  );
}

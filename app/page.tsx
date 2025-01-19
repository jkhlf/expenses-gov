
import Ufchart from "@/components/uf-chart";
import Header from "@/components/header"

export default async function Home() {

const res = await fetch('https://apis.codante.io/senator-expenses/summary/by-uf')
const ufData = await res.json();


  return (
    <main className="container mx-auto py-10">
      < Header />
      <Ufchart data={ufData}/>
    </main>
  );
}

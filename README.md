# Painel de Despesas do Senado Brasileiro

Um projeto de visualização de dados construído com Next.js e Shadcn UI para analisar as despesas dos senadores brasileiros.

## Funcionalidades

- 📊 Gráficos interativos mostrando despesas por partido político
- 🗺️ Distribuição geográfica das despesas por estado (UF)
- 👥 Lista detalhada de senadores com avatares e filtros
- 💰 Despesas por categoria para cada partido
- 🎨 UI moderna com componentes personalizados
- 📱 Design responsivo para mobile e desktop
- 🔍 Busca e filtragem de senadores

## A API utilizada

A documentação da API está [neste link](https://docs.apis.codante.io/gastos-senadores).

Endpoints da API:
- [Gastos agregados por partido](https://docs.apis.codante.io/gastos-senadores#gastos-agregados-por-partido) (`/summary/by-party`)
- [Gastos agregados por UF](https://docs.apis.codante.io/gastos-senadores#gastos-agregados-por-uf) (`/summary/by-uf`)
- [Avatar e listas de senadores](https://apis.codante.io/senator-expenses/senators)(`/senator-expenses/senators`)
- [Gastos por Categoria de cada Partido](https://apis.codante.io/senator-expenses/parties/MDB/expenses)(`/senator-expenses/parties/${selectedParty}/expenses?year=${year}`)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Estrutura do Projeto

```
/app                    # App Router da aplicação Next.js
  /page.tsx             # Página principal que gerencia visualizações
/components             # Componentes reutilizáveis
  /ui                   # Componentes de UI básicos
  /uf-chart.tsx         # Visualização de gastos por UF
  /party-chart.tsx      # Visualização de gastos por partido
  /senator-list.tsx     # Lista de senadores com filtros
  /category-chart.tsx   # Gastos por categoria
  /header.tsx           # Cabeçalho da aplicação
/lib                    # Funções utilitárias
/types                  # Definições de tipos TypeScript
```


# Créditos

https://github.com/robertotcestari & https://github.com/codante-io
export type PartyChartProps = {
    year?: number,
    data: {
      year(year: any): unknown;
      data: { 
         party: string,
         senator_ids: string, 
         total_expenses: number, 
         total_per_senator: number } [];
    }[];
  }

  export type StatsRowProps = {
    ufData?: UfChartProps['data'];
    partyData?: PartyChartProps['data'];
    year: number;
    totalSenators?: number;
  }
  
  export type PageTitleProps = {
    title: string;
    description?: string;
    year: number;
  }

export type UfChartProps = {
    year?: number,
    data: {
      year: string,
      data: {uf:string, total_expenses:number}[]
    } []
  }

export type SenatorListProps = {
    data: {
      id: number;
      name: string;
      full_name: string;
      gender: string;
      UF: string;
      avatar_url: string | null; // Podemos permitir que a URL seja nula
      homepage: string;
      email: string;
      party: string;
      is_titular: number;
      is_active: number;
    }[];
  };

export type CategoryChartProps = {
    data: {
        expense_category: string;
        amount: string;
    }[];
    party: string;
    year: number;
};

export type HeaderStatsProps = {
    ufData?: UfChartProps['data'];
    partyData?: PartyChartProps['data'];
    year: number;
    totalSenators: number;
};

export type FetcherError = Error & {
    info?: any;
    status?: number;
};

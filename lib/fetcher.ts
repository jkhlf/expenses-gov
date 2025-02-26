/**
 * Custom fetcher function for SWR
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.name = 'FetchError';
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }
  
  return res.json();
};

export const API_BASE_URL = 'https://apis.codante.io/senator-expenses';

export const API_ENDPOINTS = {
  ufSummary: `${API_BASE_URL}/summary/by-uf`,
  partySummary: `${API_BASE_URL}/summary/by-party`,
  senators: `${API_BASE_URL}/senators`,
  partyExpenses: (party: string, year: number) => 
    `${API_BASE_URL}/parties/${party}/expenses?year=${year}`
};

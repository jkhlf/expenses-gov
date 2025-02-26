'use client';

import { useState } from 'react';
import { SenatorListProps } from "@/types";

export default function SenatorList({ data }: SenatorListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParty, setFilterParty] = useState("");
  const [filterUF, setFilterUF] = useState("");
  
  // Get unique parties and UFs for filters
  const uniqueParties = Array.from(new Set(data.map(senator => senator.party)));
  const uniqueUFs = Array.from(new Set(data.map(senator => senator.UF)));

  // Filter senators based on search term and filters
  const filteredSenators = data.filter(senator => {
    const matchesSearch = 
      senator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      senator.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesParty = filterParty === "" || senator.party === filterParty;
    const matchesUF = filterUF === "" || senator.UF === filterUF;
    
    return matchesSearch && matchesParty && matchesUF;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Senadores</h2>
      
      {/* Search and filter controls */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Partido</label>
            <select 
              className="w-full px-4 py-2 border rounded-md"
              value={filterParty}
              onChange={(e) => setFilterParty(e.target.value)}
            >
              <option value="">Todos os partidos</option>
              {uniqueParties.map(party => (
                <option key={party} value={party}>{party}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Estado (UF)</label>
            <select 
              className="w-full px-4 py-2 border rounded-md"
              value={filterUF}
              onChange={(e) => setFilterUF(e.target.value)}
            >
              <option value="">Todos os estados</option>
              {uniqueUFs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredSenators.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">Nenhum senador encontrado com os filtros atuais.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSenators.map((senator) => (
            <li
              key={senator.id}
              className="relative border rounded-lg p-4 cursor-pointer hover:shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
            >
              {/* Imagem do Senador ou Avatar Placeholder */}
              <div className="flex justify-center mb-4">
                {senator.avatar_url ? (
                  <img
                    src={senator.avatar_url}
                    alt={`Avatar de ${senator.name}`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl">
                    <span role="img" aria-label="Avatar">👤</span>
                  </div>
                )}
              </div>

              {/* Nome do Senador */}
              <h3 className="font-semibold text-lg text-center mb-2">{senator.name}</h3>
              <p className="text-sm text-center text-gray-600 italic mb-2">{senator.full_name}</p>

              {/* Partido, UF e Gênero */}
              <div className="text-sm text-center text-gray-600 mb-2">
                <p><span className="font-semibold">Partido:</span> {senator.party}</p>
                <p><span className="font-semibold">UF:</span> {senator.UF}</p>
                <p><span className="font-semibold">Gênero:</span> {senator.gender}</p>
                <p><span className="font-semibold">Ativo: </span>{senator.is_active ? 'Sim' : 'Não'}</p>
              </div>

              {/* Email */}
              <div className="text-sm text-center text-gray-600 mb-4">
                <p><span className="font-semibold">Email:</span> <a href={`mailto:${senator.email}`} className="text-blue-500 underline">{senator.email}</a></p>
              </div>

              {/* Botão para Homepage */}
              <div className="text-center">
                <a
                  href={senator.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-violet-500 text-white py-2 px-2 rounded-md hover:bg-violet-600 transition"
                >
                  Ver Perfil
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
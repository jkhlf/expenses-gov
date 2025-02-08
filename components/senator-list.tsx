'use client';

import { SenatorListProps } from "@/types";

export default function SenatorList({ data }: SenatorListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Senadores</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((senator) => (
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
    </div>
  );
}
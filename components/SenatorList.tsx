'use client';

type SenatorListProps = {
  data: {
    id: number;
    name: string;
    party: string;
    UF: string;
    avatar_url: string | null; // Podemos permitir que a URL seja nula
  }[];
};

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
            {/* Partido e UF */}
            <div className="text-sm text-center text-gray-600">
              <p><strong>Partido:</strong> {senator.party}</p>
              <p><strong>UF:</strong> {senator.UF}</p>
            </div>

            {/* Tooltip com mais informações, acessível */}
            <div
              className="absolute top-2 right-2 bg-violet-500 text-white text-xs px-2 py-1 rounded-md opacity-0 hover:opacity-100 transition-opacity"
              role="tooltip"
            >
              Clique para mais informações
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

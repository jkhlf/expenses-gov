import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ 
  message = "Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.",
  retry = null 
}: { 
  message?: string,
  retry?: (() => void) | null
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 border border-red-200 rounded-lg bg-red-50">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-red-600 text-center mb-4">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

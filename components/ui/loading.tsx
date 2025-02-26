import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ message = "Carregando dados..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="h-12 w-12 animate-spin text-violet-500 mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

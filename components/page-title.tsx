interface PageTitleProps {
  title: string;
  description?: string;
  year: number;
}

export default function PageTitle({ title, description, year }: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {description && (
        <p className="mt-1 text-gray-500">{description}</p>
      )}
    </div>
  );
}

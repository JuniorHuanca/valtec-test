import { ChartsComponents } from "@/components/Charts";
import { MonthPicker } from "@/components/MonthPicker";
import { Suspense } from "react";

type Props = {
  searchParams?: { month?: string };
};

export default async function Home({ searchParams }: Props) {
  const url = `https://apireports.azurewebsites.net/api/Reports?anio=2024${
    searchParams?.month ? `&mes=${searchParams?.month}` : ""
  }`;
  return (
    <div className="p-1 md:p-10 md:px-20 w-full overflow-x-auto">
      <h1 className="text-2xl text-center font-bold mb-8">
        Reporte Manning Distribution (%) per Project
      </h1>
      <MonthPicker />
      <Suspense
        key={`${searchParams?.month}`}
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <ChartsComponents url={url} />
      </Suspense>
    </div>
  );
}

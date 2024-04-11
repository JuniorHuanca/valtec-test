"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

function MonthPicker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const currentValue = params.get("month");
  const [selectedMonth, setSelectedMonth] = useState(
    currentValue ? `2024-${currentValue}` : ""
  );
  const handleSearch = () => {
    params.set("month", selectedMonth.split("-")[1]);
    replace(`${pathname}?${params.toString()}`);
  };
  const handleDelete = () => {
    if (currentValue) {
      params.delete("month");
      setSelectedMonth("");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex space-x-4">
      <input
        type="month"
        value={selectedMonth}
        onChange={(event) => setSelectedMonth(event.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
        min={"2024-01"}
        max={"2024-12"}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedMonth}
      >
        Buscar
      </button>
      {selectedMonth && (
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-red-400"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

export { MonthPicker };

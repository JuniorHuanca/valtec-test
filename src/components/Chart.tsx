"use client";
import { monthNames } from "@/shared/general";
import { IResponse } from "@/shared/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useRef } from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

type Props = {
  data: IResponse;
};

const ChartComponent = async ({ data }: Props) => {
  const colorScheme: { [key: string]: string } = {
    Breakthrough: "rgb(75, 192, 192)",
    Capability: "rgb(255, 99, 132)",
    Development: "rgb(54, 162, 235)",
    Transversal: "rgb(255, 205, 86)",
  };
  const labels = Array.from(
    new Set(data.listPerProjectType.map((e) => e.mes))
  ).sort((a, b) => {
    return monthNames.indexOf(a) - monthNames.indexOf(b);
  });
  const result = data.listPerProjectType.reduce((acc, item) => {
    const existingProject = acc.get(item.project_Type);
    if (existingProject) {
      existingProject.push(item.time_Distribution);
    } else {
      acc.set(item.project_Type, [item.time_Distribution]);
    }
    return acc;
  }, new Map<string, number[]>());

  const datasets = Array.from(result, ([name, values]) => ({
    type: "bar" as const,
    axis: "y",
    label: name,
    backgroundColor: colorScheme[name],
    data: values,
    borderColor: "#d1d5db",
    borderWidth: 2,
    barThickness: 50,
  }));

  const info = {
    labels,
    datasets,
  };
  const chartRef = useRef<ChartJS>(null);

  return (
    <>
      <h2 className="text-xl text-center font-bold text-gray-500">
        R&D Manning Distribution - General View
      </h2>
      <Chart
        ref={chartRef}
        type="bar"
        data={info}
        options={{
          indexAxis: "y",
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </>
  );
};

export { ChartComponent };

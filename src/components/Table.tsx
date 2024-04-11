import { monthNames } from "@/shared/general";
import { IResponse } from "@/shared/types";

type Props = {
  data: IResponse;
};

interface RowData {
  month: string;
  [key: string]: string | number; // Firma de índice explícita
}
const Table = ({ data }: Props) => {
  const months = Array.from(
    new Set(data.listPerProjectType.map(({ mes }) => mes))
  ).sort((a, b) => {
    return monthNames.indexOf(a) - monthNames.indexOf(b);
  });
  const projectTypes = Array.from(
    new Set(data.listPerProjectType.map(({ project_Type }) => project_Type))
  );

  const tablaData = months.map((month) => {
    const rowData: RowData = { month };

    projectTypes.forEach((projectType) => {
      const matchingItem = data.listPerProjectType.find(
        ({ mes: itemMonth, project_Type: itemProjectType }) =>
          itemMonth === month && itemProjectType === projectType
      );

      rowData[projectType] = matchingItem
        ? `% ${matchingItem.time_Distribution}`
        : "";
    });

    return rowData;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mes
            </th>
            {projectTypes.map((type) => (
              <th
                key={type}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tablaData.map((row) => (
            <tr key={row.month}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.month}
              </td>
              {projectTypes.map((type) => (
                <td
                  key={`${row.month}-${type}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[type]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

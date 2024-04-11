import { fetchData } from "@/shared/fetchData";
import { IResponse } from "@/shared/types";
import { ChartComponent } from "./Chart";
import Table from "./Table";

type Props = {
  url: string;
};

const ChartsComponents = async ({ url }: Props) => {
  const data = await fetchData<IResponse>(url);
  return (
    <>
      <ChartComponent data={data} />
      <Table data={data} />
    </>
  );
};

export { ChartsComponents };

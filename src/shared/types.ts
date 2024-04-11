export interface IResponse {
  listPerProjectType: ListPerProjectType[];
  oResponse: OResponse;
}

export interface ListPerProjectType {
  mes: string;
  project_Type: string;
  time_Distribution: number;
}

export interface OResponse {
  responseCode: number;
  responseMessage: string;
}

export interface IData {
  labels: string[];
  datasets: IDataSet[];
}
export interface IDataSet {
  type: string;
  label: string;
  backgroundColor: string;
  data: number[];
  borderColor: string;
  borderWidth: number;
  fill?: boolean;
}

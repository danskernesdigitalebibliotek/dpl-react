import { UseQueryResult } from "react-query";
import {
  GetMaterialGloballyQuery,
  GetMaterialQuery,
  useGetMaterialGloballyQuery,
  useGetMaterialQuery
} from "../dbc-gateway/generated/graphql";
import { WorkId } from "./types/ids";

export type WorkType = "local" | "global" | "unknown";

type DataResponse = (
  | UseQueryResult<GetMaterialQuery, unknown>
  | UseQueryResult<GetMaterialGloballyQuery, unknown>
) & { workType: WorkType };

const getData = (
  response:
    | UseQueryResult<GetMaterialQuery, unknown>
    | UseQueryResult<GetMaterialGloballyQuery, unknown>,
  type: WorkType
): DataResponse | null => {
  if (!response.isLoading && response.data?.work) {
    return { ...response, workType: type };
  }

  return null;
};

export const useGetWork = (
  wid: WorkId
):
  | ((
      | UseQueryResult<GetMaterialQuery, unknown>
      | UseQueryResult<GetMaterialGloballyQuery, unknown>
    ) & { workType: WorkType })
  | { data: null; isLoading: true; error: null; workType: WorkType } => {
  const localWork = useGetMaterialQuery({
    wid
  });
  const globalWork = useGetMaterialGloballyQuery({
    wid
  });

  const localWorkData = getData(localWork, "local");
  if (localWorkData) {
    return localWorkData;
  }

  const globalWorkData = getData(globalWork, "global");
  if (globalWorkData) {
    return globalWorkData;
  }

  return { data: null, isLoading: true, error: null, workType: "unknown" };
};

export default {};

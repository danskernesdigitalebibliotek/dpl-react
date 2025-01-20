import { useMemo } from "react";
import { useComplexSearchWithPaginationQuery } from "../dbc-gateway/generated/graphql";
import { useUrls } from "./url";
import { constructMaterialUrl } from "./helpers/url";
import { WorkId } from "./types/ids";
import { getMaterialTypes } from "./helpers/general";
import { Manifestation } from "./types/entities";

type GetWorkUrlFromPublizonIdentifierResultType = {
  workUrl: URL | null;
  isLoading: boolean;
  isError: boolean;
};

const useGetWorkUrlFromPublizonIdentifier = (
  identifier: string | undefined | null
): GetWorkUrlFromPublizonIdentifierResultType => {
  const u = useUrls();
  const materialUrl = u("materialUrl");

  const { data, isLoading, isError } = useComplexSearchWithPaginationQuery(
    {
      cql: `term.isbn=${identifier}`,
      offset: 0,
      limit: 1,
      filters: {}
    },
    {
      enabled: Boolean(identifier)
    }
  );

  const workUrl = useMemo(() => {
    if (!data || !identifier) return null;

    const work = data.complexSearch?.works?.[0];
    if (!work) return null;

    const workId = work.workId as WorkId;
    const manifestationWithSameIdentifier = work.manifestations?.all?.find(
      (manifestation) =>
        manifestation.identifiers?.some((id) => id.value === identifier)
    );
    const materialType = manifestationWithSameIdentifier
      ? getMaterialTypes([manifestationWithSameIdentifier] as Manifestation[])
      : undefined;

    return constructMaterialUrl(
      materialUrl,
      workId,
      materialType ? String(materialType) : undefined
    );
  }, [data, identifier, materialUrl]);

  return { workUrl, isLoading, isError };
};

export default useGetWorkUrlFromPublizonIdentifier;

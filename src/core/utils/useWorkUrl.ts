import { useMemo } from "react";
import { useComplexSearchWithPaginationQuery } from "../dbc-gateway/generated/graphql";
import { useUrls } from "./url";
import { constructMaterialUrl } from "./helpers/url";
import { Pid, WorkId } from "./types/ids";
import { getMaterialTypes } from "./helpers/general";
import { Manifestation } from "./types/entities";

type UseWorkUrlParams = {
  identifier?: string | null; // ISBN for digital materials
  pid?: Pid | null; // PID for physical materials
  materialType?: string | null;
};

type UseWorkUrlResult = {
  workUrl: URL | null;
  isLoading: boolean;
};

const useWorkUrl = ({
  identifier,
  pid,
  materialType
}: UseWorkUrlParams): UseWorkUrlResult => {
  const u = useUrls();
  const materialUrl = u("materialUrl");

  // If we have a pid, we can construct the URL directly (physical path)
  const physicalWorkUrl = useMemo(() => {
    if (pid) {
      const workId = `work-of:${pid}` as WorkId;
      return constructMaterialUrl(
        materialUrl,
        workId,
        materialType || undefined
      );
    }
    return null;
  }, [pid, materialUrl, materialType]);

  // Only do the GraphQL query if we don't have a pid but have an identifier
  const shouldQueryByIdentifier = !pid && Boolean(identifier);

  const { data, isLoading } = useComplexSearchWithPaginationQuery(
    {
      cql: `term.isbn=${identifier}`,
      offset: 0,
      limit: 1,
      filters: {}
    },
    {
      enabled: shouldQueryByIdentifier
    }
  );

  const digitalWorkUrl = useMemo(() => {
    if (!shouldQueryByIdentifier || !data || !identifier) return null;

    const work = data.complexSearch?.works?.[0];
    if (!work) return null;

    const workId = work.workId as WorkId;
    const manifestationWithSameIdentifier = work.manifestations?.all?.find(
      (manifestation) =>
        manifestation.identifiers?.some((id) => id.value === identifier)
    );
    const foundMaterialType = manifestationWithSameIdentifier
      ? getMaterialTypes([manifestationWithSameIdentifier] as Manifestation[])
      : undefined;

    return constructMaterialUrl(
      materialUrl,
      workId,
      foundMaterialType ? String(foundMaterialType) : undefined
    );
  }, [shouldQueryByIdentifier, data, identifier, materialUrl]);

  // Prefer physical URL (direct construction), fall back to digital (query-based)
  const workUrl = physicalWorkUrl ?? digitalWorkUrl;

  return {
    workUrl,
    isLoading: shouldQueryByIdentifier ? isLoading : false
  };
};

export default useWorkUrl;

import { ComplexSearchWithPaginationQuery } from "../../../../core/dbc-gateway/generated/graphql";

type AccessManifestations =
  ComplexSearchWithPaginationQuery["complexSearch"]["works"][0]["manifestations"]["all"];

export const findAccessManifestationByIdentifier = (
  manifestations: AccessManifestations,
  identifier: string
) => {
  return manifestations.filter((manifestation) =>
    manifestation.identifiers.find(
      (id) => id.value.replace(/\D/g, "") === identifier.replace(/\D/g, "")
    )
  );
};

export const findEreolAccessLinkFromManifestations = (
  manifestations: AccessManifestations
) => {
  const manifestationWithEreolAccess = manifestations.find((manifestation) => {
    return manifestation.access.find((access) => {
      return access.__typename === "Ereol";
    });
  });
  const ereolAccess = manifestationWithEreolAccess?.access.find(
    (access) => access.__typename === "Ereol"
  );
  // TODO: Find out why TS doesn't understand that ereolAccess will always exist
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  return ereolAccess?.url;
};

export default {};

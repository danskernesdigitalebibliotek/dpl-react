import { ComplexSearchWithPaginationWorkAccessQuery } from "../../../../core/dbc-gateway/generated/graphql";

type AccessManifestations =
  ComplexSearchWithPaginationWorkAccessQuery["complexSearch"]["works"][0]["manifestations"]["all"];

export const findAccessManifestationByIdentifier = (
  manifestations: AccessManifestations,
  identifier: string
) =>
  manifestations.filter((manifestation) =>
    manifestation.identifiers.find(
      // We are comparing ISBNs here, which can have different formats -
      // with spaces/dashes, so we remove all non-digits before comparing.
      (id) => id.value.replace(/\D/g, "") === identifier.replace(/\D/g, "")
    )
  );

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

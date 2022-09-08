import { ListData } from "../../components/material/MaterialDetailsList";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { UseTextFunction } from "../../core/utils/text";

export const getManifestationType = (
  manifestation: ManifestationsSimpleFieldsFragment
) => manifestation?.materialTypes?.[0]?.specific;

export const getWorkManifestation = (work: WorkMediumFragment) => {
  return work.manifestations.latest;
};

export const getManifestationFromType = (
  type: string,
  work: WorkMediumFragment
) => {
  const allManifestations = orderManifestationsByYear(work.manifestations);

  const allManifestationsThatMatchType = allManifestations.filter(
    (item) => getManifestationType(item) === type
  );

  return allManifestationsThatMatchType.shift();
};

export const getWorkDescriptionListData = ({
  manifestation,
  work,
  t
}: {
  manifestation: ManifestationsSimpleFieldsFragment | null;
  work: WorkMediumFragment;
  t: UseTextFunction;
}): ListData => {
  const { titles, mainLanguages, creators, workYear } = work;

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");
  const fallBackManifestation = getWorkManifestation(work);
  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  return [
    {
      label: t("typeText"),
      value:
        (manifestation?.materialTypes?.[0]?.specific && "") ||
        (fallBackManifestation?.materialTypes?.[0]?.specific && ""),
      type: "standard"
    },
    {
      label: t("languageText"),
      value: allLanguages,
      type: "standard"
    },
    {
      label: t("genreAndFormText"),
      value:
        (manifestation?.genreAndForm?.[0] ?? "") ||
        (fallBackManifestation?.genreAndForm?.[0] ?? ""),
      type: "standard"
    },
    { label: t("contributorsText"), value: creatorsText, type: "link" },
    {
      label: t("originalTitleText"),
      value: titles && workYear ? `${titles?.original} ${workYear}` : "",
      type: "standard"
    },
    {
      label: t("isbnText"),
      value:
        (manifestation?.identifiers?.[0].value ?? "") ||
        (fallBackManifestation?.identifiers?.[0].value ?? ""),
      type: "standard"
    },
    {
      label: t("editionText"),
      value:
        (manifestation?.edition?.summary ?? "") ||
        (fallBackManifestation?.edition?.summary ?? ""),
      type: "standard"
    },
    {
      label: t("scopeText"),
      value:
        String(manifestation?.physicalDescriptions?.[0]?.numberOfPages ?? "") ||
        String(
          fallBackManifestation?.physicalDescriptions?.[0]?.numberOfPages ?? ""
        ),
      type: "standard"
    },
    {
      label: t("publisherText"),
      value:
        (manifestation?.hostPublication?.publisher ?? "") ||
        (fallBackManifestation?.hostPublication?.publisher ?? ""),
      type: "standard"
    },
    {
      label: t("audienceText"),
      value:
        (manifestation?.audience?.generalAudience[0] ?? "") ||
        (fallBackManifestation?.audience?.generalAudience[0] ?? ""),
      type: "standard"
    }
  ];
};

import { ListData } from "../../components/material/MaterialDetailsList";
import { AgencyBranch, HoldingsV3 } from "../../core/fbs/model";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { UseTextFunction } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";

export const getManifestationType = (manifestation: Manifestation) =>
  manifestation?.materialTypes?.[0]?.specific;

export const getWorkManifestation = (work: Work) => {
  return work.manifestations.latest as Manifestation;
};

export const getManifestationFromType = (
  type: string,
  { manifestations: { all: manifestations } }: Work
) => {
  const allManifestations = orderManifestationsByYear(manifestations);

  const allManifestationsThatMatchType = allManifestations.filter(
    (item) => getManifestationType(item as Manifestation) === type
  );

  return allManifestationsThatMatchType.shift() as Manifestation;
};

export const getWorkDescriptionListData = ({
  manifestation,
  work,
  t
}: {
  manifestation: Manifestation | null;
  work: Work;
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

export const getNoInterestAfter = (days: number, t: UseTextFunction) => {
  const reservationInterestIntervals: { [key: string]: string } = {
    "30": t("oneMonthText"),
    "60": t("twoMonthsText"),
    "90": t("threeMonthsText"),
    "180": t("sixMonthsText"),
    "360": t("oneYearText"),
    default: `${days} ${t("daysText")}`
  } as const;

  const lookupKey = String(days);
  return (
    reservationInterestIntervals[lookupKey] ??
    reservationInterestIntervals.default
  );
};

export const getPreferredLocation = (id: string, array: AgencyBranch[]) => {
  const locationItem = array.find((item) => item.branchId === id);
  return locationItem ? locationItem.title : id;
};

export const totalMaterials = (holdings: HoldingsV3[]) => {
  return holdings.reduce((acc, curr) => acc + curr.materials.length, 0);
};

import { ManifestationHoldings } from "../../components/find-on-shelf/types";
import { ListData } from "../../components/material/MaterialDetailsList";
import { HoldingsV3 } from "../../core/fbs/model";
import {
  getManifestationType,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { UseTextFunction } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";

export const getWorkManifestation = (
  work: Work,
  type: keyof Work["manifestations"]
) => work.manifestations[type];

export const filterManifestationsByType = (
  type: string,
  manifestations: Manifestation[]
) => manifestations.filter((item) => getManifestationType(item) === type);

export const getManifestationFromType = (
  type: string,
  { manifestations: { all: manifestations } }: Work
) => {
  const allManifestations = orderManifestationsByYear(manifestations);

  const allManifestationsThatMatchType = filterManifestationsByType(
    type,
    allManifestations
  );

  return allManifestationsThatMatchType.shift();
};

export const getManifestationPlayingTime = (manifestation: Manifestation) => {
  return manifestation.physicalDescriptions?.[0]?.playingTime ?? "";
};

export const getManifestationEdition = (manifestation: Manifestation) => {
  return manifestation.edition?.summary ?? "";
};

export const getManifestationGenreAndForm = (manifestation: Manifestation) => {
  return manifestation.genreAndForm.join(" / ") ?? "";
};

export const getManifestationPublisher = (manifestation: Manifestation) => {
  return manifestation.publisher.join(" / ") ?? "";
};

export const getManifestationMaterialTypes = (manifestation: Manifestation) => {
  return manifestation.materialTypes?.[0].specific ?? "";
};

export const getManifestationNumberOfPages = (manifestation: Manifestation) => {
  return manifestation.physicalDescriptions?.[0]?.numberOfPages
    ? String(manifestation.physicalDescriptions?.[0].numberOfPages)
    : "";
};

export const getManifestationAudience = (manifestation: Manifestation) => {
  return manifestation.audience?.generalAudience[0] ?? "";
};

export const getManifestationIsbn = (manifestation: Manifestation) => {
  return manifestation.identifiers?.[0]?.value ?? "";
};

export const getManifestationLanguages = (manifestation: Manifestation) => {
  return (
    manifestation.languages?.main
      ?.map((language) => language.display)
      .join(", ") ?? ""
  );
};

export const getManifestationFirstEditionYear = (
  manifestation: Manifestation
) => {
  return manifestation.workYear?.year
    ? String(manifestation.workYear.year)
    : "";
};

export const getManifestationOriginalTitle = (manifestation: Manifestation) => {
  return manifestation.titles?.original?.[0] ?? "";
};

export const getManifestationContributors = (manifestation: Manifestation) => {
  return (
    manifestation.contributors
      .map((contributor) => contributor.display)
      .join(" / ") ?? ""
  );
};

export const getDetailsListData = ({
  manifestation,
  work,
  t
}: {
  manifestation: Manifestation | null;
  work: Work;
  t: UseTextFunction;
}): ListData => {
  const fallBackManifestation = getWorkManifestation(
    work,
    "bestRepresentation"
  ) as Manifestation;

  return [
    {
      label: t("detailsListLanguageText"),
      value: getManifestationLanguages(manifestation ?? fallBackManifestation),
      type: "standard"
    },
    {
      label: t("detailsListPlayTimeText"),
      value: getManifestationPlayingTime(
        manifestation ?? fallBackManifestation
      ),
      type: "standard"
    },
    {
      label: t("detailsListEditionText"),
      value: getManifestationEdition(manifestation ?? fallBackManifestation),
      type: "standard"
    },

    {
      label: t("detailsListGenreAndFormText"),
      value: getManifestationGenreAndForm(
        manifestation ?? fallBackManifestation
      ),
      type: "standard"
    },
    {
      label: t("detailsListOriginalTitleText"),
      value: getManifestationOriginalTitle(
        manifestation ?? fallBackManifestation
      ),
      type: "standard"
    },
    {
      label: t("detailsListPublisherText"),
      value: getManifestationPublisher(manifestation ?? fallBackManifestation),
      type: "standard"
    },
    {
      label: t("detailsListFirstEditionYearText"),
      value:
        getManifestationFirstEditionYear(
          manifestation ?? fallBackManifestation
        ) ?? t("unknownText"),
      type: "standard"
    },
    {
      label: t("detailsListTypeText"),
      value: getManifestationMaterialTypes(
        manifestation ?? fallBackManifestation
      ),
      type: "standard"
    },
    {
      label: t("detailsListContributorsText"),
      value: getManifestationContributors(
        manifestation ?? fallBackManifestation
      ),
      type: "link"
    },
    {
      label: t("detailsListScopeText"),
      value: getManifestationNumberOfPages(
        manifestation ?? fallBackManifestation
      ),
      type: "standard"
    },
    {
      label: t("detailsListAudienceText"),
      value: getManifestationAudience(manifestation ?? fallBackManifestation),
      type: "standard"
    }
  ];
};

export const totalMaterials = (holdings: HoldingsV3[]) => {
  return holdings.reduce((acc, curr) => acc + curr.materials.length, 0);
};

export const totalAvailableMaterials = (materials: HoldingsV3["materials"]) => {
  return materials.reduce((acc, curr) => (curr.available ? acc + 1 : acc), 0);
};

export const isAnyManifestationAvailableOnBranch = (
  libraryBranches: ManifestationHoldings
) => {
  return libraryBranches.some((libraryBranch) => {
    return libraryBranch.holding.materials.some((material) => {
      return material.available;
    });
  });
};

export const totalBranchesHaveMaterial = (
  manifestationHoldings: ManifestationHoldings[]
) => {
  return manifestationHoldings.filter((branchManifestationHoldings) => {
    return isAnyManifestationAvailableOnBranch(branchManifestationHoldings);
  }).length;
};

export const getInfomediaId = (manifestation: Manifestation) => {
  const access = manifestation?.access || [];
  return access.reduce<string | null>((acc, curr) => {
    const { __typename: type } = curr;
    if (type === "InfomediaService") {
      return curr.id;
    }
    return acc;
  }, null);
};

import { compact, uniq } from "lodash";
import { ManifestationHoldings } from "../../components/find-on-shelf/types";
import { ListData } from "../../components/material/MaterialDetailsList";
import {
  HoldingsForBibliographicalRecordV3,
  HoldingsV3
} from "../../core/fbs/model";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationType,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { UseTextFunction } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import MaterialType from "../../core/utils/types/material-type";

export const getLatestWorkManifestation = (work: Work) => {
  return work.manifestations.latest as Manifestation;
};

export const filterManifestationsByType = (
  type: string,
  manifestations: Manifestation[]
) => manifestations.filter((item) => getManifestationType(item) === type);

export const getManifestationsFromType = (
  type: string,
  { manifestations: { all: manifestations } }: Work
) => {
  const allManifestations = orderManifestationsByYear(manifestations);

  const allManifestationsThatMatchType = filterManifestationsByType(
    type,
    allManifestations
  );

  return allManifestationsThatMatchType;
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
  const fallBackManifestation = getLatestWorkManifestation(work);
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
      value: titles && workYear ? `${titles?.original} ${workYear.year}` : "",
      type: "standard"
    },
    {
      label: t("isbnText"),
      value:
        (manifestation?.identifiers?.[0]?.value ?? "") ||
        (fallBackManifestation?.identifiers?.[0]?.value ?? ""),
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

export const getTotalHoldings = (
  holdings: HoldingsForBibliographicalRecordV3[]
) => {
  return holdings.reduce((acc, curr) => {
    return (
      acc +
      curr.holdings.reduce((accumulator, current) => {
        return accumulator + current.materials.length;
      }, 0)
    );
  }, 0);
};

export const getTotalReservations = (
  holdings: HoldingsForBibliographicalRecordV3[]
) => {
  return holdings.reduce((acc, curr) => {
    return acc + curr.reservations;
  }, 0);
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

export const getInfomediaIds = (manifestations: Manifestation[]) => {
  const infomediaIds = manifestations
    .map((manifestation) =>
      manifestation.access.map((currentAccess) => {
        return currentAccess.__typename === "InfomediaService"
          ? currentAccess.id
          : null;
      })
    )
    .flat();
  return compact(infomediaIds);
};

export const getAllUniqueMaterialTypes = (manifestations: Manifestation[]) => {
  const allMaterialTypes = manifestations
    .map((manifest) => manifest.materialTypes.map((type) => type.specific))
    .flat();
  return uniq(allMaterialTypes);
};

export const divideManifestationsByMaterialType = (
  manifestations: Manifestation[]
) => {
  const uniqueMaterialTypes = getAllUniqueMaterialTypes(manifestations);
  const dividedManifestationsArrays = uniqueMaterialTypes.map(
    (uniqueMaterialType) => {
      return manifestations.filter((manifest) => {
        const manifestationMaterialTypes = manifest.materialTypes.map(
          (materialType) => materialType.specific
        );
        return manifestationMaterialTypes.includes(uniqueMaterialType);
      });
    }
  );
  const dividedManifestationsObject: { [key: string]: Manifestation[] } =
    dividedManifestationsArrays.reduce((result, current, index) => {
      const materialType = uniqueMaterialTypes[index];
      return { ...result, [materialType]: current };
    }, {});
  return dividedManifestationsObject;
};

export const getAllIdentifiers = (manifestations: Manifestation[]) => {
  return manifestations
    .map((manifestation) =>
      manifestation.identifiers.map((identifier) => identifier.value)
    )
    .flat();
};

export const getManifestationsWithMaterialType = (
  manifestations: Manifestation[]
) => {
  return manifestations.filter((manifestation) => {
    return manifestation.materialTypes.length > 0;
  });
};

export const isABook = (manifestations: Manifestation[]) => {
  return manifestations.some((manifestation) => {
    return manifestation.materialTypes.some(
      (materialType) =>
        materialType.specific.toLowerCase() === MaterialType.book
    );
  });
};

export const getBestMaterialTypeForManifestation = (
  manifestation: Manifestation
) => {
  if (isABook([manifestation])) {
    return MaterialType.book;
  }
  return manifestation.materialTypes[0].specific;
};

export const getBestMaterialTypeForWork = (work: Work) => {
  if (work.manifestations.bestRepresentation) {
    return getBestMaterialTypeForManifestation(
      work.manifestations.bestRepresentation
    );
  }
  if (work.manifestations.latest) {
    return getBestMaterialTypeForManifestation(work.manifestations.latest);
  }
  if (work.manifestations.first) {
    return getBestMaterialTypeForManifestation(work.manifestations.first);
  }
  if (isABook(work.manifestations.all)) {
    return MaterialType.book;
  }
  return getManifestationsWithMaterialType(work.manifestations.all)[0]
    .materialTypes[0].specific;
};

export const reservationModalId = (faustIds: FaustId[]) => {
  const sortedFaustIds = faustIds.sort();
  return `reservation-modal-${sortedFaustIds.join("-")}`;
};

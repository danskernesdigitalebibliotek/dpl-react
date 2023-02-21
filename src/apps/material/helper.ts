import { compact, groupBy } from "lodash";
import {
  constructModalId,
  getMaterialTypes,
  getManifestationType,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { ManifestationHoldings } from "../../components/find-on-shelf/types";
import { ListData } from "../../components/material/MaterialDetailsList";
import {
  HoldingsForBibliographicalRecordV3,
  HoldingsV3
} from "../../core/fbs/model";
import { UseTextFunction } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import MaterialType from "../../core/utils/types/material-type";

export const getWorkManifestation = (
  work: Work,
  type: keyof Work["manifestations"]
) => work.manifestations[type];

export const getManifestationsOrderByTypeAndYear = (
  manifestations: Manifestation[]
) => {
  const orderedByYear = orderManifestationsByYear(manifestations);

  const materialsMappedBytype = groupBy(
    orderedByYear,
    // all manifestations that not have a material type will be grouped under "unknown"
    (m) => m?.materialTypes[0]?.specific ?? "unknown"
  );

  return (
    // Get the keys for each material type.
    Object.keys(materialsMappedBytype)
      // Sort the material types alphabetically.
      .sort()
      // Create a new array by iterating over the sorted keys and
      // combining the materials from each type into a single array.
      .reduce<Manifestation[]>((acc, key) => {
        return [...acc, ...materialsMappedBytype[key]];
      }, [])
  );
};

export const filterManifestationsByType = (
  type: string,
  manifestations: Manifestation[]
) => manifestations.filter((item) => getManifestationType([item]) === type);

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
        ) ?? t("detailsListFirstEditionYearUnknownText"),
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

export const divideManifestationsByMaterialType = (
  manifestations: Manifestation[]
) => {
  const uniqueMaterialTypes = getMaterialTypes(manifestations);
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
  return dividedManifestationsArrays.reduce<{ [key: string]: Manifestation[] }>(
    (result, current, index) => {
      const materialType = uniqueMaterialTypes[index];
      return { ...result, [materialType]: current };
    },
    {}
  );
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
  return constructModalId("reservation-modal", faustIds.sort());
};

export const getNumberedSeries = (series: Work["series"]) =>
  series.filter((serie) => serie.numberInSeries?.number);

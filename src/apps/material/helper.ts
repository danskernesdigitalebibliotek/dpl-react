import { compact, first, groupBy, head, uniq, uniqBy } from "lodash";
import { UseQueryOptions } from "react-query";
import { ManifestationHoldings } from "../../components/find-on-shelf/types";
import {
  ListData,
  ListItemType
} from "../../components/material/MaterialDetailsList";
import {
  hasCorrectAccessType,
  isArticle
} from "../../components/material/material-buttons/helper";
import {
  AccessTypeCodeEnum,
  WorkTypeEnum
} from "../../core/dbc-gateway/generated/graphql";
import {
  getAvailabilityV3,
  getHoldingsLogisticsV1,
  useGetHoldingsLogisticsV1
} from "../../core/fbs/fbs";
import {
  HoldingsForBibliographicalRecordLogisticsV1,
  HoldingsLogisticsV1
} from "../../core/fbs/model";
import { UseConfigFunction } from "../../core/utils/config";
import {
  flattenCreators,
  getManifestationType,
  orderManifestationsByYear
} from "../../core/utils/helpers/general";
import { constructModalId } from "../../core/utils/helpers/modal-helpers";
import { UseTextFunction } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import vitestData from "./__vitest_data__/helper";

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
    (m) => m?.materialTypes[0]?.materialTypeSpecific.display ?? "unknown"
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getManifestationPlayingTime = (manifestation: Manifestation) => {
  return "";
  // TODO: solve missing playingTime.
  // return manifestation.physicalDescription?.[0]?.playingTime ?? "";
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
  return manifestation.materialTypes?.[0].materialTypeSpecific?.display ?? "";
};

export const getManifestationNumberOfPages = (manifestation: Manifestation) => {
  return manifestation.physicalDescription?.numberOfPages
    ? String(manifestation.physicalDescription?.numberOfPages)
    : "";
};

export const getManifestationAudience = (
  manifestation: Manifestation,
  t: UseTextFunction
) => {
  const generalAudience = manifestation.audience?.generalAudience[0] ?? "";
  const agesDisplay = manifestation.audience?.ages[0]?.display ?? "";
  const formattedAges = agesDisplay
    ? t("detailsListAgeRangeText", {
        placeholders: { "@ageRange": agesDisplay }
      })
    : "";

  return generalAudience && formattedAges
    ? `${generalAudience}, ${formattedAges}`
    : generalAudience || formattedAges;
};

export const getManifestationIsbn = (manifestation: Manifestation) => {
  return manifestation.identifiers?.[0]?.value ?? "";
};

export const getManifestationSource = (manifestation: Manifestation) => {
  return manifestation.source ?? "";
};

export const getManifestationLanguages = (manifestation: Manifestation) => {
  const { languages } = manifestation;

  if (languages?.notes?.length) {
    return languages.notes.join(", ");
  }

  // Return main languages if no notes or empty notes.
  const mainLanguages = languages?.main
    ?.map((language) => language.display)
    .join(", ");
  return mainLanguages ?? "";
};

export const getManifestationLanguageIsoCode = (
  manifestations: Pick<Manifestation, "languages">[]
) => {
  const mainLanguages = manifestations
    .map(({ languages }) => languages)
    .flatMap((language) => language?.main);

  const uniqueLanguagesWithIsoCode = uniqBy(mainLanguages, "isoCode");

  // We only want to set the lang attribute if there is only one isoCode
  const uniqIsoCode =
    uniqueLanguagesWithIsoCode.length === 1 &&
    head(uniqueLanguagesWithIsoCode)?.isoCode;

  if (uniqIsoCode) {
    return uniqIsoCode;
  }
  // if there is no isoCode it return undefined so that the lang attribute is not set
  return undefined;
};

export const getWorkFirstEditionYear = (work: Work) => {
  return work.workYear?.year ? String(work.workYear.year) : "";
};

export const getManifestationOriginalTitle = (manifestation: Manifestation) => {
  return manifestation.titles?.original?.[0] ?? "";
};

export const getManifestationContributors = (manifestation: Manifestation) => {
  return (
    manifestation.contributors
      .map((contributor) => {
        if (contributor.roles.length > 0) {
          const roleNames = contributor.roles
            .map((role) => role.function.singular)
            .join(", ");
          return `${contributor.display} (${roleNames})`;
        }
        return contributor.display;
      })
      .join(" / ") ?? ""
  );
};

export const getManifestationAuthors = (manifestation: Manifestation) => {
  return flattenCreators(manifestation.creators).join(", ") ?? "";
};

export const getManifestationNotes = (manifestation: Manifestation) => {
  return manifestation.notes?.[0]?.display?.join(", ") ?? "";
};

export const getManifestationPhysicalDescription = (
  manifestation: Manifestation
) => {
  return manifestation.physicalDescription?.summaryFull ?? "";
};

export const getManifestationHostPublication = (
  manifestation: Manifestation
) => {
  return manifestation.hostPublication?.summary ?? "";
};
export const getManifestationParts = (
  manifestation: Manifestation
): string[] | string => {
  return (
    manifestation.manifestationParts?.parts?.map((item) => item.title) || ""
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
  const workFirstEditionYear = getWorkFirstEditionYear(work);
  const fallBackManifestation = getWorkManifestation(
    work,
    "bestRepresentation"
  ) as Manifestation;

  return [
    {
      label: t("detailsListLanguageText"),
      value: getManifestationLanguages(manifestation ?? fallBackManifestation)
    },
    {
      label: t("detailsListPlayTimeText"),
      value: getManifestationPlayingTime(manifestation ?? fallBackManifestation)
    },
    {
      label: t("detailsListEditionText"),
      value: getManifestationEdition(manifestation ?? fallBackManifestation)
    },

    {
      label: t("detailsListGenreAndFormText"),
      value: getManifestationGenreAndForm(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListOriginalTitleText"),
      value: getManifestationOriginalTitle(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListPublisherText"),
      value: getManifestationPublisher(manifestation ?? fallBackManifestation)
    },
    {
      label: t("detailsListFirstEditionYearText"),
      value: workFirstEditionYear
    },
    {
      label: t("detailsListTypeText"),
      value: getManifestationMaterialTypes(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListContributorsText"),
      value: getManifestationContributors(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListScopeText"),
      value: getManifestationNumberOfPages(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListAudienceText"),
      value: getManifestationAudience(manifestation ?? fallBackManifestation, t)
    },
    {
      label: t("detailsListPhysicalDescriptionText"),
      value: getManifestationPhysicalDescription(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListHostPublicationText"),
      value: getManifestationHostPublication(
        manifestation ?? fallBackManifestation
      )
    },
    {
      label: t("detailsListPartsText"),
      value: getManifestationParts(manifestation ?? fallBackManifestation),
      type: ListItemType.List
    }
  ];
};

export const getTotalHoldings = (
  holdings: HoldingsForBibliographicalRecordLogisticsV1[]
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
  holdings: HoldingsForBibliographicalRecordLogisticsV1[]
) => {
  return holdings.reduce((acc, curr) => {
    return acc + curr.reservations;
  }, 0);
};

export const totalAvailableMaterials = (
  materials: HoldingsLogisticsV1["materials"]
) => {
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
) =>
  manifestations.reduce<{ [key: string]: Manifestation[] }>(
    (result, manifestation) => {
      if (
        !manifestation.materialTypes.length ||
        !manifestation.materialTypes[0].materialTypeSpecific?.display
      ) {
        return result;
      }

      // For some reason we sometimes have multiple material types
      // we only want the first one.
      // TODO: Double check with DDF that this is a viable solution.
      const type = manifestation.materialTypes[0].materialTypeSpecific.display;
      return { ...result, [type]: [...(result[type] ?? []), manifestation] };
    },
    {}
  );

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

export const getFirstBookManifestation = (manifestations: Manifestation[]) => {
  const dividedManifestations =
    divideManifestationsByMaterialType(manifestations);
  return first(dividedManifestations[ManifestationMaterialType.book]) ?? null;
};

export const isABook = (manifestations: Manifestation[]) => {
  return manifestations.some((manifestation) => {
    return manifestation.materialTypes.some(
      (materialType) =>
        materialType.materialTypeSpecific.display.toLowerCase() ===
        ManifestationMaterialType.book
    );
  });
};

export const getBestMaterialTypeForManifestation = (
  manifestation: Manifestation
) => {
  if (isABook([manifestation])) {
    return ManifestationMaterialType.book;
  }
  return manifestation.materialTypes[0].materialTypeSpecific.display;
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
    return ManifestationMaterialType.book;
  }
  return getManifestationsWithMaterialType(work.manifestations.all)[0]
    .materialTypes[0].materialTypeSpecific.display;
};

export const reservationModalId = (faustIds: FaustId[]) => {
  return constructModalId("reservation-modal", faustIds.sort());
};

export const getUniqueMovies = (relations: Work["relations"]) => {
  const movies = relations.hasAdaptation.filter(
    (item) => item.ownerWork.workTypes.includes(WorkTypeEnum.Movie)
    // item.ownerWork.workTypeWorkTypeEnums.includes(WorkTypeEnum.Movie)
  );

  return uniqBy(movies, (item) => item.ownerWork.workId);
};

export const getDbcVerifiedSubjectsFirst = (subjects: Work["subjects"]) =>
  uniq([
    // dbcVerified needs to be first, because it is the most accurate
    ...subjects.dbcVerified.map((item) => item.display),
    ...subjects.all.map((item) => item.display)
  ]);

export const isParallelReservation = (manifestations: Manifestation[]) =>
  manifestations.length > 1 &&
  hasCorrectAccessType(AccessTypeCodeEnum.Physical, manifestations) &&
  !isArticle(manifestations);

type BlacklistType = "availability" | "pickup" | "both";

const formatBranches = (branches: string[][]) => {
  return branches.flat().length ? { exclude: branches.flat() } : {};
};

const branchesFromConfig = (
  blacklist: BlacklistType,
  config: UseConfigFunction
) => {
  const configMap: Record<Exclude<BlacklistType, "both">, string> = {
    availability: "blacklistedAvailabilityBranchesConfig",
    pickup: "blacklistedPickupBranchesConfig"
  };

  type ConfigMapKey = keyof typeof configMap;

  if (!configMap[blacklist as ConfigMapKey]) {
    return [];
  }

  return config(configMap[blacklist as ConfigMapKey], {
    transformer: "stringToArray"
  }).filter((branch) => branch);
};

// Because we need to exclude the branches that are blacklisted, we need to
// use a custom hook to prevent duplicate code
export const getBlacklistedQueryArgs = (
  faustIds: FaustId[],
  config: UseConfigFunction,
  blacklistType: BlacklistType
) => {
  // Fixed arguments for the query.
  const args = {
    recordid: faustIds
  };
  // Return query args with the either availability or pickup branches excluded.
  if (blacklistType !== "both") {
    return {
      ...args,
      ...formatBranches([branchesFromConfig(blacklistType, config)])
    };
  }

  // If we want to blacklist both availability and pickup branches
  // return query args with both blacklist types excluded.
  return {
    ...args,
    ...formatBranches([
      branchesFromConfig("availability", config),
      branchesFromConfig("pickup", config)
    ])
  };
};

export const getAvailability = async ({
  faustIds,
  config
}: {
  faustIds: FaustId[];
  config: UseConfigFunction;
}) =>
  getAvailabilityV3(getBlacklistedQueryArgs(faustIds, config, "availability"));

export const useGetHoldings = ({
  faustIds,
  config,
  blacklist,
  options
}: {
  faustIds: FaustId[];
  config: UseConfigFunction;
  blacklist: BlacklistType;
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHoldingsLogisticsV1>>>;
  };
}) => {
  const { data, isLoading, isError } = useGetHoldingsLogisticsV1(
    getBlacklistedQueryArgs(faustIds, config, blacklist),
    options
  );
  return { data, isLoading, isError };
};

export const getManifestationBasedOnType = (
  work: Work,
  materialType: ManifestationMaterialType
): Manifestation => {
  const { bestRepresentation, all } = work.manifestations;

  const bestRepresentationMaterialType =
    getManifestationMaterialTypes(bestRepresentation);

  if (materialType === bestRepresentationMaterialType) {
    return bestRepresentation;
  }
  // Filters and sorts the manifestations if the best representation does not match.
  const sortedManifestations = getManifestationsOrderByTypeAndYear(all);
  const filteredAndSortedManifestations = filterManifestationsByType(
    materialType,
    sortedManifestations
  );
  const newestFilteredAndSortedManifestation = first(
    filteredAndSortedManifestations
  );

  if (newestFilteredAndSortedManifestation) {
    return newestFilteredAndSortedManifestation;
  }
  // Fallback returning best representation.
  return bestRepresentation;
};

// ************** VITEST ***************
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("divideManifestationsByMaterialType", () => {
    it("should divide manifestations by material type", () => {
      const {
        divideManifestationsByMaterialType: { manifestations }
      } = vitestData;

      const dividedManifestations =
        divideManifestationsByMaterialType(manifestations);

      expect(dividedManifestations).toMatchSnapshot();
    });
  });
}

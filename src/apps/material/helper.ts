import { compact, groupBy, uniqBy, uniq, head } from "lodash";
import { UseQueryOptions } from "react-query";
import {
  getManifestationType,
  orderManifestationsByYear,
  flattenCreators
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
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import {
  AccessTypeCode,
  WorkType
} from "../../core/dbc-gateway/generated/graphql";
import {
  hasCorrectAccessType,
  isArticle
} from "../../components/material/material-buttons/helper";
import { UseConfigFunction } from "../../core/utils/config";
import {
  getAvailabilityV3,
  getHoldingsV3,
  useGetHoldingsV3
} from "../../core/fbs/fbs";
import vitestData from "./__vitest_data__/helper";
import { constructModalId } from "../../core/utils/helpers/modal-helpers";

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
      .map((contributor) => contributor.display)
      .join(" / ") ?? ""
  );
};

export const getManifestationAuthors = (manifestation: Manifestation) => {
  return flattenCreators(manifestation.creators).join(", ") ?? "";
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
      value: workFirstEditionYear,
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
) =>
  manifestations.reduce<{ [key: string]: Manifestation[] }>(
    (result, manifestation) => {
      if (
        !manifestation.materialTypes.length ||
        !manifestation.materialTypes[0].specific
      ) {
        return result;
      }

      // For some reason we sometimes have multiple material types
      // we only want the first one.
      // TODO: Double check with DDF that this is a viable solution.
      const type = manifestation.materialTypes[0].specific;

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

export const isABook = (manifestations: Manifestation[]) => {
  return manifestations.some((manifestation) => {
    return manifestation.materialTypes.some(
      (materialType) =>
        materialType.specific.toLowerCase() === ManifestationMaterialType.book
    );
  });
};

export const getBestMaterialTypeForManifestation = (
  manifestation: Manifestation
) => {
  if (isABook([manifestation])) {
    return ManifestationMaterialType.book;
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
    return ManifestationMaterialType.book;
  }
  return getManifestationsWithMaterialType(work.manifestations.all)[0]
    .materialTypes[0].specific;
};

export const reservationModalId = (faustIds: FaustId[]) => {
  return constructModalId("reservation-modal", faustIds.sort());
};

export const getNumberedSeries = (series: Work["series"]) =>
  series.filter((seriesEntry) => seriesEntry.numberInSeries?.number);

export const getUniqueMovies = (relations: Work["relations"]) => {
  const movies = relations.hasAdaptation.filter((item) =>
    item.ownerWork.workTypes.includes(WorkType.Movie)
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
  hasCorrectAccessType(AccessTypeCode.Physical, manifestations) &&
  !isArticle(manifestations);

// Because we  need to exclude the branches that are blacklisted, we need to use a custom hook to prevent duplicate code
export const getBlacklistedQueryArgs = (
  faustIds: FaustId[],
  config: UseConfigFunction,
  blacklist: "availability" | "pickup"
) => {
  const configKey =
    blacklist === "availability"
      ? "blacklistedAvailabilityBranchesConfig"
      : "blacklistedPickupBranchesConfig";
  const blacklistBranches = config(configKey, {
    transformer: "stringToArray"
  });
  return {
    recordid: faustIds,
    ...(blacklistBranches ? { exclude: blacklistBranches } : {})
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
  options
}: {
  faustIds: FaustId[];
  config: UseConfigFunction;
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHoldingsV3>>>;
  };
}) => {
  const { data, isLoading, isError } = useGetHoldingsV3(
    getBlacklistedQueryArgs(faustIds, config, "pickup"),
    options
  );
  return { data, isLoading, isError };
};

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

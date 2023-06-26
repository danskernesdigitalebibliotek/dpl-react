import { compact, groupBy, uniqBy, uniq, head } from "lodash";
import { UseQueryOptions } from "react-query";
import {
  constructModalId,
  getMaterialTypes,
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

export const filterManifestationByUniqueMaterialType = (
  manifestations: Manifestation[],
  materialType: ManifestationMaterialType
) => {
  return manifestations.filter((item) => {
    return (
      item.materialTypes.length > 0 &&
      item.materialTypes[0].specific === materialType
    );
  });
};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("filterManifestationByUniqueMaterialType", () => {
    const testManifestations = [
      {
        pid: "870970-basis:44504928",
        genreAndForm: ["noveller"],
        source: ["Bibliotekskatalog"],
        languages: {
          main: [
            {
              display: "engelsk",
              isoCode: "eng"
            }
          ]
        },
        titles: {
          main: ["I, Robot (Ved Tricia Reilly)"],
          original: []
        },
        fictionNonfiction: {
          display: "skønlitteratur",
          code: "FICTION"
        },
        materialTypes: [
          {
            specific: "lyd (cd)"
          },
          {
            specific: "bog"
          }
        ],
        creators: [
          {
            display: "Isaac Asimov",
            __typename: "Person"
          },
          {
            display: "Tricia Reilly",
            __typename: "Person"
          }
        ],
        publisher: ["Macmillan"],
        identifiers: [
          {
            value: "9780230026810"
          },
          {
            value: "9780230026827"
          }
        ],
        contributors: [],
        edition: {
          summary: "2008",
          publicationYear: {
            display: "2008"
          }
        },
        dateFirstEdition: {
          display: "1950",
          year: 1950
        },
        audience: {
          generalAudience: []
        },
        physicalDescriptions: [
          {
            numberOfPages: 95,
            playingTime: "2t., 31 min."
          }
        ],
        accessTypes: [
          {
            code: "PHYSICAL"
          }
        ],
        access: [
          {
            __typename: "InterLibraryLoan",
            loanIsPossible: true
          }
        ],
        shelfmark: {
          postfix: "Asimov",
          shelfmark: "83.8"
        },
        workYear: {
          year: 1950
        }
      },
      {
        pid: "870970-basis:23798255",
        genreAndForm: ["noveller"],
        source: ["Bibliotekskatalog"],
        languages: {
          main: [
            {
              display: "engelsk",
              isoCode: "eng"
            }
          ]
        },
        titles: {
          main: ["I, Robot (Oxford bookworms library, ved Rowena Akinyemi)"],
          original: []
        },
        fictionNonfiction: {
          display: "skønlitteratur",
          code: "FICTION"
        },
        materialTypes: [
          {
            specific: "bog"
          }
        ],
        creators: [
          {
            display: "Isaac Asimov",
            __typename: "Person"
          }
        ],
        publisher: ["Oxford University Press"],
        identifiers: [
          {
            value: "0-19-423069-4"
          }
        ],
        contributors: [],
        edition: {
          summary: "2. edition, 2000",
          publicationYear: {
            display: "2000"
          }
        },
        dateFirstEdition: null,
        audience: {
          generalAudience: []
        },
        physicalDescriptions: [
          {
            numberOfPages: 104,
            playingTime: null
          }
        ],
        accessTypes: [
          {
            code: "PHYSICAL"
          }
        ],
        access: [
          {
            __typename: "InterLibraryLoan",
            loanIsPossible: true
          }
        ],
        shelfmark: {
          postfix: "Asimov",
          shelfmark: "83.8"
        },
        workYear: null
      }
    ];

    const testManifestation = [
      {
        pid: "150061-ebog:ODN0000039136",
        genreAndForm: [],
        source: ["eReolen Global"],
        languages: {
          main: [
            {
              display: "engelsk",
              isoCode: "eng"
            }
          ]
        },
        titles: {
          main: ["I, Robot"],
          original: []
        },
        fictionNonfiction: {
          display: "skønlitteratur",
          code: "FICTION"
        },
        materialTypes: [
          {
            specific: "e-bog"
          }
        ],
        creators: [
          {
            display: "Isaac Asimov",
            __typename: "Person"
          }
        ],
        publisher: [],
        identifiers: [
          {
            value: "9780553900330"
          }
        ],
        contributors: [],
        edition: {
          summary: "2004",
          publicationYear: {
            display: "2004"
          }
        },
        dateFirstEdition: null,
        audience: {
          generalAudience: [
            "Text Difficulty 3 - Text Difficulty 5",
            "UG/Upper grades (9th-12)",
            "820. Lexile",
            "6.1. ATOS Level"
          ]
        },
        physicalDescriptions: [
          {
            numberOfPages: null,
            playingTime: null
          }
        ],
        accessTypes: [
          {
            code: "ONLINE"
          }
        ],
        access: [
          {
            __typename: "AccessUrl",
            origin: "link.overdrive.com",
            url: "http://link.overdrive.com/?websiteID=100515&titleID=39136",
            loginRequired: false
          },
          {
            __typename: "AccessUrl",
            origin: "samples.overdrive.com",
            url: "https://samples.overdrive.com/?crid=9AB7D235-9D58-4180-8DF3-57A4A60CD51E&.epub-sample.overdrive.com",
            loginRequired: false
          },
          {
            __typename: "AccessUrl",
            origin: "img1.od-cdn.com",
            url: "https://img1.od-cdn.com/ImageType-100/0111-1/%7B9AB7D235-9D58-4180-8DF3-57A4A60CD51E%7DImg100.jpg",
            loginRequired: false
          },
          {
            __typename: "AccessUrl",
            origin: "img1.od-cdn.com",
            url: "https://img1.od-cdn.com/ImageType-200/0111-1/%7B9AB7D235-9D58-4180-8DF3-57A4A60CD51E%7DImg200.jpg",
            loginRequired: false
          }
        ],
        shelfmark: null,
        workYear: null
      }
    ];

    it("with several manifestations", () => {
      const filteredManifestations = filterManifestationByUniqueMaterialType(
        testManifestations as Manifestation[],
        "bog" as ManifestationMaterialType
      );
      expect(filteredManifestations).toHaveLength(1);
      expect(filteredManifestations).toMatchSnapshot();
    });

    it("with one manifestation", () => {
      const filteredManifestation = filterManifestationByUniqueMaterialType(
        testManifestation as Manifestation[],
        "e-bog" as ManifestationMaterialType
      );
      expect(filteredManifestation).toHaveLength(1);
      expect(filteredManifestation).toMatchSnapshot();
    });
  });
}

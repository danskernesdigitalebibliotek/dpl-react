import { Factory } from "fishery";
import type { GetMaterialQuery } from "../../src/core/dbc-gateway/generated/graphql";
import {
  FictionNonfictionCodeEnum,
  AccessTypeCodeEnum
} from "../../src/core/dbc-gateway/generated/graphql";

export const materialFactory = Factory.define<GetMaterialQuery>(() => ({
  __typename: "Query",
  work: {
    __typename: "Work",
    workId: "work-of:870970-basis:52557240",
    abstract: [
      "Pa Salt dør og hans seks adoptivdøtre står tilbage med muligheden for at finde deres ophav."
    ],
    genreAndForm: ["roman", "slægtsromaner", "romaner"],
    materialTypes: [
      {
        __typename: "MaterialType",
        materialTypeSpecific: {
          __typename: "SpecificMaterialType",
          display: "bog"
        }
      }
    ],
    creators: [
      {
        __typename: "Person",
        nameSort: "Riley, Lucinda",
        display: "Lucinda Riley"
      }
    ],
    mainLanguages: [
      {
        __typename: "Language",
        display: "dansk",
        isoCode: "dan"
      }
    ],
    subjects: {
      __typename: "SubjectContainer",
      all: [],
      dbcVerified: []
    },
    fictionNonfiction: {
      __typename: "FictionNonfiction",
      display: "skønlitteratur",
      code: FictionNonfictionCodeEnum.Fiction
    },
    dk5MainEntry: {
      __typename: "DK5MainEntry",
      display: "Skønlitteratur",
      code: "82"
    },
    relations: {
      __typename: "Relations",
      hasReview: [
        {
          __typename: "Manifestation",
          pid: "150005-anmeld:81092"
        },
        {
          __typename: "Manifestation",
          pid: "870976-anmeld:129471824"
        },
        {
          __typename: "Manifestation",
          pid: "870971-anmeld:37104132"
        }
      ],
      hasAdaptation: []
    },
    titles: {
      __typename: "WorkTitles",
      full: ["De syv søstre : Maias historie"],
      original: ["The seven sisters"],
      tvSeries: null
    },
    series: [
      {
        __typename: "Series",
        title: "De syv søstre-serien",
        isPopular: true,
        readThisFirst: true,
        readThisWhenever: null,
        members: [
          {
            __typename: "SerieWork",
            numberInSeries: "Del 1",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:52557240",
              titles: {
                __typename: "WorkTitles",
                main: ["De syv søstre"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 2",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:52970628",
              titles: {
                __typename: "WorkTitles",
                main: ["Stormsøsteren"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 3",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:53280749",
              titles: {
                __typename: "WorkTitles",
                main: ["Skyggesøsteren"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 4",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:53802001",
              titles: {
                __typename: "WorkTitles",
                main: ["Perlesøsteren"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 5",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:54189141",
              titles: {
                __typename: "WorkTitles",
                main: ["Månesøsteren"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 6",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:46656172",
              titles: {
                __typename: "WorkTitles",
                main: ["Solsøsteren"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 7",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:38500775",
              titles: {
                __typename: "WorkTitles",
                main: ["Den forsvundne søster"]
              }
            }
          },
          {
            __typename: "SerieWork",
            numberInSeries: "Del 8",
            work: {
              __typename: "Work",
              workId: "work-of:870970-basis:134823658",
              titles: {
                __typename: "WorkTitles",
                main: ["Atlas"]
              }
            }
          }
        ]
      }
    ],
    workYear: {
      __typename: "PublicationYear",
      year: 2016
    },
    manifestations: {
      __typename: "Manifestations",
      all: [
        {
          __typename: "Manifestation",
          pid: "870970-basis:52557240",
          genreAndForm: ["roman", "slægtsromaner"],
          source: ["Bibliotekskatalog"],
          languages: {
            __typename: "Languages",
            main: [
              {
                __typename: "Language",
                display: "dansk",
                isoCode: "dan"
              }
            ],
            notes: []
          },
          titles: {
            __typename: "ManifestationTitles",
            main: ["De syv søstre"],
            original: ["The seven sisters"]
          },
          fictionNonfiction: {
            __typename: "FictionNonfiction",
            display: "skønlitteratur",
            code: FictionNonfictionCodeEnum.Fiction
          },
          materialTypes: [
            {
              __typename: "MaterialType",
              materialTypeSpecific: {
                __typename: "SpecificMaterialType",
                display: "bog"
              }
            }
          ],
          creators: [
            {
              __typename: "Person",
              display: "Lucinda Riley",
              nameSort: "Riley, Lucinda"
            }
          ],
          publisher: ["Cicero"],
          identifiers: [
            {
              __typename: "Identifier",
              value: "9788763844116"
            }
          ],
          contributors: [
            {
              __typename: "Person",
              display: "Ulla Lauridsen",
              roles: [
                {
                  __typename: "Role",
                  function: {
                    __typename: "Translation",
                    singular: "oversætter"
                  }
                }
              ]
            }
          ],
          edition: {
            __typename: "Edition",
            summary: "1. udgave, 2016",
            publicationYear: {
              __typename: "PublicationYear",
              display: "2016"
            }
          },
          dateFirstEdition: null,
          audience: {
            __typename: "Audience",
            generalAudience: [],
            ages: [],
            childrenOrAdults: []
          },
          notes: [],
          physicalDescription: {
            __typename: "PhysicalUnitDescription",
            summaryFull: "523 sider",
            numberOfPages: 523
          },
          hostPublication: null,
          manifestationParts: null,
          accessTypes: [
            {
              __typename: "AccessType",
              code: AccessTypeCodeEnum.Physical
            }
          ],
          access: [
            {
              __typename: "InterLibraryLoan",
              loanIsPossible: true
            }
          ],
          catalogueCodes: {
            __typename: "CatalogueCodes",
            nationalBibliography: [],
            otherCatalogues: []
          }
        },
        {
          __typename: "Manifestation",
          pid: "870970-basis:52557240-lydbog",
          genreAndForm: ["roman", "slægtsromaner"],
          source: ["Bibliotekskatalog"],
          languages: {
            __typename: "Languages",
            main: [
              {
                __typename: "Language",
                display: "dansk",
                isoCode: "dan"
              }
            ],
            notes: []
          },
          titles: {
            __typename: "ManifestationTitles",
            main: ["De syv søstre"],
            original: ["The seven sisters"]
          },
          fictionNonfiction: {
            __typename: "FictionNonfiction",
            display: "skønlitteratur",
            code: FictionNonfictionCodeEnum.Fiction
          },
          materialTypes: [
            {
              __typename: "MaterialType",
              materialTypeSpecific: {
                __typename: "SpecificMaterialType",
                display: "lydbog"
              }
            }
          ],
          creators: [
            {
              __typename: "Person",
              display: "Lucinda Riley",
              nameSort: "Riley, Lucinda"
            }
          ],
          publisher: ["Cicero"],
          identifiers: [
            {
              __typename: "Identifier",
              value: "9788763844116"
            }
          ],
          contributors: [
            {
              __typename: "Person",
              display: "Ulla Lauridsen",
              roles: [
                {
                  __typename: "Role",
                  function: {
                    __typename: "Translation",
                    singular: "oversætter"
                  }
                }
              ]
            }
          ],
          edition: {
            __typename: "Edition",
            summary: "1. udgave, 2016",
            publicationYear: {
              __typename: "PublicationYear",
              display: "2016"
            }
          },
          dateFirstEdition: null,
          audience: {
            __typename: "Audience",
            generalAudience: [],
            ages: [],
            childrenOrAdults: []
          },
          notes: [],
          physicalDescription: {
            __typename: "PhysicalUnitDescription",
            summaryFull: "523 sider",
            numberOfPages: 523
          },
          hostPublication: null,
          manifestationParts: null,
          accessTypes: [
            {
              __typename: "AccessType",
              code: AccessTypeCodeEnum.Physical
            }
          ],
          access: [
            {
              __typename: "InterLibraryLoan",
              loanIsPossible: true
            }
          ],
          catalogueCodes: {
            __typename: "CatalogueCodes",
            nationalBibliography: [],
            otherCatalogues: []
          }
        }
      ],
      latest: {
        __typename: "Manifestation",
        pid: "870970-basis:52557240",
        genreAndForm: ["roman", "slægtsromaner"],
        source: ["Bibliotekskatalog"],
        publisher: ["Cicero"],
        titles: {
          __typename: "ManifestationTitles",
          main: ["De syv søstre"],
          original: ["The seven sisters"]
        },
        fictionNonfiction: {
          __typename: "FictionNonfiction",
          display: "skønlitteratur",
          code: FictionNonfictionCodeEnum.Fiction
        },
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "bog"
            }
          }
        ],
        creators: [
          {
            __typename: "Person",
            display: "Lucinda Riley",
            nameSort: "Riley, Lucinda"
          }
        ],
        identifiers: [
          {
            __typename: "Identifier",
            value: "9788763844116"
          }
        ],
        contributors: [],
        edition: {
          __typename: "Edition",
          summary: "1. udgave, 2016",
          publicationYear: {
            __typename: "PublicationYear",
            display: "2016"
          }
        },
        dateFirstEdition: null,
        audience: {
          __typename: "Audience",
          generalAudience: [],
          ages: [],
          childrenOrAdults: []
        },
        notes: [],
        languages: {
          __typename: "Languages",
          notes: [],
          main: [
            {
              __typename: "Language",
              display: "dansk",
              isoCode: "dan"
            }
          ]
        },
        physicalDescription: {
          __typename: "PhysicalUnitDescription",
          summaryFull: "523 sider",
          numberOfPages: 523
        },
        hostPublication: null,
        manifestationParts: null,
        accessTypes: [
          {
            __typename: "AccessType",
            code: AccessTypeCodeEnum.Physical
          }
        ],
        access: [
          {
            __typename: "InterLibraryLoan",
            loanIsPossible: true
          }
        ],
        shelfmark: null,
        workYear: null,
        catalogueCodes: {
          __typename: "CatalogueCodes",
          nationalBibliography: [],
          otherCatalogues: []
        }
      },
      bestRepresentation: {
        __typename: "Manifestation",
        pid: "870970-basis:52557240",
        genreAndForm: ["roman", "slægtsromaner"],
        source: ["Bibliotekskatalog"],
        publisher: ["Cicero"],
        titles: {
          __typename: "ManifestationTitles",
          main: ["De syv søstre"],
          original: ["The seven sisters"]
        },
        fictionNonfiction: {
          __typename: "FictionNonfiction",
          display: "skønlitteratur",
          code: FictionNonfictionCodeEnum.Fiction
        },
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "bog"
            }
          }
        ],
        creators: [
          {
            __typename: "Person",
            display: "Lucinda Riley",
            nameSort: "Riley, Lucinda"
          }
        ],
        identifiers: [
          {
            __typename: "Identifier",
            value: "9788763844116"
          }
        ],
        contributors: [],
        edition: {
          __typename: "Edition",
          summary: "1. udgave, 2016",
          publicationYear: {
            __typename: "PublicationYear",
            display: "2016"
          }
        },
        dateFirstEdition: null,
        audience: {
          __typename: "Audience",
          generalAudience: [],
          ages: [],
          childrenOrAdults: []
        },
        notes: [],
        languages: {
          __typename: "Languages",
          notes: [],
          main: [
            {
              __typename: "Language",
              display: "dansk",
              isoCode: "dan"
            }
          ]
        },
        physicalDescription: {
          __typename: "PhysicalUnitDescription",
          summaryFull: "523 sider",
          numberOfPages: 523
        },
        hostPublication: null,
        manifestationParts: null,
        accessTypes: [
          {
            __typename: "AccessType",
            code: AccessTypeCodeEnum.Physical
          }
        ],
        access: [
          {
            __typename: "InterLibraryLoan",
            loanIsPossible: true
          }
        ],
        shelfmark: null,
        workYear: null,
        catalogueCodes: {
          __typename: "CatalogueCodes",
          nationalBibliography: [],
          otherCatalogues: []
        }
      }
    }
  }
}));

import { TOKEN_LIBRARY_KEY } from "../../core/token";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const wednesday20220603 = new Date("2023-01-09T10:00:00.000").getTime();

      // Sets time to a specific date
      // https://github.com/cypress-io/cypress/issues/7577
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cy.clock(wednesday20220603).then((clock: any) => clock.bind(window));
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });

    cy.intercept("GET", "**/external/agencyid/patron/patronid/fees/v2**", {
      statusCode: 200,
      body: [
        {
          feeId: 434536,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5237124059",
              recordId: "48724566",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5119382558",
              recordId: "52518563",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5324175956",
              recordId: "38540335",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 434537,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 70,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3275348197",
              recordId: "23790823",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5218297864",
              recordId: "45951685",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 434538,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 120,
          dueDate: "2022-05-08",
          creationDate: "2022-04-06",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "5136106556",
              recordId: "53067034",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            },
            {
              materialItemNumber: "5232011841",
              recordId: "54058969",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 306404,
          type: "fee",
          reasonMessage: "Gebyr (for sent)",
          amount: 2.56,
          dueDate: "2020-04-15",
          creationDate: "2019-10-18",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "3839631447",
              recordId: "26285283",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 377242,
          type: "compensation",
          reasonMessage: "Erstatning (test)",
          amount: 1,
          dueDate: "2021-08-10",
          creationDate: "2021-02-11",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "271358741",
              recordId: "01484524",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        },
        {
          feeId: 411199,
          type: "compensation",
          reasonMessage: "Gebyr (for sent)",
          amount: 1.5,
          dueDate: "2021-12-24",
          creationDate: "2021-11-24",
          paidDate: null,
          payableByClient: true,
          materials: [
            {
              materialItemNumber: "262088571",
              recordId: "06964206",
              periodical: null,
              materialGroup: {
                name: "standard",
                description: "31 dages lånetid til alm lånere"
              }
            }
          ]
        }
      ]
    }).as("fees");

    cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
      statusCode: 200,
      body: [
        {
          isRenewable: true,
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250682,
            materialItemNumber: "5169457737",
            recordId: "53667546",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvd",
              description: "7 dages lån (DVD) - må fjernlånes"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250752,
            materialItemNumber: "3847033184",
            recordId: "29048363",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvC+",
              description: "7 dages lån, Brugsret C+ (må fjernlånes)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250902,
            materialItemNumber: "5355351922",
            recordId: "61343164",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14dag-",
              description: "14 dages lån - bogligt (kan ikke reserveres)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250955,
            materialItemNumber: "3842702665",
            recordId: "27002889",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-09",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250995,
            materialItemNumber: "5258769238",
            recordId: "45000710",
            periodical: {
              volume: null,
              volumeYear: "2020",
              displayText: "2020, nr. 10",
              volumeNumber: "10"
            },
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "uindb",
              description: "Enkeltnumre, tidsskrifter"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251037,
            materialItemNumber: "3843984400",
            recordId: "27145167",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-02-08",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251161,
            materialItemNumber: "5122407464",
            recordId: "53387152",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251183,
            materialItemNumber: "281616471",
            recordId: "23314363",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251700,
            materialItemNumber: "281165054",
            recordId: "22110012",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956437153,
            materialItemNumber: "3849829296",
            recordId: "50774678",
            periodical: null,
            loanDate: "2022-12-18 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956437159,
            materialItemNumber: "3849829342",
            recordId: "50717119",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-11",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442257,
            materialItemNumber: "5140649521",
            recordId: "53298540",
            periodical: null,
            loanDate: "2022-12-18 08:15:11+0000",
            dueDate: "2023-01-12",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442283,
            materialItemNumber: "5140691269",
            recordId: "54867603",
            periodical: null,
            loanDate: "2022-12-17 08:15:11+0000",
            dueDate: "2023-01-13",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442326,
            materialItemNumber: "5043822103",
            recordId: "52109469",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442354,
            materialItemNumber: "3846848397",
            recordId: "29514690",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-15",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14av",
              description: "14 dages lån - især spil men f.eks. også julemusik"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442399,
            materialItemNumber: "5043689640",
            recordId: "49421257",
            periodical: {
              volume: null,
              volumeYear: "2015",
              displayText: "Nr. , år 2015",
              volumeNumber: null
            },
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-15",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442465,
            materialItemNumber: "5258677163",
            recordId: "42694274",
            periodical: {
              volume: null,
              volumeYear: "2020",
              displayText: "62. udgave 2020",
              volumeNumber: "62. udgave"
            },
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442515,
            materialItemNumber: "3841518429",
            recordId: "27215815",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "lydbog",
              description: "Lydbog"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956235757,
            materialItemNumber: "5367667038",
            recordId: "62128216",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "interLibraryLoan",
            ilBibliographicRecord: {
              author: "Johannessen, Charlotte U.",
              bibliographicCategory: "mono",
              edition: "2. utgave",
              isbn: "9788244624312",
              issn: null,
              language: "nor",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "Oslo",
              publicationDate: "2022",
              publicationDateOfComponent: null,
              publisher: "KF",
              recordId: "62128216",
              title:
                "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
            },
            materialGroup: {
              name: "fje",
              description: "Fjernlån 31 dage"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956235786,
            materialItemNumber: "5355604456",
            recordId: "61609644",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "interLibraryLoan",
            ilBibliographicRecord: {
              author: "Davidson, Anna",
              bibliographicCategory: "mono",
              edition: "1. American edition",
              isbn: "9780744042085",
              issn: null,
              language: "eng",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "New York",
              publicationDate: "2021",
              publicationDateOfComponent: null,
              publisher: "DK",
              recordId: "61609644",
              title:
                "How to raise a global citizen : for the parents of the children who will save the world"
            },
            materialGroup: {
              name: "fje",
              description: "Fjernlån 31 dage"
            }
          }
        },
        {
          isRenewable: true,
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250508,
            materialItemNumber: "3846990827",
            recordId: "28847238",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "fon2",
              description: "Flere CD-plader"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250682,
            materialItemNumber: "5169457737",
            recordId: "53667546",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvd",
              description: "7 dages lån (DVD) - må fjernlånes"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: [],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250752,
            materialItemNumber: "3847033184",
            recordId: "29048363",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "7dvC+",
              description: "7 dages lån, Brugsret C+ (må fjernlånes)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedMaxRenewalsReached"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250902,
            materialItemNumber: "5355351922",
            recordId: "61343164",
            periodical: null,
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14dag-",
              description: "14 dages lån - bogligt (kan ikke reserveres)"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250955,
            materialItemNumber: "3842702665",
            recordId: "27002889",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-09",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956250995,
            materialItemNumber: "5258769238",
            recordId: "45000710",
            periodical: {
              volume: null,
              volumeYear: "2020",
              displayText: "2020, nr. 10",
              volumeNumber: "10"
            },
            loanDate: "2022-12-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "uindb",
              description: "Enkeltnumre, tidsskrifter"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251037,
            materialItemNumber: "3843984400",
            recordId: "27145167",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-02-08",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251161,
            materialItemNumber: "5122407464",
            recordId: "53387152",
            periodical: null,
            loanDate: "2023-01-09 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251183,
            materialItemNumber: "281616471",
            recordId: "23314363",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956251700,
            materialItemNumber: "281165054",
            recordId: "22110012",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956437153,
            materialItemNumber: "3849829296",
            recordId: "50774678",
            periodical: null,
            loanDate: "2022-12-18 08:15:11+0000",
            dueDate: "2023-01-10",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956437159,
            materialItemNumber: "3849829342",
            recordId: "50717119",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-11",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442257,
            materialItemNumber: "5140649521",
            recordId: "53298540",
            periodical: null,
            loanDate: "2022-12-18 08:15:11+0000",
            dueDate: "2023-01-12",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442283,
            materialItemNumber: "5140691269",
            recordId: "54867603",
            periodical: null,
            loanDate: "2022-12-17 08:15:11+0000",
            dueDate: "2023-01-13",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442326,
            materialItemNumber: "5043822103",
            recordId: "52109469",
            periodical: null,
            loanDate: "2023-01-02 08:15:11+0000",
            dueDate: "2023-01-14",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442354,
            materialItemNumber: "3846848397",
            recordId: "29514690",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-15",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "14av",
              description: "14 dages lån - især spil men f.eks. også julemusik"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442399,
            materialItemNumber: "5043689640",
            recordId: "49421257",
            periodical: {
              volume: null,
              volumeYear: "2015",
              displayText: "Nr. , år 2015",
              volumeNumber: null
            },
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-15",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: true,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442465,
            materialItemNumber: "5258677163",
            recordId: "42694274",
            periodical: {
              volume: null,
              volumeYear: "2020",
              displayText: "62. udgave 2020",
              volumeNumber: "62. udgave"
            },
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-02",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "standard",
              description: "31 dages lånetid til alm lånere"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956442515,
            materialItemNumber: "3841518429",
            recordId: "27215815",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "loan",
            ilBibliographicRecord: null,
            materialGroup: {
              name: "lydbog",
              description: "Lydbog"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956235757,
            materialItemNumber: "5367667038",
            recordId: "62128216",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "interLibraryLoan",
            ilBibliographicRecord: {
              author: "Johannessen, Charlotte U.",
              bibliographicCategory: "mono",
              edition: "2. utgave",
              isbn: "9788244624312",
              issn: null,
              language: "nor",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "Oslo",
              publicationDate: "2022",
              publicationDateOfComponent: null,
              publisher: "KF",
              recordId: "62128216",
              title:
                "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
            },
            materialGroup: {
              name: "fje",
              description: "Fjernlån 31 dage"
            }
          }
        },
        {
          isRenewable: false,
          renewalStatusList: ["deniedOtherReason"],
          isLongtermLoan: false,
          loanDetails: {
            loanId: 956235786,
            materialItemNumber: "5355604456",
            recordId: "61609644",
            periodical: null,
            loanDate: "2023-01-07 08:15:11+0000",
            dueDate: "2023-01-16",
            loanType: "interLibraryLoan",
            ilBibliographicRecord: {
              author: "Davidson, Anna",
              bibliographicCategory: "mono",
              edition: "1. American edition",
              isbn: "9780744042085",
              issn: null,
              language: "eng",
              mediumType: "a xx",
              periodicalNumber: null,
              periodicalVolume: null,
              placeOfPublication: "New York",
              publicationDate: "2021",
              publicationDateOfComponent: null,
              publisher: "DK",
              recordId: "61609644",
              title:
                "How to raise a global citizen : for the parents of the children who will save the world"
            },
            materialGroup: {
              name: "fje",
              description: "Fjernlån 31 dage"
            }
          }
        }
      ]
    }).as("loans");

    cy.intercept(
      "GET",
      "**/external/v1/agencyid/patrons/patronid/reservations/v2**",
      {
        statusCode: 200,
        body: [
          {
            reservationId: 67804976,
            recordId: "46985591",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-09-21",
            dateOfReservation: "2022-06-14T09:00:50.059",
            numberInQueue: 1,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "c6742151-f4a7-4655-a94f-7bd6a0009431",
            reservationType: "normal"
          },
          {
            reservationId: 67805006,
            recordId: "39429977",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T09:01:36.523",
            numberInQueue: 2,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "13c3f730-b71c-4164-bc41-b439ce9bf115",
            reservationType: "normal"
          },
          {
            reservationId: 67807688,
            recordId: "20401206",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-11",
            dateOfReservation: "2022-06-14T10:19:23.429",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2018",
              displayText: "2018, nr. 9",
              volumeNumber: "9"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "634696e7-f5b2-49ae-8038-6546c5943f85",
            reservationType: "normal"
          },
          {
            reservationId: 67842154,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:01:48.102",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2022",
              displayText: "2022, 03, April-Maj#Forårshaven",
              volumeNumber: "03, April-Maj#Forårshaven"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "b5a3f150-e45c-4cce-952e-ed6edc553eab",
            reservationType: "normal"
          },
          {
            reservationId: 67842199,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:10.578",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5, Juni-Juli",
              volumeNumber: "5, Juni-Juli"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "76288332-23f6-4d29-8edc-8dbf9937d8fc",
            reservationType: "normal"
          },
          {
            reservationId: 67842207,
            recordId: "42825115",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:03:41.134",
            numberInQueue: 1,
            periodical: {
              volume: null,
              volumeYear: "2021",
              displayText: "2021, 5#Sommerens blomster",
              volumeNumber: "5#Sommerens blomster"
            },
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "49429a5f-f63e-4221-a96a-dc7aa27c5ec0",
            reservationType: "normal"
          },
          {
            reservationId: 67843684,
            recordId: "62448784",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:37:31.768",
            numberInQueue: 4,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cfac37ef-564e-423d-a491-3d64f4c383d1",
            reservationType: "normal"
          },
          {
            reservationId: 67843804,
            recordId: "62623462",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:40:27.055",
            numberInQueue: 59,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "163bbc01-2a07-4f29-be98-d65ddeadb1ba",
            reservationType: "normal"
          },
          {
            reservationId: 67789642,
            recordId: "48991963",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-21",
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-13T17:08:58.505",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 74",
            ilBibliographicRecord: null,
            transactionId: "480fc2fe-5b19-49bc-a206-6e306c2a2a56",
            reservationType: "normal"
          },
          {
            reservationId: 67789646,
            recordId: "61840974",
            state: "readyForPickup",
            pickupBranch: "DK-775100",
            pickupDeadline: "2022-06-20",
            expiryDate: "2022-10-10",
            dateOfReservation: "2022-06-13T17:09:20.695",
            numberInQueue: null,
            periodical: null,
            pickupNumber: "Reserveringshylde 115",
            ilBibliographicRecord: null,
            transactionId: "ce9673fb-0bc2-4211-b2c1-bb1a4114ed57",
            reservationType: "normal"
          },
          {
            reservationId: 67843846,
            recordId: "62485124",
            state: "reserved",
            pickupBranch: "DK-775100",
            pickupDeadline: null,
            expiryDate: "2022-12-12",
            dateOfReservation: "2022-06-15T11:41:24.075",
            numberInQueue: 206,
            periodical: null,
            pickupNumber: null,
            ilBibliographicRecord: null,
            transactionId: "cae4db22-e267-4087-bdaa-d880bef19b52",
            reservationType: "normal"
          }
        ]
      }
    ).as("reservations");

    cy.visit("/iframe.html?id=apps-dashboard--dash-board-entry&viewMode=story");
    cy.wait(["@fees", "@loans", "@reservations"]);
  });

  it("Dashboard", () => {
    cy.get("#root")
      .find("h1")
      .eq(0)
      .should("exist")
      .should("have.text", "Din profil");

    // Fees
    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Mellemværender");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find(".link-filters__counter")
      .should("exist")
      .should("have.text", "6");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__left")
      .find(".warning-bar__icon")
      .find("img")
      .should("exist");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__left")
      .find("div")
      .eq(1)
      .find("a")
      .should("exist")
      .should("have.text", "Du skylder i alt");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__right")
      .find(".warning-bar__owes")
      .should("exist")
      .should("have.text", "265.06,-");

    cy.get("#root")
      .find(".fee-container")
      .find("div")
      .find(".status-userprofile__column")
      .find(".warning-bar")
      .find(".warning-bar__right")
      .find("button")
      .should("exist")
      .should("have.text", "Se mere");

    // Physical loans
    // header
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Fysiske lån");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(0)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("span")
      .should("exist")
      .should("have.text", "42");

    // Returned too late
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "6");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Afleveret for sent");

    // To be returned soon
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "22");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Afleveres snart");

    // Some time until has to be returned
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(2)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "14");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .should("exist")
      .find(".m-24")
      .eq(2)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Længere afleveringstid");

    // Reservations loans
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("a")
      .should("exist")
      .should("have.text", "Reserveringer");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".link-filters")
      .find(".link-filters__tag-wrapper")
      .find("span")
      .should("exist")
      .should("have.text", "11");

    // Returned too late
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "2");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(0)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Klar til dig");

    // To be returned soon
    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".number")
      .should("exist")
      .should("have.text", "9");

    cy.get("#root")
      .find(".status-userprofile")
      .find(".status-userprofile__column")
      .eq(1)
      .should("exist")
      .find(".m-24")
      .eq(1)
      .find(".list-dashboard")
      .find(".list-dashboard__title")
      .should("exist")
      .should("have.text", "Stadig i kø");
  });
});

export {};

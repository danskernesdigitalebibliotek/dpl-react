import { TOKEN_LIBRARY_KEY } from "../../../core/token";

describe("Pagination test", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
    });
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-09-06",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-09-06",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-10",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-08-29",
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
            loanDate: "2022-08-29 08:52:41+0000",
            dueDate: "2022-09-05",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-08-29",
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
            loanDate: "2022-09-05 08:52:41+0000",
            dueDate: "2022-10-05",
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
            loanDate: "2022-09-05 08:52:41+0000",
            dueDate: "2022-09-12",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-12",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-12",
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
            loanDate: "2022-08-14 08:52:41+0000",
            dueDate: "2022-09-06",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-07",
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
            loanDate: "2022-08-14 08:52:41+0000",
            dueDate: "2022-09-08",
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
            loanDate: "2022-08-13 08:52:41+0000",
            dueDate: "2022-09-09",
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
            loanDate: "2022-08-29 08:52:41+0000",
            dueDate: "2022-09-10",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-11",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-11",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-08-29",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-12",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-06-30",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-08-27",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-08-28",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-08-31",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-03",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-09-01",
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
            loanDate: "2022-08-29 08:52:41+0000",
            dueDate: "2022-09-05",
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
            loanDate: "2022-08-03 08:52:41+0000",
            dueDate: "2022-08-29",
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
            loanDate: "2022-09-05 08:52:41+0000",
            dueDate: "2022-09-16",
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
            loanDate: "2022-09-05 08:52:41+0000",
            dueDate: "2022-09-17",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-12",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-11-21",
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
            loanDate: "2022-08-14 08:52:41+0000",
            dueDate: "2022-09-23",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-26",
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
            loanDate: "2022-08-14 08:52:41+0000",
            dueDate: "2022-10-07",
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
            loanDate: "2022-08-13 08:52:41+0000",
            dueDate: "2022-09-09",
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
            loanDate: "2022-08-29 08:52:41+0000",
            dueDate: "2022-09-10",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-11",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-11-05",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-08-29",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-10-02",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-22",
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
            loanDate: "2022-09-03 08:52:41+0000",
            dueDate: "2022-09-13",
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
    cy.intercept("POST", "**/opac/**", {
      statusCode: 200,
      body: {
        data: {
          manifestation: {
            pid: "870970-basis:27215815",
            titles: { main: ["Dummy Some Title"] },
            abstract: ["Dummy Some abstract ..."],
            hostPublication: { year: { year: 2006 } },
            materialTypes: [{ specific: "Dummy bog" }],
            creators: [
              { display: "Dummy Jens Jensen" },
              { display: "Dummy Some Corporation" }
            ]
          }
        }
      }
    }).as("work");
    cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
    cy.wait(["@loans", "@work"]);
  });

  it("Pagination list view", () => {
    cy.get(".list-reservation").should("have.length", 25);
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get(".result-pager__title").contains("25");
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager").find("button").click();
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.wait(["@work"]);
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager__title").contains("25").should("not.exist");
    cy.get(".list-reservation").should("have.length", 42);
  });

  it("Pagination stack view", () => {
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get("#test-stack").click();
    cy.get(".result-pager__title").contains("41");
    cy.get(".result-pager__title").contains("42");
    cy.get(".list-reservation").should("have.length", 25);
    cy.get(".list-reservation")
      .eq(0)
      .should("have.class", "list-reservation--stacked")
      .contains("+ 2 andre materialer");

    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.get(".result-pager").find("button").click();
    cy.get("body").scrollTo("bottom", {
      duration: 50,
      ensureScrollable: false
    });
    cy.wait(["@work"]);
    cy.get(".result-pager__title").contains("42");
    cy.get(".result-pager__title").contains("41").should("not.exist");
  });
});
export {};

// Todo - these will be re-added
// import { TOKEN_LIBRARY_KEY } from "../../../core/token";

// describe("Loan list", () => {
//   beforeEach(() => {
//     cy.window().then((win) => {
//       win.sessionStorage.setItem(TOKEN_LIBRARY_KEY, "random-token");
//     });
//   });

//   it("Loads loan list with loan overdue", () => {
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);
//     cy.get(".list-reservation").should(
//       "have.text",
//       "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Du pålægges et gebyr, når materialet afleveres0dageOverskredetAfleveres 14-07-2022Du pålægges et gebyr, når materialet afleveres"
//     );
//   });

//   it("Loads loan list with material with warning", () => {
//     const wednesday20220713 = new Date("2022-07-13T12:30:00.000Z");

//     // Sets time to a specific date, in this case 2022-07-13
//     cy.clock(wednesday20220713);
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get(".list-reservation").should(
//       "have.text",
//       "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)1dageUdløber snartAfleveres 14-07-2022"
//     );
//   });

//   it("Loads loan list with material with without warning", () => {
//     const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

//     // Sets time to a specific date, in this case 2022-07-07
//     cy.clock(thursday20220707);
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get(".list-reservation").should(
//       "have.text",
//       "Dummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)7dageAfleveres 14-07-2022"
//     );
//   });

//   it("Loads loan list and stacks material with same duedate", () => {
//     const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

//     // Sets time to a specific date, in this case 2022-07-07
//     cy.clock(thursday20220707);
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get(".list-reservation").should("have.length", 2);
//     cy.get("#test-stack").click();
//     cy.get(".list-reservation").should("have.length", 1);
//   });

//   it("It opens modal of materials with same due date", () => {
//     const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

//     // Sets time to a specific date, in this case 2022-07-07
//     cy.clock(thursday20220707);
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956235757,
//             materialItemNumber: "5367667038",
//             recordId: "62128216",
//             periodical: null,
//             loanDate: "2022-06-13T15:30:25.845",
//             dueDate: "2022-07-14",
//             loanType: "interLibraryLoan",
//             ilBibliographicRecord: {
//               author: "Johannessen, Charlotte U.",
//               bibliographicCategory: "mono",
//               edition: "2. utgave",
//               isbn: "9788244624312",
//               issn: null,
//               language: "nor",
//               mediumType: "a xx",
//               periodicalNumber: null,
//               periodicalVolume: null,
//               placeOfPublication: "Oslo",
//               publicationDate: "2022",
//               publicationDateOfComponent: null,
//               publisher: "KF",
//               recordId: "62128216",
//               title:
//                 "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
//             },
//             materialGroup: {
//               name: "fje",
//               description: "Fjernlån 31 dage"
//             }
//           }
//         },
//         {
//           isRenewable: true,
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get("#test-stack").click();
//     cy.get("#test-more-materials").click();
//     cy.get(".modal").find(".list-materials").should("have.length", 4);
//     cy.get(".modal")
//       .find("#renew-several")
//       .should("have.text", "Forny mulige (1)");
//     cy.get(".modal")
//       .find(".list-materials")
//       .eq(0)
//       .should(
//         "have.text",
//         "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006) Materialet er reserveret af andreAfleveres \n            14-07-2022"
//       );
//     cy.get(".modal")
//       .find(".list-materials")
//       .eq(1)
//       .should(
//         "have.text",
//         "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Materialet kan ikke fornyes flere gangeAfleveres \n            14-07-2022"
//       );
//     cy.get(".modal")
//       .find(".list-materials")
//       .eq(2)
//       .should(
//         "have.text",
//         "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006) Materialet er reserveret af andreAfleveres \n            14-07-2022"
//       );
//     cy.get(".modal")
//       .find(".list-materials")
//       .eq(3)
//       .should(
//         "have.text",
//         "Vælg element til fornyelseDummy bogDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)Afleveres \n            14-07-2022"
//       );
//   });

//   it("It sorts loan list by loanDate", () => {
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-10T16:43:25.325",
//             dueDate: "2022-07-10",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-11T16:43:25.325",
//             dueDate: "2022-07-11",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956235757,
//             materialItemNumber: "5367667038",
//             recordId: "62128216",
//             periodical: null,
//             loanDate: "2022-06-13T15:30:25.845",
//             dueDate: "2022-07-12",
//             loanType: "interLibraryLoan",
//             ilBibliographicRecord: {
//               author: "Johannessen, Charlotte U.",
//               bibliographicCategory: "mono",
//               edition: "2. utgave",
//               isbn: "9788244624312",
//               issn: null,
//               language: "nor",
//               mediumType: "a xx",
//               periodicalNumber: null,
//               periodicalVolume: null,
//               placeOfPublication: "Oslo",
//               publicationDate: "2022",
//               publicationDateOfComponent: null,
//               publisher: "KF",
//               recordId: "62128216",
//               title:
//                 "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
//             },
//             materialGroup: {
//               name: "fje",
//               description: "Fjernlån 31 dage"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get(".list-reservation")
//       .eq(0)
//       .find("#due-date")
//       .should("have.text", "Afleveres 10-07-2022");
//     cy.get(".list-reservation")
//       .eq(1)
//       .find("#due-date")
//       .should("have.text", "Afleveres 11-07-2022");
//     cy.get(".list-reservation")
//       .eq(2)
//       .find("#due-date")
//       .should("have.text", "Afleveres 12-07-2022");
//   });

//   it("It opens material details modal", () => {
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-10T16:43:25.325",
//             dueDate: "2022-07-10",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get(".list-reservation").eq(0).click();
//     cy.get(".modal-details__container").should(
//       "have.text",
//       "Dummy bogOverskredetDummy Some TitleAf Dummy Jens Jensen og Dummy Some Corporation (2006)forny dit lånAfleveringsdatoen for lånet er overskredet, derfor pålægges du et gebyr, når materialet afleveresLæs mereAfleveres10-07-2022Udlånsdato10-06-2022Materialenummer3846990827"
//     );
//   });

//   it("Renew possible button in due-date modal fixed in bottom", () => {
//     const thursday20220707 = new Date("2022-07-07T12:30:00.000Z");

//     // Sets time to a specific date, in this case 2022-07-07
//     cy.clock(thursday20220707);
//     cy.intercept("GET", "**/external/agencyid/patrons/patronid/loans/v2**", {
//       statusCode: 200,
//       body: [
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedMaxRenewalsReached"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         },
//         {
//           isRenewable: false,
//           renewalStatusList: ["deniedOtherReason"],
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956235757,
//             materialItemNumber: "5367667038",
//             recordId: "62128216",
//             periodical: null,
//             loanDate: "2022-06-13T15:30:25.845",
//             dueDate: "2022-07-14",
//             loanType: "interLibraryLoan",
//             ilBibliographicRecord: {
//               author: "Johannessen, Charlotte U.",
//               bibliographicCategory: "mono",
//               edition: "2. utgave",
//               isbn: "9788244624312",
//               issn: null,
//               language: "nor",
//               mediumType: "a xx",
//               periodicalNumber: null,
//               periodicalVolume: null,
//               placeOfPublication: "Oslo",
//               publicationDate: "2022",
//               publicationDateOfComponent: null,
//               publisher: "KF",
//               recordId: "62128216",
//               title:
//                 "Små barn i sårbare livssituasjoner : hvordan kan barnehagen oppdage, forebygge og hjelpe barn i risiko for omsorgssvikt?"
//             },
//             materialGroup: {
//               name: "fje",
//               description: "Fjernlån 31 dage"
//             }
//           }
//         },
//         {
//           isRenewable: true,
//           isLongtermLoan: false,
//           loanDetails: {
//             loanId: 956250508,
//             materialItemNumber: "3846990827",
//             recordId: "28847238",
//             periodical: null,
//             loanDate: "2022-06-13T16:43:25.325",
//             dueDate: "2022-07-14",
//             loanType: "loan",
//             ilBibliographicRecord: null,
//             materialGroup: {
//               name: "fon2",
//               description: "Flere CD-plader"
//             }
//           }
//         }
//       ]
//     }).as("loans");

//     cy.intercept("POST", "**/opac/**", {
//       statusCode: 200,
//       body: {
//         data: {
//           manifestation: {
//             pid: "870970-basis:27215815",
//             titles: { main: ["Dummy Some Title"] },
//             abstract: ["Dummy Some abstract ..."],
//             hostPublication: { year: { year: 2006 } },
//             materialTypes: [{ specific: "Dummy bog" }],
//             creators: [
//               { display: "Dummy Jens Jensen" },
//               { display: "Dummy Some Corporation" }
//             ]
//           }
//         }
//       }
//     }).as("work");

//     cy.intercept("GET", "**covers**", {
//       statusCode: 200,
//       body: []
//     }).as("cover");
//     cy.visit("/iframe.html?path=/story/apps-loan-list--loan-list-entry");
//     cy.wait(["@loans", "@work", "@cover"]);

//     cy.get("#test-stack").click();
//     cy.get("#test-more-materials").click();
//     cy.get(".modal").find(".modal-loan__buttons").should("exist");
//     cy.get(".modal").find(".modal-loan__buttons--bottom").should("not.exist");
//     // Add duration to scroll, if I don't it scrolls to fast for the eventlistener
//     // to work...
//     cy.get(".modal-loan__container").scrollTo("bottom", { duration: 50 });
//     cy.get(".modal")
//       .find(".modal-loan__buttons")
//       .eq(0)
//       .should("not.be.visible");
//     cy.get(".modal").find(".modal-loan__buttons--bottom").should("exist");
//   });
// });

export {};

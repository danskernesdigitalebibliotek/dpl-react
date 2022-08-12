describe("Search header app", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/opac/graphql", {
      statusCode: 200,
      body: {
        data: {
          suggest: {
            result: [
              {
                type: "TITLE",
                term: "Harry Potter og De Vises Sten",
                work: {
                  workId: "work-of:870970-basis:22629344",
                  titles: { main: ["Harry Potter og De Vises Sten"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:22629344" } }
                }
              },
              {
                type: "SUBJECT",
                term: "Harry Potter",
                work: {
                  workId: "work-of:870970-basis:22677780",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:22677780" } }
                }
              },
              {
                type: "SUBJECT",
                term: "Harry Hole",
                work: {
                  workId: "work-of:870970-basis:53045650",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:53045650" } }
                }
              },
              {
                type: "CREATOR",
                term: "Hartmut Rosa",
                work: {
                  workId: "work-of:870970-basis:50999335",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:50999335" } }
                }
              },
              {
                type: "CREATOR",
                term: "Susan Hart (f. 1956)",
                work: {
                  workId: "work-of:870970-basis:28028881",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:28028881" } }
                }
              },
              {
                type: "TITLE",
                term: "Harry Potter og fangen fra Azkaban",
                work: {
                  workId: "work-of:870970-basis:22995154",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:22995154" } }
                }
              },
              {
                type: "SUBJECT",
                term: "Harry Dresden",
                work: {
                  workId: "work-of:870970-basis:53182623",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:53182623" } }
                }
              },
              {
                type: "TITLE",
                term: "Harry Potter og Fønixordenen",
                work: {
                  workId: "work-of:870970-basis:25245784",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:25245784" } }
                }
              },
              {
                type: "CREATOR",
                term: "Yuval Noah Harari",
                work: {
                  workId: "work-of:870970-basis:51725832",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:51725832" } }
                }
              },
              {
                type: "TITLE",
                term: "Harry Potter and the philosopher's stone",
                work: {
                  workId: "work-of:870970-basis:42042455",
                  titles: { main: ["Dummy Some Title"] },
                  creators: [
                    { display: "Dummy Jens Jensen" },
                    { display: "Dummy Some Corporation" }
                  ],
                  manifestations: { first: { pid: "870970-basis:42042455" } }
                }
              }
            ]
          }
        }
      }
    });
    cy.intercept("GET", "**/covers**", {
      statusCode: 200,
      body: [
        {
          id: "870970-basis:25245784",
          type: "pid",
          imageUrls: {
            small: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886150/bogportalen.dk/9788702029444.jpg",
              format: "jpeg",
              size: "small"
            }
          }
        }
      ]
    });
    cy.visit("/iframe.html?args=viewMode=story&id=apps-search-header--default");
  });

  it("Allows user to write into the search field", () => {
    cy.get(".header__menu-search-input")
      .should("be.visible")
      .focus()
      .type("ad");
  });

  it("Doesn't show suggestions before 3 characters are typed", () => {
    cy.get(".header__menu-search-input").focus().type("ha");
    cy.get(".autosuggest").should("not.be.visible");
    cy.get(".header__menu-search-input").focus().type("r");
    cy.get(".autosuggest").should("be.visible");
  });

  it("Allows use of arrow keys to navigate autosuggest", () => {
    cy.get(".header__menu-search-input").focus().type("harry");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(".header__menu-search-input").focus().type("{downArrow}");
    cy.get("#downshift-0-item-0").should("have.attr", "aria-selected", "true");
  });

  it("Matches text in the search field with highlighted item", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(".header__menu-search-input")
      .focus()
      .type("{downArrow}")
      .should("have.attr", "value", "Harry Potter");
  });

  it("Shows both parts of the autosuggest", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.contains("Harry Potter (emne)");
    cy.contains("Harry Potter og De Vises Sten");
  });

  it("Shows cover pictures for the material suggestions", () => {
    cy.get(".header__menu-search-input").focus().type("har");
    cy.get(".autosuggest__cover>div>span>img").should(
      "have.attr",
      "src",
      "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1543886150/bogportalen.dk/9788702029444.jpg"
    );
  });
});

export {};

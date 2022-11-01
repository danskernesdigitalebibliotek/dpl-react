const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Facet Browser", () => {
  // I have used it.only because it is best practice to have self contained tests
  // https://docs.cypress.io/guides/references/best-practices#Having-tests-rely-on-the-state-of-previous-tests
  it.only("Open facet browser and check if all the facets are there", () => {
    cy.contains(".disclosure__text", "Main languages");
    cy.contains(".disclosure__text", "Access types");
    cy.contains(".disclosure__text", "Children or adults");
    cy.contains(".disclosure__text", "Creators");
    cy.contains(".disclosure__text", "Fiction or nonfiction");
    cy.contains(".disclosure__text", "Genre and form");
    cy.contains(".disclosure__text", "Material types");
    cy.contains(".disclosure__text", "Subjects");
    cy.contains(".disclosure__text", "Work types");
  });

  it.only("Check if Main languages has all its terms", () => {
    cy.contains(".disclosure__text", "Main languages").click();
    cy.contains(".facet-browser__facet-group button", "Engelsk");
    cy.contains(".facet-browser__facet-group button", "flere sprog");
    cy.contains(".facet-browser__facet-group button", "Tysk");
    cy.contains(".facet-browser__facet-group button", "Svensk");
    cy.contains(".facet-browser__facet-group button", "Dansk");
    cy.contains(
      ".facet-browser__facet-group button",
      "Sproget kan ikke bestemmes"
    );
    cy.contains(".facet-browser__facet-group button", "Fransk");
    cy.contains(".facet-browser__facet-group button", "Latin");
    cy.contains(".disclosure__text", "Main languages").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Access types has all its terms", () => {
    cy.contains(".disclosure__text", "Access types").click();
    cy.contains(".facet-browser__facet-group button", "Fysisk");
    cy.contains(".facet-browser__facet-group button", "Digital");
    cy.contains(".disclosure__text", "Access types").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Children or adults has all its terms", () => {
    cy.contains(".disclosure__text", "Children or adults").click();
    cy.contains(".facet-browser__facet-group button", "voksenmaterialer");
    cy.contains(".facet-browser__facet-group button", "børnematerialer");
    cy.contains(".disclosure__text", "Children or adults").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Creators has all its terms", () => {
    cy.contains(".disclosure__text", "Creators").click();
    cy.contains(".facet-browser__facet-group button", "Joanne K. Rowling");
    cy.contains(".facet-browser__facet-group button", "Jo Nesbø");
    cy.contains(".facet-browser__facet-group button", "Harry Haue");
    cy.contains(".facet-browser__facet-group button", "Michael Connelly");
    cy.contains(".facet-browser__facet-group button", "Jon Bokenkamp");
    cy.contains(".facet-browser__facet-group button", "Harry Lahrmann");
    cy.contains(".facet-browser__facet-group button", "Harry Rasmussen");
    cy.contains(".facet-browser__facet-group button", "Harry Søiberg");
    cy.contains(".facet-browser__facet-group button", "Duke Ellington");
    cy.contains(".facet-browser__facet-group button", "Harry Belafonte");
    cy.contains(".disclosure__text", "Creators").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Fiction or nonfiction has all its terms", () => {
    cy.contains(".disclosure__text", "Fiction or nonfiction").click();
    cy.contains(".facet-browser__facet-group button", "Faglitteratur");
    cy.contains(".facet-browser__facet-group button", "Skønlitteratur");
    cy.contains(".disclosure__text", "Fiction or nonfiction").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Genre and form has all its terms", () => {
    cy.contains(".disclosure__text", "Genre and form").click();
    cy.contains(".facet-browser__facet-group button", "jazz");
    cy.contains(".facet-browser__facet-group button", "rock");
    cy.contains(".facet-browser__facet-group button", "krimi");
    cy.contains(".facet-browser__facet-group button", "swing");
    cy.contains(".facet-browser__facet-group button", "evergreen");
    cy.contains(
      ".facet-browser__facet-group button",
      "filmmusik - soundtracks"
    );
    cy.contains(".facet-browser__facet-group button", "pop");
    cy.contains(".facet-browser__facet-group button", "tv-serier");
    cy.contains(
      ".facet-browser__facet-group button",
      "eventyrlige fortællinger"
    );
    cy.contains(".facet-browser__facet-group button", "jazz-dansk");
    cy.contains(".disclosure__text", "Genre and form").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Material types has all its terms", () => {
    cy.contains(".disclosure__text", "Material types").click();
    cy.contains(".facet-browser__facet-group button", "bog");
    cy.contains(".facet-browser__facet-group button", "cd (musik)");
    cy.contains(".facet-browser__facet-group button", "grammofonplade");
    cy.contains(".facet-browser__facet-group button", "artikel");
    cy.contains(".facet-browser__facet-group button", "dvd");
    cy.contains(".facet-browser__facet-group button", "node");
    cy.contains(".facet-browser__facet-group button", "e-bog");
    cy.contains(".facet-browser__facet-group button", "bånd");
    cy.contains(".facet-browser__facet-group button", "tidsskriftsartikel");
    cy.contains(".facet-browser__facet-group button", "blu-ray");
    cy.contains(".disclosure__text", "Material types").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Subject has all its terms", () => {
    cy.contains(".disclosure__text", "Subject").click();
    cy.contains(".facet-browser__facet-group button", "vokal");
    cy.contains(".facet-browser__facet-group button", "instrumental");
    cy.contains(".facet-browser__facet-group button", "jazz");
    cy.contains(".facet-browser__facet-group button", "rock");
    cy.contains(".facet-browser__facet-group button", "Harry Potter");
    cy.contains(".facet-browser__facet-group button", "magi");
    cy.contains(".facet-browser__facet-group button", "troldmænd");
    cy.contains(".facet-browser__facet-group button", "swing");
    cy.contains(".facet-browser__facet-group button", "krimi");
    cy.contains(".facet-browser__facet-group button", "fantasy");
    cy.contains(".disclosure__text", "Subject").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Check if Work types has all its terms", () => {
    cy.contains(".disclosure__text", "Work types").click();
    cy.contains(".facet-browser__facet-group button", "Bøger");
    cy.contains(".facet-browser__facet-group button", "Musik");
    cy.contains(".facet-browser__facet-group button", "Film");
    cy.contains(".facet-browser__facet-group button", "Noder");
    cy.contains(".facet-browser__facet-group button", "Anmeldelser");
    cy.contains(".facet-browser__facet-group button", "Periodika");
    cy.contains(".facet-browser__facet-group button", "Spil");
    cy.contains(".disclosure__text", "Work types").click();
    cy.get(`[aria-label="Close facet browser modal"]`).click();
  });

  it.only("Checks the logic of selected terms and open facets", () => {
    cy.log("Check total results");
    cy.contains("h1", "“harry” (703)");

    cy.log("Click on creators, select Joanne K. Rowling");

    cy.contains("Creators").click();
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath:
        "search-result/facet-browser/searchFacet_terms_joanne-k-rowling"
    });
    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath:
        "search-result/facet-browser/searchWithPagination_terms_joanne-k-rowling"
    });
    cy.contains("button", "Joanne K. Rowling").click();

    cy.log("Close modal and check for new results");
    cy.get(`[aria-label="Close facet browser modal"]`).click();
    cy.contains("h1", "“harry” (36)");

    cy.log(
      "Open modal and check if creators are opened and Joanne K. Rowling is selected"
    );
    cy.contains("button", "+ MORE FILTERS").click();
    cy.get(`[aria-controls="facet-creators"]`).should(
      "have.attr",
      "aria-expanded",
      "true"
    );
    cy.contains("button", "Joanne K. Rowling").should(
      "have.class",
      "tag--outlined-selected"
    );

    cy.log(
      "Remove Joanne K. Rowling facet, close facet browser and check if result is change back"
    );

    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });

    cy.contains("button", "Joanne K. Rowling")
      .click()
      .not(".tag--outlined-selected");

    cy.get(`[aria-label="Close facet browser modal"]`).click();

    cy.contains("h1", "“harry” (703)");
  });

  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "searchFacet",
      fixtureFilePath: "search-result/facet-browser/searchFacet"
    });

    cy.interceptGraphql({
      operationName: "searchWithPagination",
      fixtureFilePath: "search-result/facet-browser/searchWithPagination"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept all images from Cloudinary.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    ).as("Harry Potter cover");

    // Intercept covers.
    cy.fixture("cover.json")
      .then((result) => {
        cy.intercept("GET", "**/covers**", result);
      })
      .as("Cover service");

    // Intercept material list service.
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404,
      body: {}
    }).as("Material list service");

    cy.visit("/iframe.html?id=apps-search-result--search-result");
    cy.contains("button", "+ MORE FILTERS").click();
  });
});

export {};

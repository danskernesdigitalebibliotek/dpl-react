describe("Material", () => {
  it("Does the Material have title?", () => {
    cy.contains("Dummy Some Title: Full");
  });
  it("Check that cover has a src", () => {
    cy.get("img").should(
      "have.attr",
      "src",
      "https:res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1605727140/bogportalen.dk/9781848485532.jpg"
    );
  });
  it("Does the material have favourite buttons?", () => {
    cy.get(".button-favourite").should(
      "have.attr",
      "aria-label",
      "Add to favorites"
    );
  });
  it("Does the material have horizontal lines?", () => {
    cy.contains("Nr 1 i serien");
    cy.contains("Dummy Some Series");
  });
  it("Does the material have authors?", () => {
    cy.contains("Af Dummy Jens Jensen");
  });

  it("Does a material have a availibility label", () => {
    cy.contains("Dummy bog");
    cy.contains("unavailable");
  });
  it("Open material details", () => {
    cy.get("details").last().click();
  });
  it("Does the material have a editions with a buttton to reserved", () => {
    cy.contains("reserver");
  });

  it("Open modal by clicking on reserver button (reserver Dummy bog) and close it with the x bottom", () => {
    cy.contains("button:visible", "reserver Dummy bog").click();
    cy.contains("Afhentes på");
    cy.contains("Hovedbiblioteket");
    cy.contains("12345678");
    cy.contains("test@test.com");
    cy.get(`[aria-label="Luk reservation modal"]`).click({
      multiple: true,
      force: true
    });
  });

  it("Clicking on Aprove resevation (Godkend reservation and close modal with Ok button)", () => {
    cy.contains("button:visible", "reserver Dummy bog").click();
    cy.contains("button:visible", "Godkend reservation").click();
    cy.contains("Materialet er hjemme og er nu reserveret til dig!");
    cy.contains("Du er nummer 3 i køen");
    cy.contains("button:visible", "Ok").click();
  });

  beforeEach(() => {
    cy.fixture("material/reservations.json")
      .then((result) => {
        cy.intercept("POST", "**/patrons/patronid/reservations/**", result);
      })
      .as("reservations");

    cy.fixture("material/holdings.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/catalog/holdings/**", result);
      })
      .as("holdings");

    cy.fixture("material/branches.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/branches", result);
      })
      .as("branches");

    cy.fixture("material/user.json")
      .then((result) => {
        cy.intercept("GET", "**/agencyid/patrons/patronid/v2", result);
      })
      .as("user");

    // Intercept graphql search query.
    cy.fixture("material/fbi-api.json")
      .then((result) => {
        cy.intercept("POST", "**/opac/graphql", result);
      })
      .as("Graphql search query");

    // Intercept covers.
    cy.fixture("material/cover.json")
      .then((result) => {
        cy.intercept("GET", "**/api/v2/covers?**", result);
      })
      .as("Cover service");

    // Intercept availability's service.
    cy.fixture("material/availability.json")
      .then((result) => {
        cy.intercept("GET", "**/availability/v3?recordid=**", result);
      })
      .as("Availability service");

    // Intercept like button
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    cy.visit("/iframe.html?args=&id=apps-material--material");
  });
});

export {};

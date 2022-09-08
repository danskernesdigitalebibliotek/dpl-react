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
    cy.get("details").click({ multiple: true });
  });
  it("Does the material have a editions with a buttton to reserved", () => {
    cy.contains("reserver");
  });

  beforeEach(() => {
    cy.visit("/iframe.html?args=&id=apps-material--material");

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
  });
});

export {};

const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material buttons", () => {
  it("Renders a clickable find on shelf button even if no materials are available", () => {
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/unavailability.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("bog").first().click();
    cy.getBySel("material-header-buttons-find-on-shelf")
      .should("exist")
      .and("be.enabled");
  });

  it("Doesn't render find on shelf button for online materials", () => {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("e-bog").first().click();

    cy.getBySel("material-description").scrollIntoView();

    cy.getBySel("material-header-buttons-find-on-shelf").should("not.exist");
  });

  it("Renders a reservation button for physical materials with material type", () => {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("bog").first().click();
    cy.getBySel("material-header-buttons-physical")
      .should("exist")
      .and("contain", "bog");
    cy.getBySel("availability-label")
      .contains("lydbog (cd-mp3)")
      .first()
      .click();
    cy.getBySel("material-header-buttons-physical")
      .should("exist")
      .and("contain", "lydbog (cd-mp3)");
  });

  it("Renders reservation button disabled if a material isn't reservable", () => {
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/unavailability.json"
    });
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("bog").first().click();
    cy.getBySel("material-header-buttons-cant-reserve")
      .should("be.disabled")
      .and("contain", "Can't be reserved");
  });

  it("Renders the correct action button for ebooks from ereolen", () => {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("e-bog").first().click();
    cy.getBySel("material-buttons-online-external").contains("Go to ereolen");
  });

  it("Renders the correct action button for movies from filmstriben", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material-buttons/material-buttons-movie-fbi-api.json"
    });

    cy.visit(
      "/iframe.html?id=apps-material--underverden&viewMode=story&type=film (online)"
    )
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("film (online)").first().click();
    cy.getBySel("material-buttons-online-external").contains(
      "Go to filmstriben"
    );
  });

  it.skip("Renders the correct action button for online audio books", () => {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label")
      .contains("lydbog (online)")
      .first()
      .click();
    cy.getBySel("material-buttons-online-external").contains("Listen online");
  });

  it.skip("Renders the correct action button for other online materials", () => {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("availability-label").contains("musik").first().click();
    cy.getBySel("material-buttons-online-external").contains("See online");
  });

  it("Renders the correct action button for ordering digital articles", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath:
        "material-buttons/material-buttons-order-digital-fbi-api.json"
    });
    cy.visit(
      "/iframe.html?id=apps-material--digital&viewMode=story&type=artikel"
    )
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("material-header-buttons-online-digital-article").contains(
      "Order digital copy"
    );
  });

  it("Renders the correct action button for infomedia articles", () => {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath:
        "material-buttons/material-buttons-infomedia-fbi-api.json"
    });
    cy.visit("/iframe.html?id=apps-material--infomedia&viewMode=story")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("material-header-buttons-online-infomedia-article")
      .should("exist")
      .and("contain", "Read article");
  });

  it("Renders a disabled button for blocked users for physical works", () => {
    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user-blocked.json"
    });
    cy.createFakeAuthenticatedSession();
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog")
      .getBySel("material-description")
      .scrollIntoView();

    cy.getBySel("material-header-buttons-physical-user-blocked")
      .should("be.visible")
      .and("contain", "User blocked")
      .and("be.disabled");
  });

  beforeEach(() => {
    cy.interceptRest({
      httpMethod: "POST",
      aliasName: "reservations",
      url: "**/patrons/patronid/reservations/**",
      fixtureFilePath: "material/reservations.json"
    });

    cy.interceptRest({
      aliasName: "holdings",
      url: "**/agencyid/catalog/holdingsLogistics/**",
      fixtureFilePath: "material/holdings.json"
    });

    cy.interceptRest({
      aliasName: "branches",
      url: "**/agencyid/branches",
      fixtureFilePath: "material/branches.json"
    });

    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v2",
      fixtureFilePath: "material/user.json"
    });

    cy.interceptRest({
      aliasName: "Cover",
      url: "**/api/v2/covers?**",
      fixtureFilePath: "cover.json"
    });

    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/availability.json"
    });

    // Intercept like button
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");

    // Intercept covers.
    cy.intercept(
      {
        url: coverUrlPattern
      },
      {
        fixture: "images/cover.jpg"
      }
    );
    // Intercept url "translation".
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });

    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material-buttons/material-buttons-fbi-api.json"
    });
  });
});

export default {};

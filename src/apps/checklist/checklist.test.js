describe("Checklist", () => {
  it("Loads a saved material", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 200,
      response: {
        materials: ["870970-basis:54172613"]
      }
    });
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/work*",
      status: 200,
      response: {
        statusCode: 200,
        data: [
          {
            pid: ["870970-basis:54172613"],
            dcCreator: ["Jason Fry"],
            dcTitleFull: ["Star Wars - the last Jedi"],
            typeBibDKType: ["Bog"],
            date: ["2018"],
            coverUrlThumbnail: ["https://source.unsplash.com/random/165x235"]
          }
        ]
      }
    });
    cy.visit("/iframe.html?id=apps-checklist--entry");
    cy.contains("Bog");
    cy.contains("Star Wars - the last Jedi");
    cy.contains("Jason Fry");
    cy.contains("2018");
  });
  it("Can be removed", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 200,
      response: {
        materials: ["870970-basis:54172613"]
      }
    });
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/work*",
      status: 200,
      response: {
        statusCode: 200,
        data: [
          {
            pid: ["870970-basis:54172613"],
            dcCreator: ["Jason Fry"],
            dcTitleFull: ["Star Wars - the last Jedi"],
            typeBibDKType: ["Bog"],
            date: ["2018"],
            coverUrlThumbnail: ["https://source.unsplash.com/random/165x235"]
          }
        ]
      }
    });
    cy.route({
      method: "DELETE",
      url: "https://test.materiallist.dandigbib.org/list/default/**",
      status: 204,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist--entry");
    cy.contains("Fjern fra listen").click();
    cy.contains("Ingen materialer på listen");
  });

  it("Fails when trying to remove", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 200,
      response: {
        materials: ["870970-basis:54172613"]
      }
    });
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/work*",
      status: 200,
      response: {
        statusCode: 200,
        data: [
          {
            pid: ["870970-basis:54172613"],
            dcCreator: ["Jason Fry"],
            dcTitleFull: ["Star Wars - the last Jedi"],
            typeBibDKType: ["Bog"],
            date: ["2018"],
            coverUrlThumbnail: ["https://source.unsplash.com/random/165x235"]
          }
        ]
      }
    });
    cy.route({
      method: "DELETE",
      url: "https://test.materiallist.dandigbib.org/list/default/**",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist--entry");
    cy.contains("Star Wars - the last Jedi");
    cy.contains("Fjern fra listen").click();
    cy.contains("Et eller andet gik galt.");
    // We want to wait for the timeout to finish.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.contains("Star Wars - the last Jedi");
    cy.contains("Ingen materialer på listen").should("not.be.visible");
  });

  it("The list is empty", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 200,
      response: {
        materials: []
      }
    });
    cy.visit("/iframe.html?id=apps-checklist--entry");
    cy.contains("Ingen materialer på listen");
  });
  it("The list couldn't load", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist--entry");
    cy.contains("Et eller andet gik galt.");
  });
});

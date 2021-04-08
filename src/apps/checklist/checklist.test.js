import range from "lodash/range";
import chunk from "lodash/chunk";

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
            date: ["2018"]
          }
        ]
      }
    });
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
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
            date: ["2018"]
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
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
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
            date: ["2018"]
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
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
    cy.clock();
    cy.contains("Star Wars - the last Jedi");
    cy.contains("Fjern fra listen").click();
    cy.contains("Et eller andet gik galt.");
    cy.tick(2000);
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
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
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
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
    cy.contains("Et eller andet gik galt.");
  });
  it("Handles many materials", () => {
    // Create a reasonably large set of id-like values.
    const materialIds = range(0, 99).map(i => `870970-basis:541726${i}`);
    cy.server();
    cy.route({
      method: "GET",
      url: "https://test.materiallist.dandigbib.org/list/default",
      status: 200,
      response: {
        materials: materialIds
      }
    });
    // OpenPlatform supports a maximum of 20 pids per request. To match
    // requests and responses we have to create multiple corresponding routes.
    chunk(materialIds, 20).forEach(ids => {
      cy.route({
        method: "GET",
        // Ids should not be encoded for matching to work. Cypress handles this.
        url: `https://openplatform.dbc.dk/v3/work**pids=${ids.join(",")}**`,
        status: 200,
        response: {
          statusCode: 200,
          data: ids.map(id => {
            return {
              pid: [id.toString()],
              dcCreator: ["Creator"],
              // Include id in title so we have something to match against.
              dcTitleFull: [`Material ${id}`],
              typeBibDKType: ["Type"],
              date: ["2018"]
            };
          })
        }
      });
    });
    cy.visit("/iframe.html?id=apps-checklist-list--entry");
    // All ids should be in the output.
    materialIds.forEach(id => cy.contains(new RegExp(`^Material ${id}$`)));
  });
});

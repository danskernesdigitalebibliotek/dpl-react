describe("Checklist material button", () => {
  it("Can add a material to the checklist and remove it", () => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.server();
    cy.route({
      method: "HEAD",
      url: "**/list/default/*",
      status: 404,
      response: {}
    });
    cy.route({
      method: "PUT",
      url: "**/list/default/*",
      status: 201,
      response: {}
    });
    cy.route({
      method: "DELETE",
      url: "**/list/default/*",
      status: 204,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist-material-button--entry");
    cy.contains("Tilføj til din huskeliste").click();
    cy.contains("Tilføjet");
    cy.contains("Fjern fra din huskeliste").click();
    cy.contains("Fjernet");
    cy.contains("Tilføj til din huskeliste");
  });
  it("Can remove an initial material from the checklist", () => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.server();
    cy.route({
      method: "HEAD",
      url: "**/list/default/*",
      status: 200,
      response: {}
    });
    cy.route({
      method: "DELETE",
      url: "**/list/default/*",
      status: 204,
      response: {}
    });
    cy.route({
      method: "PUT",
      url: "**/list/default/*",
      status: 201,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist-material-button--entry");
    cy.contains("Fjern fra din huskeliste").click();
    cy.contains("Fjernet");
    cy.contains("Tilføj til din huskeliste").click();
    cy.contains("Tilføjet");
  });
  it("Shows an error when adding a material to the checklist fails", () => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.server();
    cy.route({
      method: "HEAD",
      url: "**/list/default/*",
      status: 404,
      response: {}
    });
    cy.route({
      method: "PUT",
      url: "**/list/default/*",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist-material-button--entry");
    cy.contains("Tilføj til din huskeliste").click();
    cy.contains("Der opstod en fejl");
    cy.contains("Tilføj til din huskeliste");
  });
  it("Shows an error when removing a material from the checklist fails", () => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.server();
    cy.route({
      method: "HEAD",
      url: "**/list/default/*",
      status: 200,
      response: {}
    });
    cy.route({
      method: "DELETE",
      url: "**/list/default/*",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-checklist-material-button--entry");
    cy.contains("Fjern fra din huskeliste").click();
    cy.contains("Der opstod en fejl");
    cy.contains("Fjern fra din huskeliste");
  });
});

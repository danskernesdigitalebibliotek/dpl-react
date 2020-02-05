describe("Order material", () => {
  it("Should display message if library does not support ILL", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/libraries*",
      status: 200,
      response: {
        statusCode: 200,
        data: [{ willReceiveIll: "0" }]
      }
    });

    cy.visit("/iframe.html?id=apps-order-material--entry");

    cy.contains("Bestil materiale").should("not.exist");
    cy.contains("Dit afhentningsbibliotek modtager ikke fjernlån");
  });

  it("Should display message if material can't be ordered", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/libraries*",
      status: 200,
      response: {
        statusCode: 200,
        data: [{ willReceiveIll: "1" }]
      }
    });

    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/availability*",
      status: 200,
      response: {
        statusCode: 200,
        data: [{ orderPossible: false }]
      }
    });

    cy.visit("/iframe.html?id=apps-order-material--entry");

    cy.contains("Bestil materiale").should("not.exist");
    cy.contains("Kan ikke fjernlånes");
  });

  it("Should send order request to OpenPlatform when clicked", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/libraries*",
      status: 200,
      response: {
        statusCode: 200,
        data: [
          {
            willReceiveIll: "1",
            orderParameters: ["name", "address", "email", "phone"]
          }
        ]
      }
    });

    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/user*",
      status: 200,
      response: {
        statusCode: 200,
        data: [
          {
            name: "name",
            address: "address",
            mail: "mail"
          }
        ]
      }
    });

    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/availability*",
      status: 200,
      response: {
        statusCode: 200,
        data: [{ orderPossible: true }]
      }
    });

    cy.route({
      method: "POST",
      url: "https://openplatform.dbc.dk/v3/order*",
      status: 200,
      response: {
        statusCode: 200,
        data: []
      }
    }).as("orderRequest");

    cy.visit("/iframe.html?id=apps-order-material--entry");

    cy.contains("Bestil materiale").click();
    // cy.wait('@orderRequest');
    cy.contains("Bestilt");
  });
});

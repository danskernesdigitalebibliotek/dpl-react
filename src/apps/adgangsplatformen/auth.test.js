import { TOKEN_USER_KEY } from "../../core/token";

describe("Authentication", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.removeItem(TOKEN_USER_KEY);
    });
  });
  it("Loads story without auth code", () => {
    cy.server();
    cy.visit(
      "/iframe.html?path=/story/sb-utilities-adgangsplatformen--sign-in"
    );
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", TOKEN_USER_KEY)
      .should("not.exist");
  });
  it("Loads story with auth code", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://login.bib.dk/oauth/token",
      status: 200,
      response: {
        statusCode: 200,
        access_token: "random_token"
      }
    });
    cy.visit(
      "/iframe.html?path=/story/sb-utilities-adgangsplatformen--sign-in&code=test"
    );
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", TOKEN_USER_KEY)
      .should("eq", "random_token");
  });
});

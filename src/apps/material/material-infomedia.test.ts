import { MaterialPage } from "../../../cypress/pages/material";

describe("Material - Infomedia", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    materialPage = new MaterialPage();

    materialPage
      .interceptDefaultRest()
      .interceptDefaultGraphql()
      .interceptDefault();

    materialPage.interceptInfomediaGraphql().visitInfomediaMaterial();
  });

  it("Renders the correct details for infomedia", () => {
    materialPage.openMaterialDetails();

    materialPage.elements.listDescription().within(() => {
      // Verify "Language" field and its value
      cy.get(".list-description__item")
        .contains("Language")
        .next()
        .should("contain.text", "dansk");

      // Verify "Edition" field and its value
      cy.get(".list-description__item")
        .contains("Edition")
        .next()
        .should("contain.text", "2013");

      // Verify "Type" field and its value
      cy.get(".list-description__item")
        .contains("Type")
        .next()
        .should("contain.text", "artikel");

      // Verify "Scope" field and its value
      cy.get(".list-description__item")
        .contains("Scope")
        .next()
        .should("contain.text", "2");

      // Verify "Dimensions" field and its value
      cy.get(".list-description__item")
        .contains("Dimensions")
        .next()
        .should("contain.text", "Sektion 3, s. 6-7: ill.");

      // Verify "Host Publication" field and its value
      cy.get(".list-description__item")
        .contains("Host Publication")
        .next()
        .should("contain.text", "Politiken, 2013-09-19");
    });
  });
});

export default {};

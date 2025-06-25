import { MaterialPage } from "../../../cypress/pages/material";

describe("Material", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    materialPage = new MaterialPage();

    materialPage
      .interceptDefaultRest()
      .interceptDefaultGraphql()
      .interceptDefault();

    materialPage.setupMusicInterceptions().visitMusicMaterial();
  });

  it("Renders the correct details for music", () => {
    materialPage.openMaterialDetails();

    materialPage.elements.listDescription().within(() => {
      // Verify "Publisher" field and its value
      cy.get(".list-description__item")
        .contains("Publisher")
        .next()
        .should("contain.text", "Warner Bros.");

      // Verify "Type" field and its value
      cy.get(".list-description__item")
        .contains("Type")
        .next()
        .should("contain.text", "musik (cd)");

      // Verify "Contributors" field and its value
      cy.get(".list-description__item")
        .contains("Contributors")
        .next()
        .should(
          "contain.text",
          "Michael Bruce / Dennis Dunaway / Neal Smith / Glen Buxton"
        );

      // Verify "Dimensions" field and its value
      cy.get(".list-description__item")
        .contains("Dimensions")
        .next()
        .should("contain.text", "Stereo");

      // Verify "Contents" field and its list values
      cy.get(".list-description__item")
        .contains("Contents")
        .next()
        .within(() => {
          // Validate each list item in "Contents"
          const contents = [
            "Hello hooray",
            "Raped and freezin'",
            "Elected",
            "Billion dollar babies",
            "Unfinished sweet",
            "No more Mr. Nice Guy",
            "Generation landslide",
            "Sick things",
            "Mary Ann",
            "I love the dead"
          ];

          contents.forEach((item, index) => {
            cy.get(".list-description__value--list li")
              .eq(index)
              .should("have.text", item);
          });
        });
    });
  });
});

export default {};

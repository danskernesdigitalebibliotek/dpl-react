import { MaterialPage } from "../../../cypress/pages/material/material";

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
    materialPage.components.Details((details) => {
      details
        .open()
        .verifyField("Publisher", "Warner Bros.")
        .verifyField("Type", "musik (cd)")
        .verifyField(
          "Contributors",
          "Michael Bruce / Dennis Dunaway / Neal Smith / Glen Buxton"
        )
        .verifyField("Dimensions", "Stereo");

      // For the Contents field with list values, we need to handle it specially
      details.getField("Contents").within(() => {
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

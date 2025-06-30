import { MaterialPage } from "../../../cypress/pages/material/material";

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
    materialPage.components.Details((details) => {
      details
        .open()
        .verifyField("Language", "dansk")
        .verifyField("Edition", "2013")
        .verifyField("Type", "artikel")
        .verifyField("Scope", "2")
        .verifyField("Dimensions", "Sektion 3, s. 6-7: ill.")
        .verifyField("Host Publication", "Politiken, 2013-09-19");
    });
  });
});

export default {};

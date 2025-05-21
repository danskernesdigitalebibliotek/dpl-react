// ImageUrls based on pid: 870970-basis:53292968
// Reflects cypress/fixtures/cover.json

import { FbiCoverUrlPattern } from "../../../cypress/fixtures/fixture.types";

export const coverImageUrls = {
  xSmall:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/120px!AIw2BkPOLypFEqL1vHy1yBKouHF-HNcXWWoIyBuG00fdtw",
  small:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/240px!AIw-TQ9oCb7zdDSJjkBiw6jkSDQS8nTg5n_uSZweQTK12Q",
  medium:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/480px!AIyr0djl0iG3rFEf29ecuiCXPXmHQPBheE83TYngKX_OHQ",
  large:
    "https://fbiinfo-present.dbc.dk/images/OFkgpMOxSKmmt25AzzxAVw/960px!AIwcwpzg_AMmUzDNPm_6frtTRgiUYiSpIQY0GBRgMjTI0A"
};

describe("Cover", () => {
  beforeEach(() => {
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover.json"
    });
  });

  it("loads a cover (default is small in storybook)", () => {
    cy.visit("/iframe.html?args=&id=components-cover--with-pid&viewMode=story");
    cy.get("img").should("have.attr", "src", coverImageUrls.small);
    cy.get("img").should("have.attr", "src").and("match", FbiCoverUrlPattern);
  });

  it("shows alt text if alt prop is provided", () => {
    cy.visit("/iframe.html?args=&id=components-cover--with-pid&viewMode=story");
    cy.get("img").should("have.attr", "alt", "alt text for the image");
  });

  it("wraps the image in a link if `url` is provided", () => {
    cy.visit(
      "/iframe.html?args=url:%2F&id=components-cover--with-pid&viewMode=story"
    );
    cy.get("a").should("exist");
    cy.get("a > img").should("exist");
  });

  it("renders nothing if no cover is provided", () => {
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover-null.json"
    });

    cy.visit(
      "/iframe.html?args=size:small&id=components-cover--item&viewMode=story"
    );

    cy.get("img").should("not.exist");
  });

  it("Applies the correct background tint if no covers are found (120 in storybook)", () => {
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover-null.json"
    });
    cy.visit("/iframe.html?args=&id=components-cover--no-ids&viewMode=story");
    cy.get(".cover").should("have.class", "bg-identity-tint-120");
  });
});

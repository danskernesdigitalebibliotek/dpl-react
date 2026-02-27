import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalFindOnShelfComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal-find-on-shelf"));
    this.addElements = {
      headline: () => this.container().find(".modal-find-on-shelf__headline"),
      caption: () => this.container().find(".modal-find-on-shelf__caption"),
      libraryDisclosures: () =>
        this.container().find(
          "[data-cy='find-on-shelf-modal-body-disclosure']"
        ),
      periodicalDropdowns: () =>
        this.container().find(
          ".modal-find-on-shelf__periodical-dropdowns select"
        )
    };
  }

  getLibraryDisclosure(libraryIndex: number) {
    return this.elements.libraryDisclosures().eq(libraryIndex);
  }

  getLibraryDisclosureByName(libraryName: string) {
    return this.elements
      .libraryDisclosures()
      .filter(`:contains("${libraryName}")`);
  }

  verifyLibraryHolding({
    libraryName,
    label,
    editionTitle,
    expectedCount,
    expectedShelfmark
  }: {
    libraryName: string;
    label: "Available" | "Unavailable";
    editionTitle: string;
    expectedCount: string;
    expectedShelfmark?: string;
  }) {
    this.getLibraryDisclosureByName(libraryName)
      .scrollIntoView()
      .should("be.visible")
      .within(($details) => {
        // Verify the label is present
        cy.wrap($details).should("contain", label);

        // Open the disclosure if it's not already open
        if (!$details.attr("open")) {
          cy.wrap($details).find("summary").click();
        }

        // Verify the edition title and count in the find-on-shelf list
        cy.get(".find-on-shelf__row")
          .filter(`:contains("${editionTitle}")`)
          .then(($row) => {
            cy.wrap($row).scrollIntoView();
            cy.wrap($row).should("be.visible");
            cy.wrap($row).should("contain", expectedCount);

            // Optionally verify shelfmark display
            if (expectedShelfmark) {
              cy.wrap($row).should("contain", expectedShelfmark);
            }
          });
      });

    return this;
  }

  assertBranchOrder(expectedOrder: string[]) {
    const branchNames: string[] = [];

    this.elements.libraryDisclosures().each(($disclosure) => {
      const branchName = $disclosure.find("h3").text().trim();
      branchNames.push(branchName);
    });

    cy.wrap(branchNames).should("deep.equal", expectedOrder);
    return this;
  }

  getFirstBranchName() {
    return this.elements.libraryDisclosures().first().find("h3");
  }
}

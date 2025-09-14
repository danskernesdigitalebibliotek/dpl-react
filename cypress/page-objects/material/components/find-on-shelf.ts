import { ComponentObject } from "@hammzj/cypress-page-object";

export class FindOnShelfComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal-find-on-shelf"));
    this.addElements = {
      headline: () => this.container().find(".modal-find-on-shelf__headline"),

      libraryDisclosures: () =>
        this.container().find(
          "[data-cy='find-on-shelf-modal-body-disclosure']"
        ),

      openFindOnShelfButton: () =>
        cy.getBySel("material-header-buttons-find-on-shelf")
    };
  }

  open() {
    this.elements.openFindOnShelfButton().should("be.visible").click();
    return this;
  }

  getLibraryDisclosure(libraryIndex: number) {
    return this.elements.libraryDisclosures().eq(libraryIndex);
  }
}

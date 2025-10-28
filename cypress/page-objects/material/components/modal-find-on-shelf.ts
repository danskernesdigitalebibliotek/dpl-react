import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalFindOnShelfComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal-find-on-shelf"));
    this.addElements = {
      headline: () => this.container().find(".modal-find-on-shelf__headline"),
      caption: () => this.container().find(".modal-find-on-shelf__caption"),
      libraryDisclosures: () =>
        this.container().find("[data-cy='find-on-shelf-modal-body-disclosure']")
    };
  }

  getLibraryDisclosure(libraryIndex: number) {
    return this.elements.libraryDisclosures().eq(libraryIndex);
  }
}

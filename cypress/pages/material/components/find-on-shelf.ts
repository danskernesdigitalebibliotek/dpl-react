import { ComponentObject } from "@hammzj/cypress-page-object";

export class FindOnShelfComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal-find-on-shelf"));

    this.addElements = {
      // Button to open find on shelf modal
      findFirstOnShelfButton: () =>
        cy
          .getBySel("material-buttons-find-on-shelf")
          .first()
          .scrollIntoView({ duration: 100 }),

      // Modal elements
      findOnShelfModal: () =>
        this.container().first().scrollIntoView({ duration: 100 }),

      findOnShelfModalHeader: () =>
        this.container()
          .find(".modal-find-on-shelf__headline")
          .first()
          .scrollIntoView({ duration: 100 }),

      // Disclosure elements
      findOnShelfModalDisclosuresEq: (index: number) =>
        cy
          .getBySel("find-on-shelf-modal-body-disclosure")
          .eq(index)
          .scrollIntoView({ duration: 100 }),

      findOnShelfModalListContentEq: (index: number) =>
        cy.get("find-on-shelf").eq(index).scrollIntoView({ duration: 100 }),

      // Container elements
      findOnShelfContainer: () =>
        cy.get(".find-on-shelf").scrollIntoView({ duration: 100 }),

      findOnShelfContainerEq: (index: number) =>
        cy.get(".find-on-shelf").eq(index).scrollIntoView({ duration: 100 }),

      // Header elements within the shelf container
      findOnShelfMaterialHeader: () =>
        cy
          .get(".find-on-shelf__material-header")
          .scrollIntoView({ duration: 100 }),

      findOnShelfLocationHeader: () =>
        cy
          .get(".find-on-shelf__location-header")
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountHeader: () =>
        cy
          .get(".find-on-shelf__item-count-header")
          .scrollIntoView({ duration: 100 }),

      // Content elements
      findOnShelfRows: () =>
        cy.get(".find-on-shelf__row").first().scrollIntoView({ duration: 100 }),

      findOnShelfRowEq: (index: number) =>
        cy
          .get(".find-on-shelf__row")
          .eq(index)
          .scrollIntoView({ duration: 100 }),

      findOnShelfMaterialText: () =>
        cy
          .get(".find-on-shelf__material-text")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountText: () =>
        cy
          .get(".find-on-shelf__item-count-text")
          .first()
          .scrollIntoView({ duration: 100 }),

      findOnShelfItemCountTextFirst: () =>
        cy
          .get(".find-on-shelf__item-count-text")
          .first()
          .scrollIntoView({ duration: 100 })
    };
  }
}

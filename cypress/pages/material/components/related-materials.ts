import { ComponentObject } from "@hammzj/cypress-page-object";

export class RelatedMaterialsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-grid-related"));

    this.addElements = {
      // Related materials grid
      materialGrid: () => this.container().scrollIntoView({ duration: 100 }),

      // Filter buttons for related materials
      filterButtons: () => cy.getBySel("material-grid-related-filter-button"),

      // Individual filter button by text
      filterButtonByText: (text: string) =>
        this.elements.filterButtons().contains(text),

      // Material items in the grid
      materialItems: () => this.container().find("li")
    };
  }
}

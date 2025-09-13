import { ComponentObject } from "@hammzj/cypress-page-object";

export class EditionsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-editions-disclosure"));
    this.addElements = {
      // Get all material-manifestation-item components within the disclosure
      manifestationItems: () =>
        this.container().find(".material-manifestation-item")
    };
  }

  open() {
    this.container().should("be.visible").click();
    return this;
  }

  getAvailabilityLabelForManifestation(manifestationIndex: number) {
    return (
      this.elements
        .manifestationItems()
        .eq(manifestationIndex)
        // getBySel can't be used here - it ignores current element context
        .find('[data-cy="availability-label"]')
    );
  }
}

import { ComponentObject } from "@hammzj/cypress-page-object";

export class DetailsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-details-disclosure"));

    this.addElements = {
      detailsField: (fieldName: string) =>
        this.container()
          .find(".list-description__item")
          .contains(fieldName)
          .next()
    };
  }

  open() {
    this.container().should("be.visible").click();
    return this;
  }

  getField(fieldName: string) {
    return this.elements.detailsField(fieldName);
  }

  verifyField(fieldName: string, expectedValue: string) {
    this.elements.detailsField(fieldName).should("contain", expectedValue);
    return this;
  }
}

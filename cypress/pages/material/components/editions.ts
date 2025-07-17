import { ComponentObject } from "@hammzj/cypress-page-object";

export class EditionsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-editions-disclosure"));

    this.addElements = {
      editionsField: (fieldName: string) =>
        this.container()
          .find(".list-description__item")
          .contains(fieldName)
          .next(),

      manifestationDetailsButtons: (index = 0) =>
        this.container()
          .findAllByRole("button", { name: "Details about the material" })
          .eq(index),

      reservePhysicalButtons: () =>
        this.container().wait(1000).findAllByRole("button", { name: "Reserve" })
    };
  }

  open() {
    this.container().should("be.visible").click();
    return this;
  }

  getField(fieldName: string) {
    return this.elements.editionsField(fieldName);
  }

  verifyField(fieldName: string, expectedValue: string) {
    this.elements.editionsField(fieldName).should("contain", expectedValue);
    return this;
  }

  getreservePhysicalButtons() {
    return this.elements.reservePhysicalButtons();
  }
}

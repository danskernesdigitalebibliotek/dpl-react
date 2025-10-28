import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalReservationComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".reservation-modal"));
    this.addElements = {
      description: () => {
        const element = this.container().find(".reservation-modal-description");
        return element;
      },
      submitButton: () => {
        const element = this.container().find(
          "[data-cy='reservation-modal-submit-button']"
        );
        return element;
      },
      submitSection: () => {
        const element = this.container().find(".reservation-modal-submit");
        return element;
      },
      listItems: () =>
        this.container().find("[data-cy='reservation-form-list-item']")
    };
  }

  getListItem(index: number) {
    const item = this.elements.listItems().eq(index);
    return item;
  }

  getListItemValue(index: number) {
    return this.getListItem(index);
  }

  getListItemButton(index: number) {
    return this.getListItem(index).find("button");
  }

  changeEdition() {
    this.getListItemButton(0).click();
    return this;
  }
}

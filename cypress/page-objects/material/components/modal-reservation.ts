import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalReservationComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".reservation-modal"));
    this.addElements = {
      subtitle: () => {
        const element = this.container().find(
          ".reservation-modal-description p"
        );
        element.scrollIntoView();
        return element;
      },
      submitButton: () => {
        const element = this.container().getBySel(
          "reservation-modal-submit-button"
        );
        element.scrollIntoView();
        return element;
      },
      listItems: () => this.container().getBySel("reservation-form-list-item")
    };
  }

  getListItem(index: number) {
    const item = this.elements.listItems().eq(index);
    item.scrollIntoView();
    return item;
  }

  getListItemTitle(index: number) {
    return this.getListItem(index).find(".text-header-h5");
  }

  getListItemValue(index: number) {
    return this.getListItem(index).find(".text-small-caption");
  }

  getListItemButton(index: number) {
    return this.getListItem(index).find("button");
  }

  changeEdition() {
    this.getListItemButton(0).click();
    return this;
  }
}

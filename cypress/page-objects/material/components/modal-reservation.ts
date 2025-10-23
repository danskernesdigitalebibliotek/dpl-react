import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalReservationComponent extends ComponentObject {
  constructor() {
    // Reservation modal container
    super(() => cy.get(".reservation-modal"));
    this.addElements = {
      // Modal title section
      title: () => this.container().find(".reservation-modal-description"),
      // All reservation list items inside the modal
      listItems: () =>
        this.container().find("[data-cy='reservation-form-list-item']"),
      // Edition text within the list item
      editionText: () =>
        this.container().find("[data-cy='reservation-modal-list-item-text']"),
      // Change buttons within the reservation list items
      changeButtons: () =>
        this.container().find("[data-cy='reservation-form-list-item'] button")
    };
  }

  // Clicks the Change button for the edition row (first list item)
  changeEdition() {
    this.container().should("be.visible");
    this.elements.listItems().first().find("button").click();
    return this;
  }
}

import { ComponentObject } from "@hammzj/cypress-page-object";

export class ReservationModalComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal"));
    this.addElements = {
      reservationModalTag: () =>
        this.container().find(".reservation-modal-tag"),
      reservationModalList: () =>
        this.container()
          .get(".reservation-modal-list")
          .scrollIntoView({ duration: 300 }),

      fieldValue: (fieldName: string) =>
        this.container()
          .find(".reservation-modal-list-item-text")
          .contains(fieldName)
          .next(),

      submitButton: () =>
        this.container().findByRole("button", { name: "Approve reservation" }),

      closeXButton: () =>
        cy.getBySelStartEnd("modal-reservation-modal-", "-close-button", true),

      okButton: () => this.container().findByRole("button", { name: "Ok" }),

      successTitle: () =>
        this.container().getBySel("reservation-success-title-text"),

      // approval modal elements
      approvalModal: () =>
        cy.get(".reservation-modal--confirm").scrollIntoView({ duration: 100 }),

      approvalTitle: () =>
        cy
          .get(".reservation-modal--confirm")
          .getBySel("reservation-success-title-text")
          .scrollIntoView({ duration: 100 }),

      approvalNumberInQueue: () =>
        cy.get(".reservation-modal--confirm").getBySel("number-in-queue-text")
    };
  }

  ensureReservationModalIsLoaded() {
    this.elements
      .reservationModalTag()
      .should("be.visible")
      .invoke("text")
      .should("not.be.empty");

    this.elements.submitButton().should("be.visible").and("not.be.disabled");

    this.elements
      .fieldValue("Edition")
      .should("be.visible")
      .invoke("text")
      .should("not.be.empty");
  }

  field(fieldName: string) {
    return this.elements.fieldValue(fieldName);
  }

  scrollToList() {
    this.elements.reservationModalList();
    return this;
  }
}

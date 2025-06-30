import { ComponentObject } from "@hammzj/cypress-page-object";

export class ReservationModalComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".modal"));
    this.addElements = {
      reservePhysicalButton: () =>
        cy
          .get(".material-header__button")
          .findByRole("button", { name: "Reserve bog" })
          .scrollIntoView({ duration: 100 }),

      title: () =>
        this.container()
          .getBySel("reservation-success-title-text")
          .scrollIntoView({ duration: 100 }),

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

      numberInQueue: () => this.container().getBySel("number-in-queue-text")
    };
  }

  submit() {
    this.elements.submitButton().click();
    return this;
  }

  closeWithX() {
    this.elements.closeXButton().click();
    return this;
  }

  closeWithOk() {
    this.elements.okButton().click();
    return this;
  }

  field(fieldName: string) {
    return this.elements.fieldValue(fieldName);
  }

  scrollToList() {
    this.elements.reservationModalList();
    return this;
  }
}

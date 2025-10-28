import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalReservationSuccessComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".reservation-modal--confirm"));
    this.addElements = {
      titleText: () => {
        const element = this.container().find(
          "[data-cy='reservation-success-title-text']"
        );
        return element;
      },
      reservedForYouText: () => {
        const element = this.container().find(
          "[data-cy='reservation-success-is-reserved-for-you-text']"
        );
        return element;
      },
      numberInQueueText: () => {
        const element = this.container().find(
          "[data-cy='number-in-queue-text']"
        );
        return element;
      },
      pickupBranchText: () => {
        const element = this.container().find(
          "[data-cy='reservation-success-preferred-pickup-branch-text']"
        );
        return element;
      },
      closeButton: () => {
        const element = this.container().find(
          "[data-cy='reservation-success-close-button']"
        );
        return element;
      }
    };
  }
}

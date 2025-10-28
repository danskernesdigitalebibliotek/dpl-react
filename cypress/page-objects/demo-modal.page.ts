import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";

export class DemoModalPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?path=/story/apps-demo-modal--primary"
    });
    this.elements = {
      // Modal container
      modal: () => cy.get(".modal"),

      // Modal headers - specific elements
      modalOneHeader: () => cy.get("#demo-modal-one-header"),
      modalTwoHeader: () => cy.get("#demo-modal-two-header"),

      // Modal headers - found within modal
      modalHeaders: () => cy.get(".modal").find("h1"),
      modalTwoHeaderWithinModal: () =>
        cy.get(".modal").find("h1#demo-modal-two-header"),

      // Buttons - specific elements
      modalOneButton: () => cy.get("#demo-modal-one-button"),
      modalTwoButton: () => cy.get("#demo-modal-two-button"),
      closeButton: () => cy.get(".modal-btn-close"),

      // Buttons - found within modal
      modalTwoButtonWithinModal: () =>
        cy.get(".modal").find("button#demo-modal-two-button"),
      closeButtonWithinModal: () =>
        cy.get(".modal").find("button.modal-btn-close")
    };
  }

  /**
   * Close the currently open modal
   */
  closeModal(): void {
    this.elements.closeButton().first().click();
  }
}

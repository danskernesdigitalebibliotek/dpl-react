import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { DisclosureEditionsComponent } from "./components/disclosure-editions";
import { ModalReservationComponent } from "./components/modal-reservation";
import { ModalEditionsSwitchComponent } from "./components/modal-editions-switch";
import { ModalFindOnShelfComponent } from "./components/modal-find-on-shelf";

export class MaterialPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: `/iframe.html?id=apps-material--default&viewMode=story`
    });
    this.elements = {
      title: () => cy.get(".text-header-h1")
    };

    this.addElements = {
      headerAvailabilityLabels: () => {
        return cy.get(
          ".material-header__availability-label .availability-label"
        );
      },

      mainReservationButton: () =>
        cy.getBySel("material-header-buttons-physical"),

      // FindOnShelf button in the material header
      findOnShelfButton: () =>
        cy.getBySel("material-header-buttons-find-on-shelf")
    };

    this.addNestedComponents = {
      DisclosureEditions: (fn) =>
        this.performWithin(
          this.container(),
          new DisclosureEditionsComponent(),
          fn
        ),
      ModalReservation: (fn) =>
        this.performWithin(
          this.container(),
          new ModalReservationComponent(),
          fn
        ),
      ModalFindOnShelf: (fn) =>
        this.performWithin(
          this.container(),
          new ModalFindOnShelfComponent(),
          fn
        ),
      ModalEditionsSwitch: (fn) =>
        this.performWithin(
          this.container(),
          new ModalEditionsSwitchComponent(),
          fn
        )
    };
  }

  openModalReservation() {
    this.elements.mainReservationButton().should("be.visible").click();
  }

  getHeaderAvailabilityLabel(labelIndex: number) {
    return cy
      .get(".material-header__availability-label .availability-label")
      .eq(labelIndex);
  }

  openFindOnShelf() {
    this.elements
      .findOnShelfButton()
      .scrollIntoView()
      .should("be.visible")
      .click();

    // Wait for the modal to appear
    cy.get(".modal-find-on-shelf").should("be.visible");
    return this;
  }
}

import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { DisclosureEditionsComponent } from "./components/disclosure-editions";
import { DisclosureDetailsComponent } from "./components/disclosure-details";
import { ModalReservationComponent } from "./components/modal-reservation";
import { ModalEditionsSwitchComponent } from "./components/modal-editions-switch";
import { ModalFindOnShelfComponent } from "./components/modal-find-on-shelf";
import { ModalReservationSuccessComponent } from "./components/modal-reservation-success";

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
        cy.get(".material-header__availability-label");
        return cy.get(
          ".material-header__availability-label .availability-label"
        );
      },
      headerButtons: () => cy.get(".material-header__button"),
      materialHeaderContent: () => cy.getBySel("material-header-content"),
      descriptionSection: () => cy.getBySel("material-description"),
      seriesInfo: () => cy.getBySel("material-description-series-0"),
      seriesMembers: () => cy.getBySel("material-description-series-members"),
      identifierTags: () => cy.getBySel("material-description-identifier"),
      fictionNonfiction: () =>
        cy.getBySel("material-description-fiction-nonfiction"),
      detailsDisclosure: () => cy.getBySel("material-details-disclosure"),
      periodicalDropdowns: () => cy.get(".material-periodical-select select"),
      periodicalYearDropdown: () =>
        cy.get(".material-periodical-select select#year"),
      periodicalEditionDropdown: () =>
        cy.get(".material-periodical-select select#editions")
    };

    this.addNestedComponents = {
      DisclosureEditions: (fn) =>
        this.performWithin(
          this.container(),
          new DisclosureEditionsComponent(),
          fn
        ),
      DisclosureDetails: (fn) =>
        this.performWithin(
          this.container(),
          new DisclosureDetailsComponent(),
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
        ),
      ModalReservationSuccess: (fn) =>
        this.performWithin(
          this.container(),
          new ModalReservationSuccessComponent(),
          fn
        )
    };
  }

  openModalReservation() {
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .click();
  }

  openFindOnShelf() {
    cy.getBySel("material-header-buttons-find-on-shelf")
      .should("be.visible")
      .click();
    cy.get(".modal-find-on-shelf").should("be.visible");
    return this;
  }

  getHeaderAvailabilityLabel(index: number) {
    return this.elements.headerAvailabilityLabels().eq(index);
  }
}

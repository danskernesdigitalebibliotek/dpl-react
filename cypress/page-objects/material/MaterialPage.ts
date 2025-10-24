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
        cy.get(".material-header__availability-label").scrollIntoView();
        return cy.get(
          ".material-header__availability-label .availability-label"
        );
      },
      stockInfo: () =>
        cy
          .getBySel("material-header-content")
          .find(".text-small-caption")
          .scrollIntoView(),
      descriptionSection: () =>
        cy.getBySel("material-description").scrollIntoView(),
      seriesInfo: () =>
        cy.getBySel("material-description-series-0").scrollIntoView(),
      seriesMembers: () =>
        cy.getBySel("material-description-series-members").scrollIntoView(),
      identifierTags: () =>
        cy.getBySel("material-description-identifier").scrollIntoView(),
      fictionNonfiction: () =>
        cy.getBySel("material-description-fiction-nonfiction").scrollIntoView(),
      detailsDisclosure: () =>
        cy.getBySel("material-details-disclosure").scrollIntoView()
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
        )
    };
  }

  openModalReservation() {
    cy.getBySel("material-header-buttons-physical").scrollIntoView();
    cy.getBySel("material-header-buttons-physical")
      .should("be.visible")
      .click();
  }

  openFindOnShelf() {
    cy.getBySel("material-header-buttons-find-on-shelf").scrollIntoView();
    cy.getBySel("material-header-buttons-find-on-shelf")
      .should("be.visible")
      .click();
    cy.get(".modal-find-on-shelf").should("be.visible");
    return this;
  }
}

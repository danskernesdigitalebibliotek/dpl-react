import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalEditionsSwitchComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".reservation-modal--edition-switch"));
    this.addElements = {
      title: () => this.container().find(".reservation-modal-description h2"),
      manifestationItems: () =>
        this.container().find(".material-manifestation-item")
    };
  }

  getManifestationItem(manifestationIndex: number) {
    return this.elements.manifestationItems().eq(manifestationIndex);
  }

  clickChooseForManifestation(manifestationIndex: number) {
    this.getManifestationItem(manifestationIndex)
      .find("button")
      .contains("Choose")
      .click();
    return this;
  }
}

import { ComponentObject } from "@hammzj/cypress-page-object";

export class ModalEditionsSwitchComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("edition-switch-modal"));
    this.addElements = {
      // Modal title section
      title: () => this.container().find(".reservation-modal-description"),
      // All material-manifestation-item components within the modal
      manifestationItems: () =>
        this.container().find(".material-manifestation-item")
    };
  }

  open() {
    this.container().should("be.visible");
    return this;
  }

  getManifestationItem(manifestationIndex: number) {
    return this.elements.manifestationItems().eq(manifestationIndex);
  }

  getAvailabilityLabelForManifestation(manifestationIndex: number) {
    return (
      this.elements
        .manifestationItems()
        .eq(manifestationIndex)
        // getBySel can't be used here - it ignores current element context
        .find('[data-cy="availability-label"]')
    );
  }

  clickManifestationReserveButton(manifestationIndex: number) {
    this.getManifestationItem(manifestationIndex)
      .find('[data-cy*="material-header-buttons"]')
      .first()
      .click();
    return this;
  }

  clickChooseButton() {
    this.container()
      .find(".material-manifestation-item")
      .contains("button", "Choose")
      .click();
    return this;
  }
}

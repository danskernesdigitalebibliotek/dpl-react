import { ComponentObject } from "@hammzj/cypress-page-object";

export class DisclosureEditionsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-editions-disclosure"));
    this.addElements = {
      summary: () => {
        this.container().scrollIntoView();
        return this.container().find("[data-cy='disclosure-summary']");
      },
      manifestationItems: () =>
        this.container().find(".material-manifestation-item")
    };
  }

  open() {
    this.container().scrollIntoView();
    this.container().should("be.visible").click();
    return this;
  }

  getManifestationItem(manifestationIndex: number) {
    const item = this.elements.manifestationItems().eq(manifestationIndex);
    item.scrollIntoView();
    return item;
  }
}

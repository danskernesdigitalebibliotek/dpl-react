import { ComponentObject } from "@hammzj/cypress-page-object";

export class DisclosureDetailsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-details-disclosure"));
    this.addElements = {
      summary: () => {
        return this.container().getBySel("disclosure-summary");
      },
      listDescription: () => {
        return this.container().getBySel("list-description");
      },
      listItems: () => this.container().find(".list-description__item")
    };
  }

  open() {
    this.container().should("be.visible").click();
    return this;
  }

  getListItem(index: number) {
    return this.elements.listItems().eq(index);
  }

  getValueByKey(key: string) {
    const item = this.elements
      .listItems()
      .filter(`:has(.list-description__key:contains("${key}")):first`);

    return item.find(".list-description__value");
  }
}

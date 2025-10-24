import { ComponentObject } from "@hammzj/cypress-page-object";

export class DisclosureDetailsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-details-disclosure"));
    this.addElements = {
      summary: () => {
        this.container().scrollIntoView();
        return this.container().getBySel("disclosure-summary");
      },
      listDescription: () => {
        this.container().scrollIntoView();
        return this.container().getBySel("list-description");
      },
      listItems: () => this.container().find(".list-description__item")
    };
  }

  open() {
    this.container().scrollIntoView();
    this.container().should("be.visible").click();
    return this;
  }

  getListItem(index: number) {
    const item = this.elements.listItems().eq(index);
    item.scrollIntoView();
    return item;
  }

  getKeyByIndex(index: number) {
    return this.getListItem(index).find(".list-description__key");
  }

  getValueByIndex(index: number) {
    return this.getListItem(index).find(".list-description__value");
  }

  getValueByKey(key: string) {
    const item = this.elements
      .listItems()
      .filter(`:has(.list-description__key:contains("${key}")):first`);
    item.scrollIntoView();
    return item.find(".list-description__value");
  }
}

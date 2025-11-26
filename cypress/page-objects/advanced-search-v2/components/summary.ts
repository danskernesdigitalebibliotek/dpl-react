import { ComponentObject } from "@hammzj/cypress-page-object";

export class SummaryComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".advanced-search-summary"));

    this.addElements = {
      items: () => this.container().find(".advanced-search-summary__item"),
      operators: () =>
        this.container().find(".advanced-search-summary__operator"),
      editButton: () =>
        this.container().find(".advanced-search-summary__edit-link")
    };
  }

  clickEdit() {
    this.elements.editButton().click();
  }

  verifyIsVisible() {
    this.container().should("be.visible");
  }

  verifyOperatorIs(index: number, operator: string) {
    this.elements.operators().eq(index).should("contain", operator);
  }

  verifyItemCount(count: number) {
    this.elements.items().should("have.length", count);
  }

  verifyItemContains(index: number, text: string) {
    this.elements.items().eq(index).should("contain", text);
  }
}

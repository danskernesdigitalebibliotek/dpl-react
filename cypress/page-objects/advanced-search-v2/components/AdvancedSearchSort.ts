import { ComponentObject } from "@hammzj/cypress-page-object";

export class AdvancedSearchSortComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".advanced-search-v2__sort-select"));

    this.addElements = {
      select: () => this.container().find("#advanced-sort-select"),
      label: () =>
        this.container().find(".advanced-search-v2__sort-select__label")
    };
  }

  /**
   * Select a sort option by its visible text
   */
  selectSortOption(optionText: string) {
    this.elements.select().select(optionText);
  }

  /**
   * Get the currently selected sort value
   */
  getSelectedValue() {
    return this.elements.select().invoke("val");
  }

  // Verification methods

  /**
   * Verify the sort select is visible
   */
  verifyIsVisible() {
    this.container().should("be.visible");
  }

  /**
   * Verify the sort select has a specific value selected
   */
  verifySortValueIs(expectedValue: string) {
    this.elements.select().should("have.value", expectedValue);
  }

  /**
   * Verify the selected option displays specific text
   */
  verifySelectedOptionTextIs(expectedText: string) {
    this.elements
      .select()
      .find("option:selected")
      .should("have.text", expectedText);
  }

  /**
   * Verify the label text
   */
  verifyLabelIs(expectedLabel: string) {
    this.elements.label().should("contain", expectedLabel);
  }
}
